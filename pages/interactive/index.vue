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
      listLength: 10,
      componentToShow: 'both',
      spinOn: false,
    };
  },
  watch: {
    // $data: {
    //   handler: function(newVal, oldVal) {
    //     console.log('handler activated', newVal, oldVal);
    //     this.spinOn = true;
    //     setTimeout(() => {
    //       this.spinOn = false;
    //     }, 3000);
    //   },
    //   deep: true,
    // },
  },
  beforeUpdate() {
    FilterBus.$on('new-data', () => {
      this.spinOn = true;
      setTimeout(() => {
        this.spinOn = false;
      }, 3000);
    });
  },
  updated() {
    // console.log('updated');
  },
  methods: {
    exploreBySingleYear(event) {
      console.log('change received');
      this.startYear = Number(event.target.value);
      this.endYear = this.startYear;
    },
  },
};
</script>

<template lang="pug">
.uk-section
  .uk-container.uk-container-expand
    .uk-h2 <span class="my-text-heavy fg-blue"> Explore </span> the World of Corporate Patents
    .uk-grid.uk-grid-small(uk-grid uk-sortable)
      .uk-width-3-4(uk-sortable)
        .uk-width-1-1(uk-grid uk-sortable).uk-grid
          .uk-width-1-4(uk-sortable)
            select-param-from-list(param-list="countries" :selected_="defaultCountry").uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium
            select-param-from-list(param-list="industries" :selected_="defaultIndustry").uk-margin-small-bottom.bg-orange-50.uk-box-shadow-medium

          .uk-width-1-4.uk-grid(uk-grid uk-sortable).uk-grid-collapse
            .uk-width-1-4(uk-sortable)
              input-number(type="number" event-name="change-startyear" :selected_.sync="startYear").uk-form-width-small.uk-box-shadow-medium
              input-number(type="number" event-name="change-endyear" :selected_.sync="endYear").uk-form-width-small.uk-box-shadow-medium
            .uk-width-1-2(uk-sortable)
              input-number(@change="exploreBySingleYear" type="range" event-name="change-startyear" :selected_.sync="startYear").uk-range.uk-box-shadow-medium
              input-number(type="range" event-name="change-endyear" :selected_.sync="endYear").uk-range.bg-blue-50.uk-box-shadow-medium
          
          .uk-width-1-4(uk-sortable)
            button.uk-button.uk-button-small.bg-blue-100(@click="componentToShow='map'") Only Map  
            button.uk-button.uk-button-small.bg-blue-50(@click="componentToShow='graphs'") Only Graphs
            button.uk-button.uk-button-small.bg-orange-200(@click="componentToShow='both'") Both 
            
          .uk-width-1-4
            span(uk-spinner="ratio:3" v-show="spinOn") Calculating...
            //- p Explore by Decade
            //- input(@change.number="viewByDecade" type="range" step="10" min="1950" max="2020").uk-form-width-medium.uk-box-shadow-medium

               
        .uk-width-1-1.uk-padding-remove.uk-margin-top.uk-box-shadow-small(uk-sortable)
          div(v-show="componentToShow === 'map' || componentToShow === 'both'").uk-animation-fade
            div
              map-with-circles(:width="1200" :height="600").uk-animation-fade
          
          div(v-show="componentToShow === 'graphs' || componentToShow === 'both'" uk-sortable).uk-padding-small.uk-animation-fade
            .uk-grid(uk-grid uk-sortable).uk-child-width-expand
              div
                graph-bar(:chartWidth="550" :chartHeight="350" dataDimension="country" chartType="bar")
              div
                graph-bar(:chartWidth="550" :chartHeight="350" dataDimension="industry" chartType="bar")
            .uk-grid(uk-grid uk-sortable).uk-child-width-expand  
              div
                graph-line(:chartWidth="550" :chartHeight="350" dataDimension="year" chartType="area")
              div
                graph-donut(:chartWidth="500" :chartHeight="300" dataDimension="region" chartType="donut")
    
      .uk-width-1-4
        compute-data(:country_="defaultCountry" :industry_="defaultIndustry" :startYear_="startYear" :endYear_="endYear")
        list-company-detailed(:listLength="listLength").uk-box-shadow-large
        
</template>
