<script>
import { format as d3Format } from 'd3';
import ChartStacked from '@/components/outputs/ChartStacked';
import ChartBubble from '@/components/outputs/ChartBubble';

import { lists } from '@/assets/data/listData.js';
import {
  industriesObj,
  yearIndustryDataProm,
  company1980to89DataProm,
  company2007to16DataProm,
} from '@/assets/js/fetchData.js';

export default {
  components: {
    ChartStacked,
    ChartBubble,
  },
  data() {
    return {
      numBubbles: 30,
      company1980to89BubbleOpts: {
        series: [],
        chart: {
          type: 'bubble',
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: 'Total Number of Patents Over Ten Years',
          },
        },
        xAxis: {
          labels: {
            formatter() {
              return d3Format('$~s')(this.value * 1000000).replace('G', 'B');
            },
          },
          title: {
            text:
              'Total Spent on Research & Development Over Ten Years<br> Size of a Circle Indicates Sales Revenue.',
          },
        },
        title: {
          text: 'R&D vs. Patent Count: Top 30 Companies (1980–1989)',
        },
        tooltip: {
          useHTML: true,
          formatter() {
            return `<b>${
              this.point.company
            }</b><br>Total Spent on R&D: ${d3Format('$~s')(
              this.point.x * 1000000,
            ).replace('G', 'B')}<br>Number of Patents: ${
              this.point.y
            }<br>Total Sales: ${d3Format('$~s')(this.point.z * 1000000).replace(
              'G',
              'B',
            )} `;
          },
        },
      },
      company2007to16BubbleOpts: {
        series: [],
        chart: {
          type: 'bubble',
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: 'Total Number of Patents Over Ten Years',
          },
        },
        xAxis: {
          labels: {
            formatter() {
              return d3Format('$~s')(this.value * 1000000).replace('G', 'B');
            },
          },
          title: {
            text:
              'Total Spent on Research & Development Over Ten Years<br> Size of a Circle Indicates Sales Revenue',
          },
        },
        title: {
          text: 'R&D vs. Patent Count: Top 30 Companies (2007–2016)',
        },
        tooltip: {
          useHTML: true,
          formatter() {
            return `<b>${
              this.point.company
            }</b><br>Total Spent on R&D: ${d3Format('$~s')(
              this.point.x * 1000000,
            ).replace('G', 'B')}<br>Number of Patents: ${
              this.point.y
            }<br>Total Sales: ${d3Format('$~s')(this.point.z * 1000000).replace(
              'G',
              'B',
            )} `;
          },
        },
      },
      yearIndustryColumnOpts: {
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
        title: {
          text: 'Industry Share of Patents by Year (1980–2016)',
        },
      },
      yearIndustryStreamOpts: {
        series: [],
        chart: {
          type: 'streamgraph',
        },
        yAxis: {
          labels: {
            formatter() {
              return d3Format('~s')(this.value).replace('-', '');
            },
          },
          title: {
            text: 'Number of Patents',
          },
        },
        title: {
          text: 'Number of Patents by Industry and Year (1980–2016)',
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

        vm.company1980to89BubbleOpts.series.push({
          data: industryData,
          name: industriesObj[industry_code],
        });
      });
    });
    company2007to16DataProm.then(data_ => {
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

        vm.company2007to16BubbleOpts.series.push({
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
        vm.yearIndustryColumnOpts.series.push(seriesItem);
        vm.yearIndustryStreamOpts.series.push(seriesItem);
      });
    });
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small.uk-section-muted
  .uk-container 
    .uk-h1 Technology Industry Leading in Innovation
    .uk-grid(uk-grid).uk-card-default.uk-padding
      .uk-width-1-3
        p.uk-margin-large-top Consistent with broader trends in business and society, innovation now more often takes place in technology-focused companies — those with a significant technological component in their business operations and products — than in any other industry.
        p We use Fama &amp; French 12-Industry Classification in our analysis, where the business equipment and software industry is an approximation of what one would today call high technology.
          a(href="/data-highlights/note-industry-classification")  Note on industry classification.
        br
        p.uk-text-large Hover over the charts for more details.
      .uk-width-2-3
        chart-stacked(:custom-options="yearIndustryColumnOpts")
    .uk-grid(uk-grid).uk-card-default.uk-padding
      .uk-width-1-3
        p.uk-margin-large-top The chart above does not capture the fast growth in annual patent grants during this period. When put in that context, as is done in the streamgraph here, the surge of patents in the technology industry is even more striking. 
      .uk-width-2-3
         chart-stacked(:custom-options="yearIndustryStreamOpts") 
    .uk-grid(uk-grid).uk-card-default.uk-padding
      .uk-width-1-3
        p.uk-margin-large-top The two bubble charts show the top 30 companies, by total count of patents over ten years, of two very different periods: 1980–1989 and 2007–2016. The periods represent the first ten and last ten years of our dataset's coverage. 
        p Today's top companies generate an order of magnitude more patents than those of 1980s. We cannot directly compare R&amp;D expenditure between these two periods without taking the changing value of US$ into account. It, however, appears that the growth in patents over time is faster than the growth in R&amp;D expenditure.
      .uk-width-2-3
         chart-bubble(:custom-options="company1980to89BubbleOpts") 
         chart-bubble(:custom-options="company2007to16BubbleOpts") 

</template>
