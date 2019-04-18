<script>
import _ from 'lodash';
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

// uikit doesn't have a good slider input; so a separate component
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  components: {
    VueSlider,
  },
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
  created() {
    FilterBus.$on('reset-data', () => {
      this.rangeYears = [2000, 2017];
    });
  },
  methods: {
    update: _.debounce(function() {
      FilterBus.$emit('change-rangeyears', this.rangeYears);
    }, 500),
  },
};
</script>

<template lang="pug">
  vue-slider(
    @change="update"
    v-model="rangeYears" 
    :min="minYear" 
    :max="maxYear" 
    :min-range=1
    :max-range="maxYear - minYear"
    )
</template>

<style lang="scss" scoped>
ul {
  font-family: FranklinGothicURW;
}
</style>
