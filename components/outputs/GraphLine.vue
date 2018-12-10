<script>
// ::import libraries
import VueApexcharts from 'vue-apexcharts';

// import tweenlite from 'gsap';

import { FilterBus } from '@/assets/js/FilterBus';
import { formatVal } from '@/assets/js/utility';

export default {
  components: { 'vue-chart': VueApexcharts },
  props: {
    chartType: {
      type: String,
      default: 'area',
    },
    // country, industry, or year
    dataDimension: {
      type: String,
      default: 'year',
    },
    chartHeight: {
      type: Number,
      default: 500,
    },
    chartWidth: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      series: [
        {
          name: 'Patents',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          animations: {
            enabled: false,
            easing: 'easeinout',
            speed: 1000,
            animateGradually: {
              enabled: true,
              delay: 500,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 300,
            },
          },
        },
        grid: {
          row: {
            colors: ['#232d4b', '#e57200'],
            opacity: 0.02,
          },
          padding: {
            left: 20,
            right: 25,
          },
        },

        // stroke: {
        //   curve: 'smooth',
        //   width: 2,
        // },

        theme: {
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#42558e',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },

        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          offsetX: -5,
          offsetY: -10,
          formatter: (val, opt) => formatVal(val),
          style: {
            fontSize: '9px',
          },
        },
        tooltip: {
          enable: true,
          y: {
            formatter: (val, opt) => formatVal(val),
          },
          x: {
            show: true,
            title: {
              formatter: seriesname => seriesname + ':',
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '15px',
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (val, opt) => formatVal(val),
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 0.3,
            },
            style: {
              fontSize: '15px',
            },
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

      this.series[0].data = yearGrp
        .top(Infinity)
        .sort((a, b) => a.key - b.key)
        .map(el => {
          return [el.key, el.value];
        });
    });
  },
};
</script>

<template lang="pug">

div
  vue-chart(:width="chartWidth" :height="chartHeight" :type="chartType" :options="chartOptions" :series="series")
</template>
