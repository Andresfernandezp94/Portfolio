export type ProviderKey =
    | "aws"
    | "microsoft"
    | "mongodb"
    | "intel"
    | "arm"
    | "localstack"
    | "genesys"
    | "docker"
    | "python"
    | "rust"
    | "nodejs"
    | "typescript"
    | "react"
    | "astro"
    | "tailwind"
    | "bluetooth"
    | "linux"
    | "graphql";

export interface ProviderInfo {
    abbr: string;
    color: string;
    bg: string;
}

export const PROVIDERS: Record<ProviderKey, ProviderInfo> = {
    aws: { abbr: "AWS", color: "#FF9900", bg: "rgba(255,153,0,0.15)" },
    microsoft: { abbr: "MS", color: "#0078D4", bg: "rgba(0,120,212,0.15)" },
    mongodb: { abbr: "MDB", color: "#47A248", bg: "rgba(71,162,72,0.15)" },
    intel: { abbr: "INT", color: "#0071C5", bg: "rgba(0,113,197,0.15)" },
    arm: { abbr: "ARM", color: "#0091BD", bg: "rgba(0,145,189,0.15)" },
    localstack: { abbr: "LS", color: "#FF3D00", bg: "rgba(255,61,0,0.15)" },
    genesys: { abbr: "GEN", color: "#FF4F1F", bg: "rgba(255,79,31,0.15)" },
    docker: { abbr: "DKR", color: "#2496ED", bg: "rgba(36,150,237,0.15)" },
    python: { abbr: "PY", color: "#3776AB", bg: "rgba(55,118,171,0.15)" },
    rust: { abbr: "RST", color: "#CE422B", bg: "rgba(206,66,43,0.15)" },
    nodejs: { abbr: "NJS", color: "#5FA04E", bg: "rgba(95,160,78,0.15)" },
    typescript: { abbr: "TS", color: "#3178C6", bg: "rgba(49,120,198,0.15)" },
    react: { abbr: "RCT", color: "#61DAFB", bg: "rgba(97,218,251,0.15)" },
    astro: { abbr: "AST", color: "#FF5D01", bg: "rgba(255,93,1,0.15)" },
    tailwind: { abbr: "TW", color: "#38B2AC", bg: "rgba(56,178,172,0.15)" },
    bluetooth: { abbr: "BT", color: "#0082FC", bg: "rgba(0,130,252,0.15)" },
    linux: { abbr: "LX", color: "#FCC624", bg: "rgba(252,198,36,0.15)" },
    graphql: { abbr: "GQL", color: "#E10098", bg: "rgba(225,0,152,0.15)" },
};

const TAG_TO_PROVIDER: Record<string, ProviderKey> = {
    "CloudFormation": "aws",
    "Lambda": "aws",
    "EventBridge": "aws",
    "API Gateway": "aws",
    "SQS": "aws",
    "EC2": "aws",
    "S3": "aws",
    "Cognito": "aws",
    "Amplify": "aws",
    "Glue": "aws",
    "Athena": "aws",
    "RDS": "aws",
    "DynamoDB": "aws",
    "QuickSight": "aws",
    "Bedrock": "aws",
    "Bedrock Agent": "aws",
    "S3 Vectors": "aws",
    "WSL": "microsoft",
    "SQL Server": "microsoft",
    "Power BI": "microsoft",
    "WMI": "microsoft",
    "MongoDB": "mongodb",
    "OpenVINO": "intel",
    "ARM": "arm",
    "LocalStack": "localstack",
    "Genesys Cloud": "genesys",
    "Docker": "docker",
    "Python": "python",
    "Rust": "rust",
    "Node.js": "nodejs",
    "TypeScript": "typescript",
    "React": "react",
    "Astro": "astro",
    "Tailwind": "tailwind",
    "Bluetooth": "bluetooth",
    "Kernel drivers": "linux",
    "DKMS": "linux",
    "sysfs": "linux",
    "systemd": "linux",
    "DBus": "linux",
    "GraphQL": "graphql",
};

export function getProvider(tagName: string): ProviderInfo | undefined {
    const key = TAG_TO_PROVIDER[tagName];
    if (!key) return undefined;
    return PROVIDERS[key];
}
