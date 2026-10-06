import tailwindcss from '@tailwindcss/vite'

// Absolute URL used for Open Graph links (override with NUXT_PUBLIC_SITE_URL).
const SITE_URL =
  process.env.NUXT_PUBLIC_SITE_URL || 'https://share-it-social.vercel.app'
const SITE_TITLE = '💭 SHARE IT - share thoughts, posts'
const SITE_DESCRIPTION =
  'SHARE IT is a social app to share thoughts, posts and stories: write posts, like, follow people and add posts to your story.'

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
      title: SITE_TITLE,
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1.0',
        },
        { name: 'description', content: SITE_DESCRIPTION },
        {
          name: 'keywords',
          content: 'share it, thoughts, posts, social media, stories',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#1e293b' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'SHARE IT' },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:image', content: `${SITE_URL}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'SHARE IT login screen' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Authenticated pages depend on the localStorage session, so render them
  // on the client only; the public login/register pages stay server-rendered.
  // They are also kept out of search indexes.
  routeRules: {
    '/feed/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex' } },
    '/post/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex' } },
    '/profile/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex' } },
    '/search/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex' } },
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
