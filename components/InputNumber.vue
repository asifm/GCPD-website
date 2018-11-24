
<script>
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

export default {
  props: {
    eventName: {
      type: String,
      default: 'startyear',
    },
    inputType: {
      type: String,
      default: 'range',
    },
  },
  data() {
    return {
      year: null,
      minYear: lists.dataYearRange.min,
      maxYear: lists.dataYearRange.max,
    };
  },
  created() {
    // get the default value and set it
    FilterBus.$on(this.eventName, payload => {
      this.year = payload;
    });
  },
  updated() {
    FilterBus.$emit(this.eventName, Number(this.year));
  },
};
</script>

<template lang="pug">
input.uk-input(:type="inputType" :min="minYear" :max="maxYear" v-model.lazy="year")
</template>
