export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    languages_url: string;
}

export interface LanguagePercent {
    language: string;
    percent: string;
}

export interface RepoWithLanguages extends Repo {
    languages: LanguagePercent[];
}

export const languageColors: Record<string, string> = {
    Astro: "#ff5d01",
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Python: "#3572A5",
    SQL: "#e38c00",
};

export function getLanguageColor(lang: string) {
    return languageColors[lang] ?? "#888";
}

export async function getRepos(username: string): Promise<Repo[]> {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);

    const data = await res.json();

    if (!Array.isArray(data)) return [];

    return data;
}

export async function getLanguages(url: string): Promise<LanguagePercent[]> {

    const data: Record<string, number> = await fetch(url).then(r => r.json());

    const total = Object.values(data).reduce((a, b) => a + b, 0);

    if (!total) return [];

    return Object.entries(data).map(([lang, bytes]) => ({
        language: lang,
        percent: ((bytes / total) * 100).toFixed(1),
    }));
}

export async function getReposWithLanguages(username: string): Promise<RepoWithLanguages[]> {

    const repos = await getRepos(username);

    return Promise.all(
        repos.map(async repo => ({
            ...repo,
            languages: await getLanguages(repo.languages_url)
        }))
    );

}