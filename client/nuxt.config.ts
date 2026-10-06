import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
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

  // Authenticated pages depend on the localStorage session, so render them
  // on the client only; the public login/register pages stay server-rendered.
  routeRules: {
    '/feed/**': { ssr: false },
    '/post/**': { ssr: false },
    '/profile/**': { ssr: false },
    '/search/**': { ssr: false },
  },

  runtimeConfig: {
    public: {
      // Override with NUXT_PUBLIC_API_BASE at runtime/build time.
      apiBase: 'http://localhost:4500/api/v1',
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
