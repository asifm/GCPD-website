<script>
import _ from 'lodash';
import { setTimeout } from 'timers';
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

export default {
  props: {
    rangeYears_: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rangeYears: this.rangeYears_,
      minYear: lists.dataYearRange.min,
      maxYear: lists.dataYearRange.max,
    };
  },
  watch: {
    rangeYears_(newValue) {
      this.rangeYears = newValue;
    },
  },
  methods: {
    update: _.debounce(function() {
      FilterBus.$emit('change-rangeyears', this.rangeYears);
    }, 500),
  },
};
</script>

<template lang="pug">
  el-slider(range :min="minYear" :max="maxYear" v-model="rangeYears" @input="update()")
</template>
