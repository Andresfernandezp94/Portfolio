export interface FeaturedProject {
    name: string;
    description: string;
    stack: string[];
    highlights: string[];
    slug: string;
    icon?: string;
    customIcon?: string;
    github?: string;
    live?: string;
}

export const featuredProjects: FeaturedProject[] = [
    {
        name: "neurox",
        slug: "neurox",
        customIcon: "/projects/neurox-icon.svg",
        description:
            "Orquestador de agentes IA en Rust: daemon local con API HTTP/SSE, agentes aislados por sesión y clientes web/escritorio que comparten un único núcleo.",
        stack: ["Rust", "Axum", "Tokio", "React", "Vite", "TypeScript", "Systemd", "SSE"],
        highlights: [
            "Daemon único, múltiples clientes thin",
            "Aislamiento por sesión (un subproceso por chat)",
            "Streaming SSE con eventos tipados",
        ],
        github: "https://github.com/Andresfernandezp94/neurox",
    },
    {
        name: "omen",
        slug: "omen",
        icon: "hardware",
        description:
            "Stack Linux nativo para HP OMEN Transcend 14: drivers kernel, control térmico, RGB, servicios de IA sobre Intel NPU y configs de audio.",
        stack: ["Linux", "DKMS", "Python", "systemd", "OpenVINO", "Intel NPU"],
        highlights: [
            "Perfiles térmicos calibrados con histéresis",
            "STT, VAD, embeddings y OCR sobre NPU",
            "Drivers DKMS propios (WMI, fan control)",
        ],
        github: "https://github.com/Andresfernandezp94/omen",
    },
];

export const hiddenRepos: string[] = ["Portfolio", "Andresfernandezp94"];
