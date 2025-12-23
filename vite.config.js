import handlebars from 'vite-plugin-handlebars';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pageData = {
    '/index.html': {
        title: 'Portfolio - Home',
        module: '/js/index.js',
    },
    '/dev-projects.html': {
        title: 'Portfolio - Dev Projects',
        module: '/js/dev-projects.js',
    },
    '/blog.html': {
        title: 'Portfolio - Blog',
        module: '/js/blog.js',
    },
    '/it-projects.html': {
        title: 'Portfolio - IT Projects',
        module: '/js/it-projects.js',
    },
    '/post.html': {
        title: 'Portfolio',
        module: '/js/post.js',
    },
    '/login.html' : {
        title: 'Portfolio - Login',
        module: '/js/login-logout.js',
    },
    '/logout.html' : {
        title: 'Portfolio - Logout',
        module: '/js/login-logout.js',
    },
    '/login-redirect.html' : {
        title: 'Portfolio - Login Redirect',
        module: '/js/login-redirect.js',
    },
    '/edit-post.html' : {
        title: 'Portfolio - Edit Post',
        module: '/js/edit-post.js',
    }
};

export default {
    base: './',
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'components'),
            context(pagePath) {
                return pageData[pagePath];
            },
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                blog: resolve(__dirname, 'blog.html'),
                devProjects: resolve(__dirname, 'dev-projects.html'),
                itProjects: resolve(__dirname, 'it-projects.html'),
                post: resolve(__dirname, 'post.html'),
                login: resolve(__dirname, 'login.html'),
                logout: resolve(__dirname, 'logout.html'),
                loginRedirect: resolve(__dirname, 'login-redirect.html'),
                editPost: resolve(__dirname, 'edit-post.html'),
            },
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'assets/web-[hash].css';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },
};