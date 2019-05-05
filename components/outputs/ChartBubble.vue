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
        chart: {
          type: 'bubble',
          zoomType: 'xy',
        },
        title: {
          text: '',
        },

        xAxis: {
          gridLineWidth: 1,
        },
        yAxis: {
          startOnTick: false,
          endOnTick: false,
        },
        series: [],
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
  //- p {{ chartOptions }}
  chart-highchart(:options="chartOptions")
</template>
