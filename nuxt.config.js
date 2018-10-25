const pkg = require('./package');

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Global Corporate Patent Data',
    meta: [
      { charset: 'utf-8' },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['@/assets/style/uikit-custom.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['./plugins/uikit.js', './plugins/vuikit.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  markdownit: {
    // Available options: See https://github.com/markdown-it/markdown-it
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-attrs', 'markdown-it-footnote']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          // enforce: "pre",
          // test: /\.(js|vue)$/,
          // loader: "eslint-loader",
          // exclude: /(node_modules)/
        });
      }
    }
  }
};
