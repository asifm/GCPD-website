const pkg = require('./package');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

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
        rel: 'stylesheet',
        href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#e57200',
    height: '10px',
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
    './plugins/element.js',
    './plugins/filters.js',
    './plugins/globals.js',
    './plugins/uikit.js',
    './plugins/vueClicky.js',
    './plugins/vueSelect.js',
  ],

  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // '@nuxtjs/axios',
  ],
  // axios: {
  // module configuration: https://github.com/nuxt-community/axios-module#options
  // },
  vue: {
    config: {
      productionTip: false,
      // Following two needed for https://github.com/vue-perf-devtool/vue-perf-devtool
      devtools: true,
      performance: true,
    },
  },
  build: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: false,
        openAnalyzer: false,
        logLevel: 'info',
      }),
    ],
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = 'source-map';
        console.log('config.devtool', config.devtool);
      } else {
        config.devtool = 'inline-source-map';
        console.log('config.devtool', config.devtool);
      }
      config.module.rules.push(
        {
          test: /\.csv$/,
          use: { loader: 'file-loader' },
        },
        {
          test: /\.md$/,
          use: [
            'vue-loader', //
            'vue-md-loader',
          ],
        },
      );
      // console.log(config);
    },
  },
};
