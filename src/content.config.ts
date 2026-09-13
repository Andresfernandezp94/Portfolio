import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        stack: z.array(z.string()),
        order: z.number().default(99),
        featured: z.boolean().default(false),
        github: z.string().url().optional(),
        year: z.string().optional(),
        role: z.string().optional(),
        icon: z.string().optional(),
        date: z.string().optional(),
        milestones: z
            .array(
                z.object({
                    period: z.string(),
                    title: z.string(),
                    summary: z.string(),
                }),
            )
            .default([]),
    }),
});

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number().default(99),
        period: z.string(),
        level: z.string().optional(),
        icon: z.string().optional(),
        milestones: z
            .array(
                z.object({
                    period: z.string(),
                    title: z.string(),
                    summary: z.string(),
                }),
            )
            .default([]),
    }),
});

export const collections = { projects, blog };
