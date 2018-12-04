<script>
// ::import libraries
import VueApexcharts from 'vue-apexcharts';
import tweenlite from 'gsap';

// ::import functions
import { filterData, rollupCountryYear } from '@/assets/js/computeData';
import { fillRange } from '@/assets/js/utility';

// ::import data
import { dataProm } from '@/assets/js/fetchData';
import { dataYearRange } from '@/assets/data/listData.json';

export default {
  components: { 'vue-chart': VueApexcharts },
  data() {
    return {
      allData: [],
      region: 'All Regions',
      country: 'United States',
      industry: 'All Industries',
      startYear: 2000,
      endYear: 2016,
      options: {
        chart: {
          id: 'country-trend',
        },
        xaxis: {
          categories: fillRange(2000, 2016),
        },
      },

      series: [
        {
          name: 'country-totalpatent-byyear',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  computed: {
    filteredData() {
      return filterData(
        this.allData,
        this.startYear,
        this.endYear,
        this.region,
        this.country,
        this.industry,
        dataYearRange,
      );
    },
    countryData() {
      let d = rollupCountryYear(this.filteredData);
      return d;
    },
  },
  created() {},
  mounted() {
    dataProm.then(data => (this.allData = data));
    // console.log(this.countryData);
    // console.log(this.filteredData);
    this.$nextTick(() => {});
  },
};
</script>

<template lang="pug">

div
  p inside apex-graph
  vue-chart(width='500', type='line', :options='options', :series='series')
</template>
