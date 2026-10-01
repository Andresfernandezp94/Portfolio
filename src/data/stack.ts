export interface StackGroup {
    title: string;
    icon:
        | "cloud"
        | "ai"
        | "code"
        | "data"
        | "terminal"
        | "settings";
    description: string;
    items: string[];
}

/**
 * Stack real de trabajo, extraído del uso diario.
 * Los iconos se resuelven por nombre en src/data/providers.ts (TAG_TO_ICON).
 */
export const stackGroups: StackGroup[] = [
    {
        title: "Lenguajes",
        icon: "code",
        description: "Uso diario para backend, pipelines y agentes.",
        items: [
            "TypeScript",
            "Python",
            "Rust",
            "SQL",
            "Bash",
        ],
    },
    {
        title: "Cloud & Plataforma",
        icon: "cloud",
        description:
            "Infraestructura serverless administrada, declarada como código y desplegada también en contenedores.",
        items: [
            "AWS Lambda",
            "S3",
            "Glue",
            "Athena",
            "DynamoDB",
            "SQS",
            "CloudFormation",
            "API Gateway",
            "Cognito",
            "ECS",
            "Docker",
            "Kubernetes",
        ],
    },
    {
        title: "Datos & Analítica",
        icon: "data",
        description:
            "Modelado analítico versionado y pipelines con idempotencia, desde la ingesta hasta el dashboard.",
        items: [
            "dbt",
            "Parquet",
            "ETL",
            "EventBridge",
            "RDS",
            "MongoDB",
        ],
    },
    {
        title: "IA & ML",
        icon: "ai",
        description:
            "Del prototipo al servicio: agentes con guardrails, retrieval sobre embeddings y voz en local.",
        items: [
            "Bedrock",
            "RAG",
            "Embeddings",
            "Knowledge Base",
            "Guardrails",
            "S3 Vectors",
            "Whisper",
            "OpenVINO",
        ],
    },
    {
        title: "Herramientas",
        icon: "terminal",
        description:
            "El entorno con el que trabajo: trazabilidad, automatización y control de versiones.",
        items: [
            "Git",
            "Astro",
            "React",
            "Node.js",
            "Tailwind",
            "Fastify",
            "Vitest",
            "MCP",
        ],
    },
    {
        title: "Sistemas",
        icon: "settings",
        description:
            "Linux a nivel de sistema, donde el software se encuentra con el hardware que lo ejecuta.",
        items: [
            "Linux",
            "systemd",
            "DKMS",
            "Kernel drivers",
            "sysfs",
            "DBus",
            "WSL",
            "Firmware",
        ],
    },
];