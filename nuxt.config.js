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
      { hid: 'description', name: 'description', content: pkg.description },
    ],
  },

  script: [],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#232d45' },

  /*
  ** Global CSS
  */
  css: ['@/assets/style/uikit-custom.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/uikit.js',
    './plugins/globals.js',
    './plugins/filters.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',
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
    use: ['markdown-it-attrs', 'markdown-it-footnote'],
  },
  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.csv$/,
        use: { loader: 'file-loader' },
      });
      config.module.rules.push({
        test: /\.md$/,
        use: ['vue-loader', 'vue-md-loader'],
      });
      console.log(config.module.rules);
    },
  },
};
