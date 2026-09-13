export interface RepoTimelineEntry {
    period: string;
    title: string;
    summary: string;
    topic?: string;
    topicIcon?: string;
}

export const repoMilestones: Record<string, RepoTimelineEntry[]> = {
    // Añade aquí hitos propios por repositorio. Ejemplo:
    //
    // "mi-repo": [
    //     {
    //         period: "2026-01",
    //         title: "Primera versión estable",
    //         summary: "Despliegue inicial en producción.",
    //         topic: "Prod",
    //         topicIcon: "rocket",
    //     },
    // ],
    //
    // Si un repo no aparece aquí, el timeline se genera solo
    // con los datos públicos de GitHub (creación, última actividad).
};