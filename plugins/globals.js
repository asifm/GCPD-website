// All plugins here are automatically registered with nuxt.config; because this file itself is registered there as a plugin

import Vue from 'vue';

// large ui libraries
import Vuikit from 'vuikit';
import Element from 'element-ui';
import Vuetify from 'vuetify';
// to use vuetify styles, add the following styles/fonts
// <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet"></link>
// <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet"></link>

// one or a few ui components
import vSelect from 'vue-select';
import vuescroll from 'vue-scroll';

// :: register globally
Vue.use(Vuikit);

// ::register only required components
// Vue.use(Vuetify);
// Vue.use(Element);

// ! not working; perhaps fixed in new nuxt versin
Vue.use(vuescroll);

// In use in the interactive page
Vue.component('v-select', vSelect);
