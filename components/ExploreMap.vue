<script>
// ::import npm modules
// ::import components
import { FilterBus } from '@/assets/js/FilterBus';
import SelectParamFromList from '@/components/SelectParamFromList';
import InputNumber from '@/components/InputNumber';
// import ListCompanyDetailed from '@/components/ListCompanyDetailed';
import MapWithCircles from '@/components/MapWithCircles';
import ComputeData from '@/components/ComputeData';

// ::import functions

// ::import content

// todo p2: get country name by clicking on the map
// todo p1: Remove from data the unimportant countries

export default {
  components: {
    SelectParamFromList,
    InputNumber,
    // ListCompanyDetailed,
    MapWithCircles,
    ComputeData,
  },
  data() {
    return {
      defaultCountry: 'All Countries',
      defaultIndustry: 'All Industries',
      defaultStartYear: 2000,
      defaultEndYear: 2017,
      listLengthSelected: 10,
      topCompanies: [],
    };
  },
  beforeCreate() {
    // listen for new data from compute-data component
    FilterBus.$on('new-data', (payload1, payload2) => {
      this.topCompanies = payload1.top(20);
    });
  },
  updated() {
    // todo p2: update circles size on data update.
  },
};
</script>

<template lang="pug">

.uk-container.uk-container-large
  .uk-grid(uk-grid).uk-grid-collapse
    .uk-width-1-1.uk-padding-remove
      h2 Explore the World of Corporate Patents
      
      
  .uk-grid.uk-grid-small(uk-grid)
    .uk-width-3-4
      .uk-width-1-1(uk-grid).uk-grid
        .uk-width-1-4
          select-param-from-list(param-list="countries" :selected="defaultCountry").uk-margin-small-bottom
          select-param-from-list(param-list="industries" :selected="defaultIndustry").uk-margin-small-bottom
        
        .uk-width-1-2.uk-grid(uk-grid).uk-grid-collapse
          .uk-width-1-4
            input-number(type="number" event-name="change-startyear" :selected="defaultStartYear").uk-input.uk-form-width-small
            input-number(type="number" event-name="change-endyear" :selected="defaultEndYear").uk-input.uk-form-width-small
          .uk-width-3-4
            input-number(type="range" event-name="change-startyear" :selected="defaultStartYear").uk-range
            input-number(type="range" event-name="change-endyear" :selected="defaultEndYear").uk-range
          
        .uk-width-1-4
      .uk-width-1-1.uk-padding-remove.uk-margin-top
        map-with-circles
    .uk-width-1-4
      compute-data
      //- list-company-detailed(:topCompaniesListLength="listLengthSelected")
      ul
        li(v-for="k,v of topCompanies") {{ k }}:: {{ v }}
</template>
