// All plugins here are automatically registered with nuxt.config; because this file itself is registered there as a plugin

import Vue from 'vue';

import Element from 'element-ui';
// Element's default language is Chinese. Hence needs declaring locale.
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(Element, { locale });

// ui components
import vSelect from 'vue-select';
// import vuescroll from 'vue-scroll';

// ! not working; perhaps fixed in new nuxt versin
// Vue.use(vuescroll);

// In use in the interactive page
// todo: replace by Element's select
Vue.component('v-select', vSelect);
