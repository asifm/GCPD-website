<script>
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

export default {
  props: {
    eventName: {
      type: String,
      default: 'change-startyear',
    },
    inputType: {
      type: String,
      default: 'number',
    },
    selected: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // property selected_ cteated so that we don't have to modify props directly
      selected_: this.selected,
      minYear: lists.dataYearRange.min,
      maxYear: lists.dataYearRange.max,
    };
  },
  created() {
    // get the default value and set it
    FilterBus.$on(this.eventName, payload => {
      this.selected_ = payload;
    });
  },
  mounted() {
    this.$nextTick(() => {
      FilterBus.$on('compute-data-created', payload => {
        if (payload === true) {
          FilterBus.$emit(this.eventName, this.selected_);
        }
      });
    });
  },
  updated() {
    FilterBus.$emit(this.eventName, Number(this.selected_));
  },
};
</script>

<template lang="pug">
  input.uk-input(:type="inputType" :min="minYear" :max="maxYear" v-model.lazy="selected_")
</template>
