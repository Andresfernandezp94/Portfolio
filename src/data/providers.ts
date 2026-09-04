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
    icon: string;
}

export const PROVIDERS: Record<ProviderKey, ProviderInfo> = {
    aws: {
        abbr: "AWS",
        color: "#FF9900",
        bg: "rgba(255,153,0,0.15)",
        icon: "aws",
    },
    microsoft: {
        abbr: "MS",
        color: "#0078D4",
        bg: "rgba(0,120,212,0.15)",
        icon: "microsoft",
    },
    mongodb: {
        abbr: "MDB",
        color: "#47A248",
        bg: "rgba(71,162,72,0.15)",
        icon: "mongodb",
    },
    intel: {
        abbr: "INT",
        color: "#0071C5",
        bg: "rgba(0,113,197,0.15)",
        icon: "intel",
    },
    arm: {
        abbr: "ARM",
        color: "#0091BD",
        bg: "rgba(0,145,189,0.15)",
        icon: "arm",
    },
    localstack: {
        abbr: "LS",
        color: "#FF3D00",
        bg: "rgba(255,61,0,0.15)",
        icon: "docker",
    },
    genesys: {
        abbr: "GEN",
        color: "#FF4F1F",
        bg: "rgba(255,79,31,0.15)",
        icon: "cloud",
    },
    docker: {
        abbr: "DKR",
        color: "#2496ED",
        bg: "rgba(36,150,237,0.15)",
        icon: "docker",
    },
    python: {
        abbr: "PY",
        color: "#3776AB",
        bg: "rgba(55,118,171,0.15)",
        icon: "python",
    },
    rust: {
        abbr: "RST",
        color: "#CE422B",
        bg: "rgba(206,66,43,0.15)",
        icon: "rust",
    },
    nodejs: {
        abbr: "NJS",
        color: "#5FA04E",
        bg: "rgba(95,160,78,0.15)",
        icon: "nodejs",
    },
    typescript: {
        abbr: "TS",
        color: "#3178C6",
        bg: "rgba(49,120,198,0.15)",
        icon: "typescript",
    },
    react: {
        abbr: "RCT",
        color: "#61DAFB",
        bg: "rgba(97,218,251,0.15)",
        icon: "react",
    },
    astro: {
        abbr: "AST",
        color: "#FF5D01",
        bg: "rgba(255,93,1,0.15)",
        icon: "astro",
    },
    tailwind: {
        abbr: "TW",
        color: "#38B2AC",
        bg: "rgba(56,178,172,0.15)",
        icon: "tailwind",
    },
    bluetooth: {
        abbr: "BT",
        color: "#0082FC",
        bg: "rgba(0,130,252,0.15)",
        icon: "bluetooth",
    },
    linux: {
        abbr: "LX",
        color: "#FCC624",
        bg: "rgba(252,198,36,0.15)",
        icon: "linux",
    },
    graphql: {
        abbr: "GQL",
        color: "#E10098",
        bg: "rgba(225,0,152,0.15)",
        icon: "graphql",
    },
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

const TAG_TO_ICON: Record<string, string> = {
    "C": "code",
    "ARM": "arm",
    "BIOS/UEFI": "chip",
    "Microcontroladores": "chip",
    "Firmware bare-metal": "chip",
    "Kernel drivers": "linux",
    "DKMS": "linux",
    "GPIO": "chip",
    "sysfs": "linux",
    "WMI": "microsoft",
    "ADC": "wave",
    "DAC": "wave",
    "PWM": "wave",
    "AC/DC": "zap",
    "I²C": "chip",
    "SPI": "chip",
    "UART": "chip",
    "Bluetooth": "bluetooth",
    "Wireless": "wave",
    "Rust": "rust",
    "Python": "python",
    "Node.js": "nodejs",
    "TypeScript": "typescript",
    "React": "react",
    "Astro": "astro",
    "Tailwind": "tailwind",
    "Docker": "docker",
    "systemd": "settings",
    "DBus": "settings",
    "REST": "code",
    "GraphQL": "graphql",
    "Bedrock": "aws",
    "Bedrock Agent": "aws",
    "S3 Vectors": "aws",
    "LLM providers": "ai",
    "RAG": "ai",
    "Knowledge Base": "ai",
    "Embeddings": "ai",
    "OpenVINO": "intel",
    "Multi-agent": "ai",
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
    "MongoDB": "mongodb",
    "WSL": "microsoft",
    "SQL Server": "microsoft",
    "Power BI": "microsoft",
    "ETL": "data",
    "KPI automation": "data",
    "Genesys Cloud": "genesys",
};

export function getProvider(tagName: string): ProviderInfo | undefined {
    const key = TAG_TO_PROVIDER[tagName];
    if (!key) return undefined;
    return PROVIDERS[key];
}

export function getTagIcon(tagName: string): string | undefined {
    return TAG_TO_ICON[tagName];
}
