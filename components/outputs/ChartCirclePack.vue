<script>
import { Chart } from 'highcharts-vue';

import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import moreInit from 'highcharts/highcharts-more';

exportingInit(Highcharts);
moreInit(Highcharts);

export default {
  components: {
    ChartHighchart: Chart,
  },
  props: { customOptions: Object },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          packedbubble: {
            minSize: '20%',
            maxSize: '100%',
            layoutAlgorithm: {
              splitSeries: true,
              gravitationalConstant: 0.05,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true,
            },
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: 250,
          },
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal',
          },
        },
        chart: {
          type: 'packedbubble',
          height: '50%',
        },
        series: [],
        tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.name}:</b> {point.y}</sub>',
        },
      },
    };
  },
  mounted() {
    Object.assign(this.chartOptions, this.customOptions);
  },
};
</script>

<template lang="pug">
div 
  chart-highchart(:options="chartOptions")
</template>
