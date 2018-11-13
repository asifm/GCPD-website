<script>
// todo p3: use icons for industries, instead of text
// todo p3: tweening to animate number changes: https://vuejs.org/v2/guide/transitioning-state.html#Organizing-Transitions-into-Components

// :: import functions
import { dataProm } from 'assets/js/fetchData';
import { filterData } from 'assets/js/filterData';
import { rollupData } from 'assets/js/rollupData';
// ::import data
import lists from 'assets/data/lists.json';

let { industries, dataYearRange } = lists;

export default {
  //  findout: Should the props have default values here?
  props: {
    region: { type: String, default: 'All Regions' },
    country: { type: String, default: 'All Countries' },
    ff_short: { type: String, default: 'All Industries' },
    startYear: { type: Number, default: 2016 },
    endYear: { type: Number, default: 2016 },
    numTopCompanies: { type: Number, default: 10 },
  },
  data() {
    return {
      // To track the current subset of data selected
      allData: [],
      industries,
      // Long name of the ff_short industry
      ff_desc: 'All Industries',
      sumPatentInSelectedData: null,
      numCompaniesInSelectedData: null,
    };
  },
  computed: {
    topCompanies: function() {
      // todo: refactor to transfer some of the code to methods or other computed properties
      // todo: check if it makes more sense to use watchers
      let filteredData = filterData(
        this.allData,
        this.startYear,
        this.endYear,
        this.ff_short,
        this.region,
        this.country,
        dataYearRange,
      );
      let rolledupData = rollupData(filteredData);
      // Return the list of top n companies along with each company's aggregate data
      return Array.from(rolledupData)
        .sort((a, b) => b[1].totalpatent - a[1].totalpatent)
        .slice(0, this.numTopCompanies);
    },
  },
  watch: {
    ff_short: function() {
      this.ff_desc = industries.find(
        el => el.ff_short == this.ff_short,
      ).ff_desc;
    },
  },
  mounted() {
    dataProm.then(data => (this.allData = data));
  },
};
</script>

<template lang="pug">
.uk-tile.uk-box-shadow-large.uk-padding-small
  div.uk-text-left.uk-card-header.uk-padding-small
    h5.uk-text-large.fg-yellowgreen-darken-0.uk-margin-small.uk-text-left {{ startYear }}<span v-if="startYear != endYear">–{{ endYear }}</span>
    h4.uk-margin-remove
      span.text-medium.fg-blue(v-if="country == 'All Countries'") {{ region }} | 
      span.fg-orange {{ country }} 
    //- Show end year only if it's different from start year; same start and end means single year selection
    h5.fg-gold-darken-2.uk-margin-remove.uk-text-small {{ ff_desc }}
    div.fg-yellowgreen-darken-3 {{  sumPatentInSelectedData | thousandComma  }} Patents | 
      span {{  numCompaniesInSelectedData | thousandComma  }} companies
    
  
  
  ul.uk-list.uk-list-striped
    li(v-for="(company, i) in topCompanies" :key="company[1].gvkey + i").uk-text-left.uk-animation-slide-left
      
      span.fg-blue-lighten-1.uk-text-bold.uk-text-uppercase.uk-button-text  {{ company[0] | removePeriods }} <br>
      div(uk-drop="pos:left-center")
        .uk-card.uk-card-default.uk-card-body.uk-padding-small
          ul.uk-card-header
            li.uk-text-small.fg-black {{ company[1].ff_short}} | {{ startYear}}<span v-if="startYear != endYear">–{{ endYear }}</span>
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

      h3.uk-margin-remove.fg-orange.uk-text-large.uk-float-right {{ company[1].totalpatent | thousandComma }}
    
      span.uk-label.bg-blue-lighten-4 {{ i+1 }}
      span.fg-blue-lighten-3  {{ company[1].ff_short }} <br>

   
  </template>
