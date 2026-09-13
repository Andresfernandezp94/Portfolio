---
title: "Inteligencia Artificial"
description: "De consumidor de LLMs a construir agentes y sistemas de IA de propósito específico."
period: "2023 → presente"
level: "Avanzado"
icon: "ai"
order: 1
milestones:
  - period: "2023"
    title: "Primeros pasos con LLMs"
    summary: "Empecé a integrar modelos de lenguaje en prototipos: prompts, embeddings y los primeros pipelines de RAG sobre datos propios."
  - period: "2024"
    title: "IA en producción"
    summary: "Llevé soluciones conversacionales y de Knowledge Base a producción en AWS (Bedrock, agentes, RAG con S3 Vectors)."
  - period: "2024–2025"
    title: "OpenVINO y procesamiento local"
    summary: "STT, VAD, embeddings y OCR sobre la NPU de Intel en una laptop; IA corriendo local sin depender de la nube."
  - period: "2025–2026"
    title: "Orquestación multi-agente"
    summary: "Diseñé neurox, un daemon en Rust que orquesta agentes aislados por sesión con streaming SSE para múltiples clientes."
---

## 2023 — Los primeros pasos

Mi acercamiento a la IA fue práctico: tomé un problema real de datos y probé si un LLM podía resolverlo. Eso me llevó a embeddings, búsqueda semántica y los primeros pipelines de RAG. Aprendí a estructurar el contexto antes de tocar la arquitectura.

## 2024 — IA en producción

El siguiente nivel fue saltar de prototipos a plataforma: agentes de Bedrock, Knowledge Bases con S3 Vectors y automatización de KPIs. Ahí entendí que la IA no es el producto, es un componente del sistema — y que la calidad de los datos decide la calidad del agente.

## 2025 — IA local y embebida

Con OpenVINO en la NPU de Intel, llevé speech-to-text, embeddings y OCR al borde. La motivación: latencia, privacidad y no depender de una API para cosas que deberían ser instantáneas.

## 2026 — Agentes como arquitectura

Con neurox, la IA dejó de ser una llamada y pasó a ser un runtime: un daemon en Rust que orquesta agentes aislados por sesión, con memoria, skills y herramientas. El siguiente paso está en dejar de integrar modelos para empezar a construir sistemas que piensan.