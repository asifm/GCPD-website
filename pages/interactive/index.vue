<script>
// todo: change layout of controls?: one below another instead of side by side
// todo: create cleaner layout; use flex?
import introJs from 'intro.js';
import { TweenLite } from 'gsap';

import { lists } from '@/assets/data/listData';
import { FilterBus } from '@/assets/js/FilterBus';

import ComputeData from '@/components/ComputeData';

import SelectParameter from '@/components/inputs/SelectParameter';
import InputRange from '@/components/inputs/InputRange';

import ListTopCompanies from '@/components/outputs/ListTopCompanies';
import MapWithCircles from '@/components/outputs/MapWithCircles';

// todo p1: Remove from data the unimportant countries
let keyCounter = 0;
// default parameters
const defaultCountry = 'All Countries';
const defaultIndustry = 'All Industries';
const defaultRangeYears = [2010, 2017];

export default {
  components: {
    SelectParameter,
    InputRange,
    ListTopCompanies,
    MapWithCircles,
    ComputeData,
  },
  data() {
    return {
      defaultCountry,
      defaultIndustry,
      defaultRangeYears,
      yearsComponentKey: `years-${keyCounter}`,
      industryComponentKey: `industry-${keyCounter}`,
      countryComponentKey: `country-${keyCounter}`,
      // computeComponentKey: 'compute' + 0,
      listComponentKey: `list-${keyCounter}`,
      listLength: 25,
      sumPatentsInSelectedData: null,
      tweenedNumber: 0,
    };
  },
  computed: {
    sumPatentsInSelectedDataAnimated: function() {
      return this.tweenedNumber.toFixed(0);
    },
  },
  watch: {
    sumPatentsInSelectedData: function(newVal) {
      TweenLite.to(this.$data, 2, {
        tweenedNumber: newVal,
      });
    },
  },
  mounted() {
    this.startGuide();
    FilterBus.$on('new-data', dataObj => {
      const { cf } = dataObj;

      this.sumPatentsInSelectedData = cf
        .groupAll()
        .reduceSum(d => d.patentcount)
        .value();
    });
  },
  methods: {
    // todo: by single year; by single decade
    // exploreBySingleYear(event) {
    //   console.log('change received');
    //   this.startYear = Number(event.target.value);
    //   this.endYear = this.startYear;
    // },

    resetData() {
      keyCounter += 1;
      this.yearsComponentKey = `years-${keyCounter}`;
      this.countryComponentKey = `country-${keyCounter}`;
      this.industryComponentKey = `industry-${keyCounter}`;
      // this.computeComponentKey = `compute-${keyCounter}`;
      this.listComponentKey = `list-${keyCounter}`;
      FilterBus.$emit('reset-data');
    },
    startGuide() {
      // todo: use json to define steps (https://github.com/usablica/intro.js/blob/master/example/programmatic/index.html)
      introJs().start();
    },
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/introjs.min.css',
        },
      ],
    };
  },
};
</script>

<template lang="pug">
div.uk-section.uk-padding-remove-vertical.uk-margin-medium
  div.uk-container.uk-container-expand
    div.uk-h2#heading(
      data-intro="Use this tool to explore the entire global corporate patent dataset."
      ) <span class="my-text-heavy fg-orange-300"> Explore </span> the World of Corporate Patents
      
    div.uk-grid(uk-grid)
      div.uk-width-3-4
        div.uk-width-1-1.uk-grid.uk-flex-bottom(uk-grid)
          div.uk-width-1-4(
            data-step=2
            data-intro="Select a country and/or an industry. <br><br> The data and visualizations will change to reflect your selection."
            )
            div.uk-padding-small.uk-box-shadow-small.bg-orange-fade-out-9.uk-box-shadow-hover-medium
              select-parameter(
                :key="countryComponentKey"
                :selected_="defaultCountry"
                param-list="countries" 
                )
              br
              select-parameter(
                :key="industryComponentKey"
                :selected_="defaultIndustry"
                param-list="industries" 
                )

          div.uk-width-1-2(
            data-step=3 
            data-intro="Filter the data by years. Select a period by changing the beginning year, end year, or both."
            )
            
            input-range(
              :key="yearsComponentKey"
              :rangeYears_="defaultRangeYears"
              )
          
          div.uk-width-1-4
            div(
              data-step=7 
              data-intro="You can again start this guide from here. <br><br>At any point, you can set everything on the page to its beginning state using the reset button."
              )
              button.uk-button.uk-button-small.uk-margin-small(
                @click="startGuide"
                ) Guide
              br
              button.uk-button.uk-button-small(
                @click="resetData"
                ) Reset Data &amp; Map
            
        div.uk-width-1-1.uk-margin-top.uk-margin-medium-left(
            data-step=4 
            data-intro="The circles on the map show total patent counts by country. To see the data for a country, hover over its circle. <br><br> Double click to zoom and drag to pan. Get back to full view using the reset button above.<br><br> When the data changes, the circles rescale based on the then current minimum and maximum."
            )
          div.my-text-thin.uk-animation-fade.fg-blue-400.uk-position-fixed#totalcount(
            v-show="sumPatentsInSelectedData > 0"
            ) {{  sumPatentsInSelectedDataAnimated | thousandComma  }} patents

          map-with-circles.uk-align-center(
            :width="900" 
            :height="500"
            )
      div.uk-width-1-4
        //- compute-data(:key="computeComponentKey")
        compute-data
        list-top-companies.uk-box-shadow-large.uk-animation-slide-left(
          :key="listComponentKey"
          :listLength="listLength" 
          data-position="auto" 
          data-scrollTo="#top" 
          data-step=6 
          data-intro="List of the most innovative companies within the selected industry, region, and time period."
          )
        
</template>
<style lang="scss" scoped>
#totalcount {
  font-size: 2rem;
}
#heading {
  font-size: 2.3rem;
}
</style>
