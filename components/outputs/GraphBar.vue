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
      default: 'bar',
    },
    // country, industry, or year
    dataDimension: {
      type: String,
      default: 'country',
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
      series: [
        {
          name: 'Patents',
          data: [],
        },
      ],
      chartOptions: {
        fill: {
          type: 'pattern',
          pattern: {
            style: 'verticalLines',
            width: 1,
            height: 2,
          },
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            // gradientToColors: '#e57200', // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.3,
            opacityTo: 0.7,
            stops: [0, 50, 100],
          },
        },
        style: {
          fontSize: '13px',
        },
        chart: {
          type: this.chartType,
          animations: {
            enabled: true,
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
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 0.3,
            opacity: 0.1,
          },
        },
        theme: {
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#42558e',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '70%',
          },
        },
        dataLabels: {
          enabled: false,
          textAnchor: 'start',
          style: {
            colors: '#000000',
          },
          formatter: (val, opt) => formatVal(val),
        },
        tooltip: {
          enable: true,
          y: {
            formatter: (val, opt) => formatVal(val),
          },
          x: {
            show: false,
            title: {
              formatter: seriesname => seriesname + ':',
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '12px',
            },
          },
        },
        xaxis: {
          labels: {
            formatter: (val, opt) => formatVal(val),
            style: {
              fontSize: '12px',
            },
          },
        },
        grid: {
          column: {
            colors: ['#232d4b', '#e57200'],
            opacity: 0.07,
          },
          show: true,
          yaxis: {
            lines: {
              show: false,
            },
          },
          xaxis: {
            lines: {
              show: true,
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
      // [this.industry, this.country, this.startYear, this.endYear] = arr2;
      // companyGrp.order(d => d.patentcount);
      this.series[0].data =
        this.dataDimension === 'country'
          ? countryGrp.top(10).map(el => {
              return { x: el.key, y: el.value };
            })
          : this.dataDimension === 'industry'
          ? industryGrp.top(10).map(el => {
              return { x: el.key, y: el.value };
            })
          : yearGrp.top(Infinity).map(el => {
              return { x: el.key, y: el.value };
            });
    });
  },

  created() {},
};
</script>

<template lang="pug">

div
  vue-chart(:width="chartWidth" :height="chartHeight" :type="chartType" :options="chartOptions" :series="series")
</template>
