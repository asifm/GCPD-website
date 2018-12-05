<script>
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

export default {
  props: {
    paramList: {
      type: String,
      default: '',
    },
    selected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected_: this.selected,
      items: [],
      eventName: '',
    };
  },
  mounted() {
    if (this.paramList == 'countries') {
      this.items = lists.regionsCountries;
      this.eventName = 'change-country';
    } else if (this.paramList == 'industries') {
      this.items = lists.industries.map(el => el.industry);
      this.eventName = 'change-industry';
    }
    // this.selected_ = this.selected; So as prop isn't modified directly
    this.$nextTick(() => {
      FilterBus.$on('compute-data-created', payload => {
        if (payload === true) FilterBus.$emit(this.eventName, this.selected_);
      });
    });
    // At mount, get the default value and set it
    // FilterBus.$on(this.eventName, payload => {
    //   this.selected = payload;
    // });
  },
  updated() {
    console.log(
      'inside select. value updated. emitting selected',
      this.selected_,
    );
    FilterBus.$emit(this.eventName, this.selected_);
  },
};
</script>

<template lang="pug">
v-select(:options="items" v-model="selected_").uk-button-text
</template>
