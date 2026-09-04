---
title: "omen — Linux nativo en HP OMEN Transcend 14"
description: "Stack completo de Linux para hardware HP OMEN: drivers kernel, control térmico, RGB, NPU AI services y configuración de audio sobre Meteor Lake."
stack: ["Linux", "DKMS", "Kernel", "Python", "systemd", "DBus", "WirePlumber", "OpenVINO", "Intel NPU"]
order: 2
featured: true
github: "https://github.com/Andresfernandezp94/omen"
year: "2026"
role: "Ingeniero de plataforma personal"
---

## Contexto

HP OMEN Transcend 14 (Meteor Lake: Core Ultra 9 185H + RTX 4070 Max-Q + Intel AI Boost NPU) corre Windows por defecto. Llevarlo a Linux con todos los controles funcionando — ventiladores, RGB, rendimiento, IA local — requirió escribir desde drivers kernel hasta servicios de IA sobre NPU.

## Stack de hardware

| Componente | Detalle |
|---|---|
| CPU | Intel Core Ultra 9 185H (6P + 8E + 2LPE, 14 cores) |
| GPU | NVIDIA RTX 4070 Max-Q (8GB GDDR6) |
| iGPU | Intel Arc (Meteor Lake) |
| NPU | Intel AI Boost (Meteor Lake) |
| RAM | 32GB LPDDR5x |
| SSD | 2TB NVMe (Btrfs) |
| Display | 14" 2880×1800 120Hz + externo 1080p 165Hz (DP via iGPU) |

## Módulos

| Módulo | Descripción |
|---|---|
| `performance/` | Daemon térmico (PL1 + fan control) + watcher de teclas hardware |
| `npu/` | Servicios IA sobre NPU: STT, VAD, embeddings, visión, OCR |
| `rgb/` | Control de iluminación RGB del teclado |
| `audio/` | Configs WirePlumber/PipeWire (Bluetooth, SoundWire) |
| `drivers/` | Módulos DKMS (WMI, control de ventiladores) |
| `system/` | Reglas udev, configs de modules-load |

## Arquitectura térmica

```
┌─────────────────────────────────────────────────────────────┐
│ power-profiles-daemon (sistema)  ← EPP + platform_profile    │
│         ↕ DBus PropertiesChanged                            │
│ omen-ctl-daemon (Python)        ← PL1/PL2 + fan speed      │
│         ↕ sysfs writes                                      │
│ omen-transcend-fanctl (kernel)  ← WMI fan control           │
│         ↕ WMI BIOS calls                                    │
│ BIOS EC                         ← hardware real              │
└─────────────────────────────────────────────────────────────┘
```

**Perfiles calibrados** (jul-2026, ADR-0005): todos usan bucle térmico reactivo con media móvil (3 muestras), histéresis de cooldown (5s) y rampa de ±4W/s.

| Modo | PL1 (AC) | PL2 | Fans | Target | EPP |
|---|---|---|---|---|---|
| Performance | 10–45W | 65W | 5700/5500 | ≤95°C | performance |
| Balanced | 10–25W | 35W | 5000/4800 | ≤85°C | balance_performance |
| Power-saver | 7–12W | 18W | 3000/2800 | ≤72°C | power |

> Límites: TjMax=110°C, PBP=45W, MTP=115W. Freno de emergencia a 98°C (10W instantáneo).

## Servicios NPU

```
┌─────────────────────────────────────────────────────────────┐
│ NPU Services (systemd user)                                  │
│   npu-vad → npu-listen → transcribe-daemon (STT pipeline)   │
│   npu-embed (embeddings), npu-vision (CLIP), npu-ocr        │
│         ↕ Unix sockets (JSON protocol)                      │
│ Intel NPU (OpenVINO, INT8 models)                           │
└─────────────────────────────────────────────────────────────┘
```

## Desafíos resueltos

- **Heatpipe compartida** limita potencia sostenida a ~20W con fans al máximo — el daemon lo sabe y ajusta.
- **Tecla OMEN Gaming Hub (Fn+F12)** no es ruteable por evdev porque `omen_dkms` la intercepta — solución: kernel log watcher (scancode e02b).
- **Fan mode se revierte tras suspend** — fixed en driver v1.0.0+ con PM resume callback; el daemon también reaplica al reanudar vía DBus.
- **`eva-overlay` consume 30–35% GPU** cuando está activo en NVIDIA — documentado: matar cuando no se usa.

## Resultado

Linux daily-driver en una laptop gaming de 14" con control térmico fino, RGB programático, transcripción STT local usando el NPU de Intel, y overlays de visión/OCR — todo en código abierto dentro del repo.
