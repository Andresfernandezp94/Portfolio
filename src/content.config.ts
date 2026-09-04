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
    }),
});

export const collections = { projects };
