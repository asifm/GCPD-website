import Vue from 'vue';
import vSelect from 'vue-select';
// import vuescroll from 'vue-scroll';
// ! not working; perhaps fixed in new nuxt versin
// Vue.use(vuescroll);
// In use in the interactive page
// todo: replace with Element's select
Vue.component('v-select', vSelect);
