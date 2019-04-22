<script>
// todo: change layout of controls?: one below another instead of side by side
// todo: create cleaner layout; use flex?
import introJs from 'intro.js';

import { lists } from '@/assets/data/listData';
import { FilterBus } from '@/assets/js/FilterBus';

import ComputeData from '@/components/ComputeData';

import SelectParameter from '@/components/inputs/SelectParameter';
import InputRange from '@/components/inputs/InputRange';

import ListCompanyDetailed from '@/components/outputs/ListCompanyDetailed';
import MapWithCircles from '@/components/outputs/MapWithCircles';

// todo p1: Remove from data the unimportant countries

export default {
  components: {
    SelectParameter,
    InputRange,
    ListCompanyDetailed,
    MapWithCircles,
    ComputeData,
  },
  data() {
    return {
      defaultCountry: 'All Countries',
      defaultIndustry: 'All Industries',
      rangeYears: [lists.dataYearRange.min, lists.dataYearRange.max],
      minYear: lists.dataYearRange.min,
      maxYear: lists.dataYearRange.max,
      listLength: 25,
    };
  },
  computed: {
    startYear: {
      get() {
        return this.rangeYears[0];
      },
      set(newValue) {
        this.rangeYears[0] = newValue;
      },
    },
    endYear: {
      get() {
        return this.rangeYears[1];
      },
      set(newValue) {
        this.rangeYears[1] = newValue;
      },
    },
  },
  mounted() {
    this.startGuide();
    FilterBus.$on('new-data', dataObj => {
      const { rangeYears } = dataObj;
      this.rangeYears = rangeYears;
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
      // todo: Use $on to reset all data in other components
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
div.uk-section
  div.uk-container.uk-container-expand
    div.uk-h2(
      data-intro="Use this tool to explore the entire global corporate patent dataset."
      ) <span class="my-text-heavy fg-blue-200"> Explore </span> the World of Corporate Patents
    div.uk-grid(uk-grid)
      div.uk-width-3-4
        div.uk-width-1-1.uk-grid(uk-grid).uk-padding-large.uk-padding-remove-vertical
          div.uk-width-1-4(
            data-step=2
            data-intro="Select a country and/or an industry. <br><br> The data and visualizations will change to reflect your selection."
            )
            select-parameter.uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium(
              :selected_="defaultCountry"
              param-list="countries" 
              )
            select-parameter.uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium(
              :selected_="defaultIndustry"
              param-list="industries" 
              )

          div.uk-width-1-2(
            data-step=3 
            data-intro="Filter the data by years. Select a period by changing the beginning year, end year, or both."
            )
            //- todo: remove these; use them as read-only labels instead for the slider
            
            p Select years. Now showing <strong>{{ startYear }}</strong> through <strong>{{ endYear }}</strong>.
            input-range.el-form-item--medium(
              :rangeYears_="rangeYears"
              )
          
          div.uk-width-1-4
            div(
              data-step=7 
              data-intro="You can again start this guide from here. <br><br>At any point, you can set everything on the page to its beginning state using the reset button."
              ).uk-text-center
              button.uk-button.uk-button-small.uk-button-text(
                @click="startGuide"
                ) Guide
              br
              button.uk-button.uk-button-small.uk-button-text(
                @click="resetData"
                ) Reset Data &amp; Map
              
            
        div.uk-width-1-1.uk-margin-top(
            data-step=4 
            data-intro="The circles on the map show total patent counts by country. To see the data for a country, hover over its circle. <br><br> Double click to zoom and drag to pan. Get back to full view using the reset button above.<br><br> When the data changes, the circles rescale based on the then current minimum and maximum."
            )
            map-with-circles.uk-align-right(
              :width="900" 
              :height="500"
              )
          
      div.uk-width-1-4
        compute-data
        list-company-detailed.uk-box-shadow-large.uk-animation-slide-left(
          :listLength="listLength" 
          data-position="auto" 
          data-scrollTo="#top" 
          data-step=6 
          data-intro="List of the most innovative companies within the selected industry, region, and time period."
          )
        
</template>
