---
title: "neurox — Orquestador de Agentes IA"
description: "Daemon local en Rust que orquesta agentes de IA con clientes web y de escritorio como thin clients sobre un núcleo compartido."
stack: ["Rust", "Axum", "Tokio", "React", "Vite", "TypeScript", "Systemd", "SSE"]
order: 1
featured: true
github: "https://github.com/Andresfernandezp94/neurox"
year: "2025–2026"
role: "Diseñador y desarrollador principal"
---

## Contexto

La mayoría de wrappers de LLM atan al usuario a un único cliente. Quería un setup donde varios frontends (sidebar de escritorio, web, CLI) compartan el mismo estado — sesiones, proveedores, API keys, modelos, agentes — sin duplicar lógica.

**neurox** es ese orquestador. Corre como `systemd user service` en `127.0.0.1:7878` y expone una API HTTP/SSE que cualquier cliente puede consumir.

## Arquitectura

```
        ┌──────────────────┐        ┌──────────────────┐
        │  Sidebar (QML)   │        │   Web (React)    │
        │  thin client     │        │   thin client    │
        └────────┬─────────┘        └─────────┬────────┘
                 │  HTTP + SSE                 │  HTTP + SSE
                 │  (127.0.0.1:7878)           │
                 └──────────────┬──────────────┘
                                ▼
                    ┌───────────────────────┐
                    │   neurox daemon (Rust) │
                    │  ─────────────────────  │
                    │  • sesiones + streaming │
                    │  • proveedores LLM      │
                    │  • pool de agentes      │
                    │  • tools engine         │
                    └───────────┬────────────┘
                                │  JSON-RPC / stdio (un subproceso por sesión)
                                ▼
                    ┌───────────────────────┐
                    │  agent (subproceso)   │  ← uno por sesión, aislado
                    │  identity + memory +   │
                    │  skills + LLM backend  │
                    └───────────────────────┘
```

## Decisiones de diseño

- **El daemon es el núcleo único.** Toda la lógica de estado (sesiones, proveedores, agentes, keys, modelos) vive en el daemon. Los clientes no duplican nada.
- **Aislamiento por sesión.** Cada sesión de chat obtiene su propio subproceso `agent` con memoria de trabajo aislada. Esto da paralelismo real: una sesión ocupada o caída nunca bloquea a otra.
- **Streaming sobre SSE.** Las respuestas se streamean token a token. Los clientes reciben `thinking`, `content`, `tool_call`, `tool_result`, `error` como eventos discretos.
- **Sin secretos en el repo.** Las API keys viven en `~/.config/neurox/env` con permisos `0600`.

## Componentes

| Componente | Stack | Rol |
|---|---|---|
| **daemon** | Rust (axum, tokio) | API HTTP/SSE, sesiones, proveedores LLM, pool de agentes, tools engine |
| **agent** | Rust | Subproceso aislado por sesión: identidad, memoria, skills, backend LLM |
| **client/web** | React + Vite + TS | Cliente web: chat, modelos, agentes, panel de proveedores |
| **sidebar** | QML (Quickshell) | Cliente de escritorio, referencia visual |
| **agents/** | JSON + Markdown | Plantillas versionadas de agentes |

## Desafíos resueltos

- **Pool de subprocesos sin leaks** — el daemon debe spawnear un `agent` por sesión y garantizar cleanup en crash o timeout.
- **Streaming consistente entre clientes** — el mismo protocolo SSE sirve para sidebar y web; cualquier divergencia se siente como bug.
- **Gestión de keys sin redeploy** — `PUT/DELETE /v1/env/:key` permite rotar API keys en runtime sin reiniciar el daemon.
- **Metodología viva** — `.sdd/` es la fuente de verdad de gobernanza, ADRs y glosario.

## API (resumen)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Estado del daemon |
| `GET/POST` | `/v1/sessions` | Listar / crear sesiones |
| `POST` | `/v1/sessions/:id/messages/stream` | Chat en streaming (SSE) |
| `GET` | `/v1/agents` | Agentes disponibles |
| `GET` | `/v1/llm/providers` | Proveedores LLM y estado |
| `PUT/DELETE` | `/v1/env/:key` | Gestionar API keys en runtime |

## Resultado

Un orquestador que realmente cumple "un núcleo, muchos clientes": puedo abrir una sesión desde el sidebar en medio de una reunión y continuarla desde la web después, sin perder contexto ni estado. La complejidad queda contenida en el daemon; los clientes son UI pura.
