export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pasiskiepijes',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/ga.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/google-analytics'
  ],

  googleFonts: {
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
        'Roboto+Condensed': [700],
        Poppins: [400, 700]
    }
  },

  googleAnalytics: {
    id: 'G-YVG3DY4YKJ'
  },

  serverMiddleware: [
    { path: "/api", handler: "~/server-middleware/index.js" },
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['@/assets/scss/partials.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
