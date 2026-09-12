// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://andresfernandezp94.com',
    compressHTML: true,
    integrations: [
        sitemap({
            filter: (page) => !page.includes('/404'),
        }),
    ],
    devToolbar: {
        enabled: false,
    },
});