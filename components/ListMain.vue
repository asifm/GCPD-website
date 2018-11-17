<script>
// todo p3: use icons for industries, instead of text
// todo p3: tweening to animate number changes: https://vuejs.org/v2/guide/transitioning-state.html#Organizing-Transitions-into-Components

// :: import functions
import {
  filterData,
  rollupCompany,
  sumPatentsNumCompanies,
} from 'assets/js/computeData';

// ::import data
import lists from 'assets/data/listData.json';
import { dataProm } from 'assets/js/fetchData';

let { industries, dataYearRange } = lists;

export default {
  //  findout: Should the props have default values here?
  props: {
    region: { type: String, default: 'All Regions' },
    country: { type: String, default: 'All Countries' },
    industry_short: { type: String, default: 'All Industries' },
    startYear: { type: Number, default: 2016 },
    endYear: { type: Number, default: 2016 },
    numTopCompanies: { type: Number, default: 10 },
  },
  data() {
    return {
      // To track the current subset of data selected
      allData: [],
      industries,
      // Long name of the industry_short industry
      industry_desc: 'All Industries',
    };
  },
  computed: {
    rolledupCompany: function() {
      let filteredData = filterData(
        this.allData,
        this.startYear,
        this.endYear,
        this.region,
        this.country,
        this.industry_short,
        dataYearRange,
      );
      // ! returns Array converted from Map
      return rollupCompany(filteredData);
    },
    topCompanies: function() {
      // Return array of top n companies along with each company's aggregate data
      let rolledupCompanyCloned = this.rolledupCompany.slice(0);
      return rolledupCompanyCloned
        .sort((a, b) => b[1].totalpatent - a[1].totalpatent)
        .slice(0, this.numTopCompanies);
    },
    aggregateSelectedData: function() {
      return sumPatentsNumCompanies(this.rolledupCompany);
    },
  },
  watch: {
    industry_short: function() {
      this.industry_desc = industries.find(
        el => el.industry_short == this.industry_short,
      ).industry_desc;
    },
  },
  mounted() {
    dataProm.then(data => (this.allData = data));
  },
  methods: {
    removeLastWord(str) {
      let lastIndex = str.lastIndexOf(' ');
      return str.substring(0, lastIndex);
    },
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
    h5.fg-gold-darken-2.uk-margin-remove-top.uk-text-small {{ industry_desc }}
    div.uk-text-small.fg-yellowgreen-darken-3.uk-animation-fade <strong class="">{{  aggregateSelectedData[1] | thousandComma  }}</strong> assignee companies <br> <strong class="">{{  aggregateSelectedData[0] | thousandComma  }}</strong> patents
      span.fg-orange <br> in currently selected data
  ul.uk-list.uk-list-striped
    li(v-for="(company, i) in topCompanies" :key="company[1].gvkey + i").uk-text-left.uk-animation-slide-left
      
      span.fg-blue-lighten-1.uk-text-bold.uk-text-uppercase.uk-button-text  {{ company[0] | removePeriods }} <br>
      div(uk-drop="pos:left-center")
        .uk-card.uk-card-default.uk-card-body.uk-padding-small
          ul.uk-card-header
            li.uk-text-small.fg-black {{ company[1].industry_short}} | {{ startYear}}<span v-if="startYear != endYear">–{{ endYear }}</span>
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
              a.uk-button.uk-button-small.fg-blue-lighten-1(target="_blank" :href="`https://patents.google.com/?assignee=${ removeLastWord(company[0]) }&before=filing:${endYear}1231&after=filing:${startYear}0101&type=PATENT&num=50&sort=new`") Search Patents
              a.uk-button.uk-button-small.fg-orange(target="_blank" :href="'https://www.google.com/search?q=%22'+ removeLastWord(company[0]) +'%22+%22'+company[1].country+'%22'") Search Company
      h3.uk-margin-remove.fg-orange.uk-text-large.uk-float-right {{ company[1].totalpatent | thousandComma }}
    
      span.uk-label.bg-blue-lighten-4 {{ i+1 }}
      span.fg-blue-lighten-3  {{ company[1].industry_short }} <br>

   
  </template>
