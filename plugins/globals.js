import Vue from 'vue';
import Vuikit from 'vuikit';
import vSelect from 'vue-select';
import vuescroll from 'vue-scroll';

Vue.use(Vuikit);

// ? not working, uninstall
Vue.use(vuescroll);

Vue.component('v-select', vSelect);
