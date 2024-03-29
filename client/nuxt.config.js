export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
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
        hid: 'description',
        name: 'description',
        content: 'SHARE IT - share thoughts, posts, stories',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'share it, thoughts, posts, social media, stories',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // environment variable configuration
  env: {
    NODE_ENV: process.env.NODE_ENV,
    DEV_API: process.env.DEV_API,
    PROD_API: process.env.PROD_API,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
