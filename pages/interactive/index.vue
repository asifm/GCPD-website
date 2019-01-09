<script>
// todo: change layout of controls: one below another instead of side by side
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
      listLength: 20,
      componentToShow: 'both',
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
    // todo: uncomment startTour when ready
    // this.startTour();
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
    startTour() {
      // todo: use json to define steps (https://github.com/usablica/intro.js/blob/master/example/programmatic/index.html)
      introJs().start();
    },
    addHints() {
      // todo: add buttons for hints
      introJs().addHints();
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
      data-intro="Use this tool to explore the entire dataset."
      ) <span class="my-text-heavy fg-blue-200"> Explore </span> the World of Corporate Patents
    div.uk-grid.uk-grid-small(uk-grid)
      div.uk-width-3-4
        div.uk-width-1-1.uk-grid.uk-grid-small(uk-grid)
          div.uk-width-1-4(
            data-step=2
            data-intro="Select a country or an industry. <br><br> All the data and visualizations will change to reflect your selection."
            )
            select-parameter.uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium(
              :selected_="defaultCountry"
              param-list="countries" 
              )
            select-parameter.uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium(
              :selected_="defaultIndustry"
              param-list="industries" 
              )

          div.uk-width-1-2.uk-grid(
            uk-grid
            data-step=3 
            data-intro="Filter the data by years. Change either year or both. <br><br> If the first year matches the last year, you'll get the data for that single year. <br><br>You can also move these sliders around to change the time period."
            )
            //- todo: remove these; use them as read-only labels instead for the slider
            div.uk-width-1-4
              input.uk-input(
                v-model="startYear"
                :min="minYear" 
                :max="maxYear" 
                type="number" 
                readonly
                )
              input.uk-input(
                v-model="endYear"
                :min="minYear" 
                :max="maxYear" 
                type="number" 
                readonly
                )
            div.uk-width-1-2
              input-range.el-form-item--medium(
                :rangeYears_="rangeYears"
                )
          div.uk-width-1-4
            div.uk-button-group(
              data-step=7 
              data-intro="At any point, you can set everything on the page to its beginning state. <br><br> You can also start this tour from here. <br><br> The smaller buttons let you customize the view to your preference."
              )
              button.uk-button.uk-button-secondary.uk-button-small(
                @click="resetData"
                ) Reset
              button.uk-button.uk-button-primary.uk-button-small(
                @click="startTour"
                ) Tour
              button.uk-button.uk-button-success.uk-button-small(
                @click="addHints"
                ) Hints
            div
              div.uk-button-group.uk-margin-top
                button.uk-button.my-text-tiny.uk-button-text.uk-margin-small-right(
                  @click="componentToShow='map'"
                  ) Only Map
                button.uk-button.my-text-tiny.uk-button-text.uk-margin-small-right(
                  @click="componentToShow='graphs'"
                  ) Only Graphs
                button.uk-button.my-text-tiny.uk-button-text(
                  @click="componentToShow='both'"
                  ) Both
        div.uk-width-1-1.uk-padding-remove.uk-margin-top.uk-box-shadow-small 
          div(v-show="componentToShow === 'map' || componentToShow === 'both'")
            div(
              data-step=4 
              data-intro="The circles on the map show total patent counts by country. To see the data for a country, hover over its circle. <br><br> Double click to zoom and drag to pan. Get back to full view using the reset button above.<br><br> When the data changes, the circles rescale based on the then current minimum and maximum."
              )
              map-with-circles(
                :width="1200" 
                :height="600"
                )
          
      div.uk-width-1-4
        compute-data
        list-company-detailed.uk-box-shadow-large(
          :listLength="listLength" 
          data-position="auto" 
          data-scrollTo="#top" 
          data-step=6 
          data-intro="List of the top companies. Move the slider to adjust the list size. <br><br>The background color indicates the region of a company's headquarters. <br><br> See detailed data about a company by hovering over its name."
          )
        
</template>
