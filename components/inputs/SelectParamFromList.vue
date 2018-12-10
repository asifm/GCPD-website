<script>
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

export default {
  props: {
    paramList: {
      type: String,
      default: '',
    },
    selected_: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // this.selected = this.selected; So as prop isn't modified directly
      selected: this.selected_,
      items: [],
      eventName: '',
    };
  },
  mounted() {
    if (this.paramList == 'countries') {
      this.items = lists.regionsCountries;
      this.eventName = 'change-country';
      // For convenience show United States toward the top (in addition to its alphabetical place)
      // But first make sure it's not already there
      if (this.items.filter(el => el === 'United States').length === 1) {
        this.items.splice(4, 0, 'United States');
      }
    } else if (this.paramList == 'industries') {
      this.items = lists.industries.map(el => el.industry);
      this.eventName = 'change-industry';
    }
  },
  updated() {
    FilterBus.$emit(this.eventName, this.selected);
  },
};
</script>

<template lang="pug">
v-select(:options="items" v-model="selected")
</template>
