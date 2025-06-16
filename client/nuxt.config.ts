// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Global page headers
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

  // Global CSS
  css: [],

  // Modules
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (only available on server-side)
    nodeEnv: process.env.NODE_ENV || 'development',

    // Public keys (exposed to client-side)
    public: {
      devApi: process.env.DEV_API || 'http://localhost:4500',
      prodApi: process.env.PROD_API || 'https://share-it-social-api.vercel.app',
    },
  },

  // Auto import components
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Nitro configuration for API proxy
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:4500',
        changeOrigin: true,
      },
    },
  },

  // Build configuration
  build: {},

  // Compatibility date
  compatibilityDate: '2024-11-01',
})
