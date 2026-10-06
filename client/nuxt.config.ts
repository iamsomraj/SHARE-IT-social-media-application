export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',

  // Devtools is disabled: its git integration depends on a vulnerable
  // `simple-git` release (see `overrides` in package.json).
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/eslint'],

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

  postcss: {
    plugins: {
      // No nested CSS is used, and Tailwind v3's nesting plugin is not
      // ESM-importable by Nuxt 4's PostCSS loader.
      'tailwindcss/nesting': false,
    },
  },

  vite: {
    build: {
      // Keep the previous browser baseline so CSS output stays compatible
      // (e.g. no media-query range syntax for Safari < 16.4).
      cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
