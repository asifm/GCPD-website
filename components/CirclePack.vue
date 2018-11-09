<script>
import * as d3 from 'd3';
import { dataProm } from 'assets/js/fetchData';

import { getCountriesProm } from 'assets/js/computeData';

// getCountriesProm.then(data => {
//   console.log(data);
// });
export default {
  data() {
    return {
      countries: [],
    };
  },
  mounted() {
    this.getCountries();
  },
  methods: {
    getCountries() {
      getCountriesProm.then(countries => {
        // console.log('countries', countries);
        this.countries = countries;
      });
    },
  },
};
</script>

<template lang="pug">
div
  p inside circlepack
  svg#svg
  p countries are: {{ countries }}
</template>
