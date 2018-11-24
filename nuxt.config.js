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
  loading: { color: '#fff' },

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

  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  axios: {
    // module configuration: https://github.com/nuxt-community/axios-module#options
  },

  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.csv$/,
        use: { loader: 'file-loader' },
      });
      config.module.rules.push({
        test: /\.md$/,
        use: [
          'vue-loader', //
          'vue-md-loader',
        ],
      });
      // console.log(config);
    },
  },
};
