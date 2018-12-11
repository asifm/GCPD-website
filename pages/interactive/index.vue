<script>
// ::import npm modules
// ::import components
import { FilterBus } from '@/assets/js/FilterBus';

import SelectParamFromList from '@/components/inputs/SelectParamFromList';
import InputNumber from '@/components/inputs/InputNumber';

import ComputeData from '@/components/computes/ComputeData';

import ListCompanyDetailed from '@/components/outputs/ListCompanyDetailed';
import MapWithCircles from '@/components/outputs/MapWithCircles';
import GraphBar from '@/components/outputs/GraphBar';
import GraphLine from '@/components/outputs/GraphLine';
import GraphDonut from '@/components/outputs/GraphDonut';
import { setTimeout } from 'timers';

// todo p2: get country name by clicking on the map
// todo p1: Remove from data the unimportant countries

export default {
  components: {
    SelectParamFromList,
    InputNumber,
    ListCompanyDetailed,
    MapWithCircles,
    ComputeData,
    GraphBar,
    GraphLine,
    GraphDonut,
  },
  data() {
    return {
      defaultCountry: 'All Countries',
      defaultIndustry: 'All Industries',
      startYear: 2000,
      endYear: 2017,
      listLength: 30,
      componentToShow: 'both',
      spinOn: true,
    };
  },
  mounted() {
    // this.spinOn = true;
    setTimeout(() => {
      this.spinOn = false;
    }, 4500);
  },
  beforeUpdate() {
    FilterBus.$on('new-data', () => {
      this.spinOn = true;
      setTimeout(() => {
        this.spinOn = false;
      }, 2000);
    });
  },
  updated() {
    // console.log('updated');
  },
  methods: {
    // todo: by single year; by single decade
    // exploreBySingleYear(event) {
    //   console.log('change received');
    //   this.startYear = Number(event.target.value);
    //   this.endYear = this.startYear;
    // },

    resetData() {
      FilterBus.$emit('reset-data');
    },
  },
};
</script>

<template lang="pug">
.uk-section
  .uk-container.uk-container-expand
    .uk-h1 <span class="my-text-heavy fg-blue"> Explore </span> the World of Corporate Patents
    div.uk-position-absolute.uk-position-top-center
      span(uk-spinner="ratio:4" v-show="spinOn").fg-blue-300 Calculating...
    .uk-grid.uk-grid-small(uk-grid )
      .uk-width-3-4
        .uk-width-1-1(uk-grid).uk-grid.uk-grid-small
          .uk-width-1-4
            select-param-from-list(param-list="countries" :selected_="defaultCountry").uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium
            select-param-from-list(param-list="industries" :selected_="defaultIndustry").uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium

          .uk-width-1-2.uk-grid(uk-grid )
            .uk-width-1-4
              input-number(type="number" event-name="change-startyear" :selected_.sync="startYear").uk-box-shadow-medium.uk-form-width-large
              input-number(type="number" event-name="change-endyear" :selected_.sync="endYear").bg-blue-50.uk-box-shadow-medium
            
            .uk-width-1-2.uk-margin-remove.uk-padding-remove
              input-number(type="range" event-name="change-startyear" :selected_.sync="startYear").uk-range.uk-box-shadow-medium
              input-number(type="range" event-name="change-endyear" :selected_.sync="endYear").uk-range.bg-blue-50.uk-box-shadow-medium
          
          .uk-width-1-4
            .uk-button-group
              button.uk-button.uk-button-secondary.uk-button-small(@click="resetData") Reset
              button.uk-button.uk-button-primary.uk-button-small Tour
            div
              div.uk-button-group.uk-margin-top
                button.uk-button.my-text-tiny.uk-button-text(@click="componentToShow='map'").uk-margin-small-right Only Map
                button.uk-button.my-text-tiny.uk-button-text(@click="componentToShow='graphs'").uk-margin-small-right Only Graphs
                button.uk-button.my-text-tiny.uk-button-text(@click="componentToShow='both'") Both
            
          
            //- p Explore by Decade
            //- input(@change.number="viewByDecade" type="range" step="10" min="1950" max="2020").uk-form-width-medium.uk-box-shadow-medium

               
        .uk-width-1-1.uk-padding-remove.uk-margin-top.uk-box-shadow-small
          div(v-show="componentToShow === 'map' || componentToShow === 'both'")
            div
              map-with-circles(:width="1200" :height="600")
          
          //- div(v-show="componentToShow === 'graphs' || componentToShow === 'both'" ).uk-padding-small.uk-animation-fade
          //-   .uk-grid(uk-grid ).uk-child-width-expand
          //-     div
          //-       graph-bar(:chartWidth="550" :chartHeight="350" dataDimension="country" chartType="bar")
          //-     div
          //-       graph-bar(:chartWidth="550" :chartHeight="350" dataDimension="industry" chartType="bar")
          //-   .uk-grid(uk-grid ).uk-child-width-expand  
          //-     div
          //-       graph-line(:chartWidth="550" :chartHeight="350" dataDimension="year" chartType="area")
          //-     div
          //-       graph-donut(:chartWidth="500" :chartHeight="300" dataDimension="region" chartType="donut")
    
      .uk-width-1-4
        compute-data(:country_="defaultCountry" :industry_="defaultIndustry" :startYear_="startYear" :endYear_="endYear")
        list-company-detailed(:listLength="listLength").uk-box-shadow-large
        
</template>
