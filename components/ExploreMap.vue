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
      startYear: 2000,
      endYear: 2017,
      listLength: 50,
      topCompanies: [],
    };
  },
  beforeCreate() {
    // fix or no? the filter of the dim that's last filtered has no effect on *that* dim
    // maybe no need to fix? maybe it's desirable?

    // listen for new data from compute-data component
    FilterBus.$on('new-data', (
      companyGrp, //
      industryGrp,
      countryGrp,
      yearGrp,
    ) => {
      this.topCompanies = companyGrp.top(this.listLength);

      console.log(yearGrp.top(Infinity).filter(el => el.value > 0));
      console.log(companyGrp.top(Infinity).filter(el => el.value > 0));

      console.log(industryGrp.top(Infinity).filter(el => el.value > 0));
      console.log(countryGrp.top(Infinity).filter(el => el.value > 0));
    });
  },
  updated() {
    // todo p2: update circles size on data update.
  },
  methods: {},
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
          select-param-from-list(param-list="countries" :selected_="defaultCountry").uk-margin-small-bottom
          select-param-from-list(param-list="industries" :selected_="defaultIndustry").uk-margin-small-bottom
        
        .uk-width-1-2.uk-grid(uk-grid).uk-grid-collapse
          .uk-width-1-4
            input-number(type="number" event-name="change-startyear" :selected_.sync="startYear").uk-input.uk-form-width-small
            input-number(type="number" event-name="change-endyear" :selected_.sync="endYear").uk-input.uk-form-width-small
          .uk-width-3-4
            input-number(type="range" event-name="change-startyear" :selected_.sync="startYear").uk-range
            input-number(type="range" event-name="change-endyear" :selected_.sync="endYear").uk-range
          
        .uk-width-1-4
      .uk-width-1-1.uk-padding-remove.uk-margin-top
        map-with-circles
    .uk-width-1-4
      compute-data(:country_="defaultCountry" :industry_="defaultIndustry" :startYear_="startYear" :endYear_="endYear")
      //- list-company-detailed(:listLength="listLength")
      ul
        li(v-for="k,v of topCompanies") {{ k }}:: {{ v }}
</template>
