export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  app: {
    head: {
      title: '💭 SHARE IT - share thoughts, posts',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1.0',
        },
        {
          name: 'description',
          content: 'SHARE IT - share thoughts, posts, stories',
        },
        {
          name: 'keywords',
          content: 'share it, thoughts, posts, social media, stories',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: [],

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV || 'development',
      devApi: process.env.DEV_API || 'http://localhost:4500',
      prodApi: process.env.PROD_API || 'https://share-it-social-api.vercel.app',
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:4500',
        changeOrigin: true,
      },
    },
  },

  build: {},

  compatibilityDate: '2024-11-01',
})
