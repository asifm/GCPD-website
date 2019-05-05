<script>
import {
  permute as d3Permute,
  pairs as d3Pairs,
  cross as d3Cross,
  format as d3Format,
} from 'd3';
import ChartStacked from '@/components/outputs/ChartStacked';
import ChartHeatmap from '@/components/outputs/ChartHeatMap';

import { lists } from '@/assets/data/listData.js';
import {
  industriesObj,
  regionIndustryDataProm,
} from '@/assets/js/fetchData.js';
import { returnStatement } from 'babel-types';

const regionList = ['Asia Pacific', 'Europe', 'North America'];
const industryList = Object.values(industriesObj);
const regionIndustryCross = d3Cross(regionList, industryList);

export default {
  components: {
    ChartStacked,
    ChartHeatmap,
  },
  data() {
    return {
      regionIndustryHeatmapOpts: {
        series: [],
        xAxis: {
          categories: industryList,
        },
        yAxis: {
          categories: regionList,
        },
        tooltip: {
          style: {
            fontSize: '15px',
          },
          formatter() {
            return (
              '<i>' +
              this.series.xAxis.categories[this.point.x] +
              '</i> in <b>' +
              this.series.yAxis.categories[this.point.y] +
              '</b><br /> <b>' +
              d3Format(',')(this.point.value) +
              '</b> Patents'
            );
          },
        },
      },
    };
  },
  beforeCreate() {
    const vm = this;
    regionIndustryDataProm.then(data_ => {
      const seriesData = regionIndustryCross.map(el => {
        const matchedRow = data_.find(
          row => row.region == el[0] && row.industry == el[1],
        );
        const returnObj = {
          x: industryList.indexOf(el[1]),
          y: regionList.indexOf(el[0]),
        };

        if (matchedRow == undefined) {
          returnObj['value'] = 0;
        } else {
          returnObj['value'] = +matchedRow.count_patents;
        }
        return returnObj;
      });
      vm.regionIndustryHeatmapOpts.series.push({
        data: seriesData,
      });
    });

    //     const vm = this;
    //     yearIndustryDataProm.then(data_ => {
    //       Object.keys(industriesObj).forEach(el => {
    //         const filteredData = data_
    //           .filter(el1 => el1.industry_code == el)
    //           .map(el1 => +el1.count_patents);
    //         vm.industryYearStreamgraphOpts.series.push({
    //           data: filteredData,
    //           name: industriesObj[el],
    //         });
    //       });
    //       // vm.industryYearStreamgraphOpts.xAxis.categories =
    //       // vm.industryYearStreamgraphOpts.chart.type = 'line';
    //     });
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container.uk-container-expand
    .uk-grid(uk-grid).uk-grid-match
      .uk-width-1-3
      .uk-width-2-3
        chart-heatmap(:custom-options="regionIndustryHeatmapOpts")
</template>
