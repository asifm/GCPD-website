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
    script: [
      {
        // src:
        // 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.24/js/uikit-icons.min.js',
      },
    ],
    link: [
      {
        // rel: 'stylesheet',
        // href: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.24/css/uikit.min.css',
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#e57200',
    height: '5px',
    continuous: true,
  },

  /*
  ** Global CSS
  */
  css: ['@/assets/style/uikit-custom.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/globals.js',
    './plugins/uikit.js',
    './plugins/filters.js',
  ],

  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  axios: {
    // module configuration: https://github.com/nuxt-community/axios-module#options
  },
  vue: {
    config: {
      productionTip: false,
    },
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
