<script>
import { range } from 'lodash';
import { Chart } from 'highcharts-vue';

import Highcharts from 'highcharts';
import streamgraphInit from 'highcharts/modules/streamgraph';
import seriesLabelInit from 'highcharts/modules/series-label';
streamgraphInit(Highcharts);
seriesLabelInit(Highcharts);
import { industriesObj, yearIndustryDataProm } from '@/assets/js/fetchData.js';

import { lists } from '@/assets/data/listData.js';

export default {
  components: {
    highchart: Chart,
  },
  data() {
    return {
      industry_list: lists.industries,
      chartOptions: {
        plotOptions: {
          series: {
            label: {
              minFontSize: 9,
              maxFontSize: 15,
              onArea: true,
            },
            // stacking: 'percent',
          },
        },
        credits: {
          // enabled: false,
          text: 'Source: UVA Darden Global Corporate Patent Dataset',
          url: 'https://patents.darden.virginia.edu',
        },
        chart: {
          type: 'streamgraph',
          width: 900,
          height: 600,
          zoomType: 'x',
        },
        xAxis: {
          categories: [],
          labels: {
            step: 3,
          },
        },
        yAxis: {
          visible: false,
        },
        series: [],
      },
    };
  },
  mounted() {
    const vm = this;
    yearIndustryDataProm.then(data_ => {
      Object.keys(industriesObj).forEach(el => {
        const filteredData = data_
          .filter(el1 => el1.industry_code == el)
          .map(el1 => +el1.count_patents);
        vm.chartOptions.series.push({
          data: filteredData,
          name: industriesObj[el],
        });
      });
      vm.chartOptions.xAxis.categories = range(1980, 2018);
    });
  },
};
</script>

<template lang="pug">
div
  p testing

  highchart(:options="chartOptions")
</template>
