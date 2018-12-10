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
    selected_: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // property selected_ cteated so that we don't have to modify props directly
      // selected_: this.selected_,
      minYear: lists.dataYearRange.min,
      maxYear: lists.dataYearRange.max,
    };
  },
  updated() {
    // emits for computeData component

    FilterBus.$emit(this.eventName, Number(this.selected_));
  },
  methods: {
    sync(event) {
      this.$emit('update:selected_', Number(event.target.value));
    },
  },
};
</script>

<template lang="pug">
  input.uk-input(:type="inputType" :min="minYear" :max="maxYear" :value="selected_" @change="sync")
</template>
