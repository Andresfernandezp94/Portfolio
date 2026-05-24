---
title: "Motor de Facturación de Billetera"
description: "Sistema de débito de billetera de alta concurrencia construido en AWS."
stack: ["AWS", "DynamoDB", "Lambda"]
---

## Problema

Construir un motor de facturación que maneje miles de operaciones de débito concurrentes en billeteras, manteniendo la consistencia de datos y previniendo el doble gasto.

## Arquitectura

El sistema usa una arquitectura serverless en AWS con DynamoDB como almacén principal de datos. Funciones Lambda procesan las solicitudes de débito, aprovechando las escrituras condicionales de DynamoDB para operaciones atómicas. Un enfoque basado en ledger asegura auditabilidad completa.

## Desafíos

- Manejar 1200+ workers concurrentes sin condiciones de carrera
- Asegurar operaciones de débito atómicas en nodos distribuidos
- Mantener un ledger consistente para auditoría financiera
- Escalar de forma eficiente en costos bajo carga variable

## Solución

Se implementó una arquitectura de débito atómico usando expresiones condicionales de DynamoDB para prevenir el doble gasto. Cada transacción se registra en un ledger de solo escritura, proporcionando trazabilidad completa. El sistema usa SQS para buffering de solicitudes y Lambda para escalado elástico.

## Resultados

- Maneja exitosamente 1200+ workers concurrentes
- Cero incidentes de doble gasto en producción
- Latencia promedio de transacción menor a 100ms
- Escalado serverless eficiente en costos
