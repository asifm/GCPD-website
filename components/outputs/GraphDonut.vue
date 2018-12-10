<script>
// ::import libraries
import VueApexcharts from 'vue-apexcharts';
import { format } from 'd3-format';
// import tweenlite from 'gsap';

import { FilterBus } from '@/assets/js/FilterBus';
import { formatVal } from '@/assets/js/utility';

export default {
  components: { 'vue-chart': VueApexcharts },
  props: {
    chartType: {
      type: String,
      default: 'donut',
    },
    // country, industry, or year
    dataDimension: {
      type: String,
      default: 'region',
    },
    chartHeight: {
      type: Number,
      default: 400,
    },
    chartWidth: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      series: [],

      chartOptions: {
        labels: [],
        style: {
          fontSize: '13px',
        },
        theme: {
          palette: 'palette1',
          monochrome: {
            enabled: false,
          },
        },
        legend: {
          formatter: function(val, opts) {
            // console.log(opts);
            return (
              val + ' - ' + formatVal(+opts.w.globals.series[opts.seriesIndex])
            );
          },
        },
      },
    };
  },
  beforeCreate() {
    // listen for new data from compute-data component
    FilterBus.$on('new-data', (arr1, arr2) => {
      const [
        crsfltr,
        companyGrp,
        countryGrp,
        industryGrp,
        regionGrp,
        yearGrp,
      ] = arr1;
      // [this.industry, this.country, this.startYear, this.endYear] = arr2;
      // companyGrp.order(d => d.patentcount);
      switch (this.dataDimension) {
        case 'country':
          break;
        case 'industry':
          break;
        case 'region':
          this.chartOptions.labels = regionGrp.top(3).map(el => el.key);
          this.series = regionGrp.top(3).map(el => +el.value);

          // console.log('this.labels', this.chartOptions.labels);
          // console.log('this.series', this.series);
          break;
      }
    });
  },

  created() {},
};
</script>

<template lang="pug">

div
  vue-chart(:width="chartWidth" :height="chartHeight" :type="chartType" :options="chartOptions" :series="series")
</template>
