<script>
// ::import libraries and/or library functions

// ::import components
// FilterBus is a globally registered vue component (event bus) whose sole purpose is to transfer data between components
import { FilterBus } from '@/assets/js/FilterBus';

// ::import functions
import {
  filterData,
  rollupCompanies,
  sumPatentsNumCompanies,
} from '@/assets/js/computeData.js';

// ::import data and/or data-promises
import { dataProm } from '@/assets/js/fetchData.js';
import { lists } from '@/assets/data/listData.js';

// ::declare/set variables
const industries = lists.industries;

export default {
  props: {
    topCompaniesListLength: { type: Number, default: 10 },
  },
  data() {
    return {
      country: 'All Countries',
      industry_short: 'All Industries',
      startyear: 2015,
      endyear: 2016,
      filteredData: [],
      alldata: [],
    };
  },
  computed: {
    industry_desc: function() {
      return this.industry_short
        ? industries.find(el => el.industry_short == this.industry_short)
            .industry_desc
        : '';
    },
    // returning empty arrays to prevent errors in dependent function call when rendering
    rolledupCompanies() {
      return this.alldata && this.alldata.length > 0
        ? rollupCompanies(this.filteredData)
        : [];
    },
    aggregateSelectedData: function() {
      return this.alldata && this.alldata.length > 0
        ? sumPatentsNumCompanies(this.rolledupCompanies)
        : [];
    },
  },

  beforeCreate() {
    dataProm.then(data => {
      this.alldata = data;
      this.filteredData = filterData(
        this.alldata,
        this.startyear,
        this.endyear,
        this.industry_short,
        this.country,
      );
    });
  },
  mounted() {
    // ::Set the default values in this component's filterParams and send them to the filter controls to show the default values as selected
    FilterBus.$emit('change-startyear', this.startyear);
    FilterBus.$emit('change-endyear', this.endyear);
    FilterBus.$emit('change-industry_short', this.industry_short);
    FilterBus.$emit('change-country', this.country);

    // ::Now listen for FilterBus events and set filterParams values as new value comes in
    FilterBus.$on('change-startyear', payload =>
      this.listenToBus('startyear', payload),
    );
    FilterBus.$on('change-endyear', payload =>
      this.listenToBus('endyear', payload),
    );
    FilterBus.$on('change-industry_short', payload =>
      this.listenToBus('industry_short', payload),
    );
    FilterBus.$on('change-country', payload =>
      this.listenToBus('country', payload),
    );
  },

  methods: {
    listenToBus(param, payload) {
      this[param] = payload;
      if (this.alldata.length > 0)
        this.filteredData = filterData(
          this.alldata,
          this.startyear,
          this.endyear,
          this.industry_short,
          this.country,
        );

      console.log(this.filteredData.length);
      console.dir(this.filteredData[0]);
    },
    removeLastWord(str) {
      let lastIndex = str.lastIndexOf(' ');
      return str.substring(0, lastIndex);
    },
  },
};
</script>

  
<template lang="pug">
.uk-tile.uk-padding-remove(v-if="alldata && alldata.length > 0")
  div.uk-text-left.uk-card-header.uk-padding-small
    //- Show end year only if it's different from start year; same start and end means single year selection
    h5.uk-text-large.fg-yellowgreen-darken-0.uk-margin-small.uk-text-left.uk-text-bold  {{ country }}
      span.fg-blue-lighten-1  | {{ startyear }}<span v-if="startyear != endyear">–{{ endyear }}</span>
    h6.fg-blue-darken-1.uk-margin-remove-top.uk-text-small {{ industry_desc }}

    div(v-if="aggregateSelectedData[0] > 0").fg-orange.uk-animation-fade <strong class="">{{  aggregateSelectedData[1] | thousandComma  }}</strong> companies <br> <strong class="">{{  aggregateSelectedData[0] | thousandComma  }}</strong> patents
    div(v-else) No patent found in the currently selected data.
       
  ul.uk-list.uk-list-striped
    li(v-for="(company, i) in rolledupCompanies.slice(0, topCompaniesListLength)" :key="company[1].gvkey + i").uk-text-left.uk-animation-slide-left
      
      span.fg-blue-lighten-1.uk-text-bold.uk-text-uppercase.uk-button-text  {{ company[0] | removePeriods }} <br>

      div(uk-drop="pos:left-center")
        .uk-card.uk-card-default.uk-card-body.uk-padding-small#pop-details
          ul.uk-card-header
            li.uk-text-small.fg-black {{ company[1].industry_short}} | {{ startyear}}<span v-if="startyear != endyear">–{{ endyear }}</span>
            li.fg-blue.uk-text-bold.uk-text-uppercase.uk-text-break {{ company[0] | removePeriods }}
            li.uk-text-meta {{ company[1].city }}, {{ company[1].country }}
          ul.uk-list.uk-text-right.fg-orange
            li R&amp;D Exp. 
              span.fg-blue $ <span class="">{{ company[1].totalrdex | roundUnit | thousandComma }}</span> M
            li Capital Exp. 
              span.fg-blue $ <span class="">{{ company[1].totalcapex | roundUnit| thousandComma }}</span> M
            li Sales 
              span.fg-blue $ <span class="">{{ company[1].totalsales | roundUnit | thousandComma }}</span> M
            li EBITDA 
              span.fg-blue $ <span class="">{{ company[1].totalebitda | roundUnit | thousandComma }}</span> M
            li Assets 
              span.fg-blue $ <span class="">{{ company[1].totalassets | roundUnit | thousandComma }}</span> M

          div.uk-card-footer
              a.uk-button.uk-button-small.fg-blue-lighten-1(target="_blank" :href="`https://patents.google.com/?assignee=${ removeLastWord(company[0]) }&before=filing:${endyear}1231&after=filing:${startyear}0101&type=PATENT&num=50&sort=new`") Search Patents
              a.uk-button.uk-button-small.fg-orange(target="_blank" :href="'https://www.google.com/search?q=%22'+ removeLastWord(company[0]) +'%22+%22'+company[1].country+'%22'") Search Company
      h3.uk-margin-remove.fg-orange.uk-text-large.uk-float-right {{ company[1].totalpatent | thousandComma }}
    
      span.uk-label.bg-blue-lighten-4 {{ i+1 }}
      span.fg-blue-lighten-3.uk-text-small  {{ company[1].industry_short }} <br>

  </template>

<style lang="scss" scoped>
#pop-details {
  z-index: 10000;
}
</style>
