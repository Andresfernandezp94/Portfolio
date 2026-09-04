import fs from "node:fs";
import path from "node:path";

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

const CACHE_DIR = path.resolve(process.cwd(), ".cache");
const CACHE_TTL_MS = 1000 * 60 * 60;
const TOKEN = process.env.GITHUB_TOKEN ?? import.meta.env.GITHUB_TOKEN;

const authHeaders: HeadersInit = TOKEN
    ? { Authorization: `Bearer ${TOKEN}` }
    : {};

function readCache<T>(key: string): T | null {
    try {
        const file = path.join(CACHE_DIR, `${key}.json`);
        if (!fs.existsSync(file)) return null;
        const { at, data } = JSON.parse(fs.readFileSync(file, "utf-8"));
        if (Date.now() - at > CACHE_TTL_MS) return null;
        return data as T;
    } catch {
        return null;
    }
}

function writeCache(key: string, data: unknown): void {
    try {
        if (!fs.existsSync(CACHE_DIR)) {
            fs.mkdirSync(CACHE_DIR, { recursive: true });
        }
        fs.writeFileSync(
            path.join(CACHE_DIR, `${key}.json`),
            JSON.stringify({ at: Date.now(), data }),
        );
    } catch (err) {
        console.warn("[cache] write failed:", err);
    }
}

async function ghFetch<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: authHeaders });
    if (!res.ok) {
        throw new Error(
            `GitHub API ${res.status} ${res.statusText} for ${url}`,
        );
    }
    return res.json() as Promise<T>;
}

export async function getRepos(username: string): Promise<Repo[]> {
    const key = `repos-${username}`;
    const cached = readCache<Repo[]>(key);
    if (cached) return cached;

    const data = await ghFetch<unknown[]>(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    );
    const repos = Array.isArray(data) ? (data as Repo[]) : [];
    writeCache(key, repos);
    return repos;
}

export async function getLanguages(
    url: string,
): Promise<LanguagePercent[]> {
    const key = `langs-${Buffer.from(url).toString("base64url")}`;
    const cached = readCache<LanguagePercent[]>(key);
    if (cached) return cached;

    const data = await ghFetch<Record<string, number>>(url);
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    const result: LanguagePercent[] = total
        ? Object.entries(data).map(([language, bytes]) => ({
              language,
              percent: ((bytes / total) * 100).toFixed(1),
          }))
        : [];

    writeCache(key, result);
    return result;
}

export async function getReposWithLanguages(
    username: string,
): Promise<RepoWithLanguages[]> {
    const repos = await getRepos(username);
    return Promise.all(
        repos.map(async (repo) => ({
            ...repo,
            languages: await getLanguages(repo.languages_url),
        })),
    );
}
