// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    css: [
        '~/assets/css/main.scss',
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/css/global.scss";',
                },
            },
        },
    },

    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
                },
            ],
        },
    },

    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },

    modules: ["@pinia/nuxt"],

    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            cdnUrl: process.env.CDN_URL,
        }
    },

    imports: {
        autoImport: false,
    },
})
