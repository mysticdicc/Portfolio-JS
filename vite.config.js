import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

const pageData = {
    '/index.html': {
        title: 'Portfolio - Home',
        module: 'js/index.js',
        script: 'js/index-events.js',
    },
    '/dev-projects.html': {
        title: 'Portfolio - Dev Projects',
        module: 'js/dev-projects.js',
        script: 'js/dev-projects-events.js',
    },
    '/blog.html': {
        title: 'Portfolio - Blog',
        module: 'js/blog.js',
        script: 'js/blog-events.js',
    },
    '/it-projects.html': {
        title: 'Portfolio - IT Projects',
        module: 'js/it-projects.js',
        script: 'js/it-projects-events.js',
    },
};

export default {
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'components'),
            context(pagePath) {
                return pageData[pagePath];
            },
        }),
    ],
};