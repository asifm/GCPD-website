<script>
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

export default {
  props: {
    paramList: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: '',
      options: [],
      eventName: '',
    };
  },
  mounted() {
    if (this.paramList == 'countries') {
      this.options = lists.regionsCountries;
      this.eventName = 'change-country';
    } else if (this.paramList == 'industries') {
      this.options = lists.industries.map(el => el.industry_short);
      this.eventName = 'change-industry_short';
    }
    // At mount, get the default value and set it
    FilterBus.$on(this.eventName, payload => {
      this.selected = payload;
    });
  },
  updated() {
    FilterBus.$emit(this.eventName, this.selected);
  },
};
</script>

<template lang="pug">
v-select(:options="options" v-model="selected").uk-button-text
</template>
