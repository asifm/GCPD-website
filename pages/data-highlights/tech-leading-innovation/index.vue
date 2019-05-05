<script>
import { format } from 'd3';
import ChartStacked from '@/components/outputs/ChartStacked';
import ChartBubble from '@/components/outputs/ChartBubble';

import { lists } from '@/assets/data/listData.js';
import {
  industriesObj,
  yearIndustryDataProm,
  company1980to89DataProm,
} from '@/assets/js/fetchData.js';

export default {
  components: {
    ChartStacked,
    ChartBubble,
  },
  data() {
    return {
      numBubbles: 30,
      company1980BubbleOpts: {
        series: [],
        chart: {
          type: 'bubble',
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          labels: {
            formatter() {
              return format('$~s')(this.value * 1000000).replace('G', 'B');
            },
          },
        },
      },
      industryYearColumnOpts: {
        plotOptions: {
          series: {
            stacking: 'percent',
          },
        },
        series: [],
        chart: {
          type: 'column',
        },
        yAxis: {
          labels: {
            format: '{value}%',
          },
          title: {
            text: '% of Total Patents',
          },
        },
      },
      industryYearStreamgraphOpts: {
        series: [],
        chart: {
          type: 'streamgraph',
        },
        xAxis: {
          gridLineWidth: 1,
        },
        yAxis: {
          labels: {
            formatter() {
              return format('~s')(this.value).replace('-', '');
            },
          },
          title: {
            text: 'Count of Patent',
          },
        },
      },
    };
  },
  beforeCreate() {
    const vm = this;

    company1980to89DataProm.then(data_ => {
      Object.keys(industriesObj).forEach(industry_code => {
        const industryData = data_
          .slice(0, this.numBubbles)
          .filter(row => row.industry_code == industry_code)
          .map(row => ({
            x: +row.total_rdex,
            y: +row.total_count_patents,
            z: +row.total_sales,
            capex: +row.total_capex,
            ebitda: +row.total_ebitda,
            company: row.company,
            industry: row.industry,
          }));

        vm.company1980BubbleOpts.series.push({
          data: industryData,
          name: industriesObj[industry_code],
        });
      });
    });
    yearIndustryDataProm.then(data_ => {
      Object.keys(industriesObj).forEach(industry_code => {
        const filteredData = data_
          .filter(row => row.industry_code == industry_code)
          .map(row => +row.count_patents);
        const seriesItem = {
          data: filteredData,
          name: industriesObj[industry_code],
        };
        vm.industryYearColumnOpts.series.push(seriesItem);
        vm.industryYearStreamgraphOpts.series.push(seriesItem);
      });
    });
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small.uk-section-muted
  .uk-container 
    .uk-grid(uk-grid).uk-grid-match.uk-grid-large
      .uk-width-1-3
        p Laboris aliqua fugiat dolor veniam dolor commodo non duis do elit.
      .uk-width-2-3.uk-card-default.uk-card-body
        chart-stacked(:custom-options="industryYearColumnOpts")
    .uk-grid(uk-grid).uk-grid-match
      .uk-width-1-3
        p Voluptate voluptate reprehenderit incididunt ipsum. Nostrud qui aliqua et culpa labore veniam consequat esse cillum mollit sunt consectetur. Consequat exercitation occaecat anim ipsum enim aliquip laboris voluptate dolore eiusmod ut. In eu elit consectetur magna eu elit esse cillum in et. Do nisi laboris dolore est laborum quis labore sint nostrud in aute ipsum qui nostrud.
      .uk-width-2-3
         chart-stacked(:custom-options="industryYearStreamgraphOpts") 
    .uk-grid(uk-grid).uk-grid-match
      .uk-width-1-3
        p Quis mollit anim velit pariatur sunt occaecat pariatur dolor deserunt do. Irure amet qui ut exercitation occaecat pariatur occaecat occaecat sunt commodo. Fugiat velit esse reprehenderit commodo. Est culpa aute sint ut sint magna anim fugiat et. Non magna magna sunt officia et veniam.
      .uk-width-2-3
         chart-bubble(:custom-options="company1980BubbleOpts") 
</template>
