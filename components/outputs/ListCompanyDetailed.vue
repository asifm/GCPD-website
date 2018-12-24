<script>
// ::import libraries and/or library functions

// ::import components
import { TweenLite } from 'gsap';

// FilterBus is a globally registered vue component (event bus) whose sole purpose is to transfer data between components
import { FilterBus } from '@/assets/js/FilterBus';

// ::import functions

// ::import data and/or data-promises

import { lists } from '@/assets/data/listData';

// ::declare/set variables
const industries = lists.industries;

export default {
  props: {
    listLength: { type: Number, default: 50 },
  },
  data() {
    return {
      country: '',
      industry: '',
      startYear: null,
      endYear: null,
      topCompanies: [],
      sumPatentsInSelectedData: null,
      numCompaniesInSelectedData: null,
      listLength_: this.listLength,
      msgListSize200: false,
      msgListSize100: false,
      tweenedNumber: 0,
    };
  },
  computed: {
    industry_desc: function() {
      return this.industry
        ? industries.find(el => el.industry == this.industry).industry_desc
        : '';
    },
    sumPatentsInSelectedDataAnimated: function() {
      return this.tweenedNumber.toFixed(0);
    },
  },
  watch: {
    listLength_(newVal, prevVal) {
      if (newVal >= 200) {
        this.msgListSize100 = false;
        this.msgListSize200 = true;
        this.listLength_ = prevVal;
      } else if (newVal >= 100) {
        this.msgListSize200 = false;
        this.msgListSize100 = true;
      } else if (newVal < 100) {
        this.msgListSize200 = false;
        this.msgListSize100 = false;
      } else if (newVal <= 1) {
        this.listLength_ = 1;
      }
    },
    sumPatentsInSelectedData: function(newVal) {
      TweenLite.to(this.$data, 2, {
        tweenedNumber: newVal,
      });
    },
  },
  beforeCreate() {
    // listen for new data from compute-data component
    FilterBus.$on('new-data', (arr1, arr2) => {
      const [
        crsfltr,
        companyGrp,
        countryGrp,
        industryGrp,
        regionGrp,
        yearGrp,
      ] = arr1;
      [this.industry, this.country, this.startYear, this.endYear] = arr2;
      companyGrp.order(d => d.patentcount);

      const allCompanies = companyGrp.top(Infinity);
      this.topCompanies = allCompanies.filter(el => el.value.patentcount);

      this.sumPatentsInSelectedData = crsfltr
        .groupAll()
        .reduceSum(d => d.patentcount)
        .value();

      this.numCompaniesInSelectedData = this.topCompanies.length;
    });
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
.uk-card.uk-card-body.uk-card-default.uk-padding-remove.uk-animation-slide-left(v-show="topCompanies")
  div.uk-text-left.uk-card-header.uk-padding-small.bg-white
    //- Show end year only if it's different from start year; same start and end means single year selection
    h3.my-text-heavy.uk-text-large.fg-blue-800.uk-margin-auto-vertical.uk-padding-small.uk-padding-remove-vertical  {{ startYear }}<span v-show="startYear != endYear">–{{ endYear }}</span>
      span.fg-orange-900.uk-margin-small-left {{ country }} <br />
      span.fg-blue-600.my-text-thin {{ industry_desc }}

    div.uk-padding-small.uk-margin-remove.uk-padding-remove-vertical
      div(v-show="sumPatentsInSelectedData > 0").uk-animation-fade <span class="fg-orange-700">{{  sumPatentsInSelectedDataAnimated | thousandComma  }} patents</span> <span class="fg-blue-400"> {{ numCompaniesInSelectedData  | thousandComma  }} companies</span>
      div(v-show="sumPatentsInSelectedData === 0") No patents in the currently selected data.
    hr
    div.uk-margin-small-top
      .my-text-tiny.uk-button-small.uk-button.bg-white Color Codes
      .my-text-tiny.asia-pacific.uk-button-small.uk-button Asia Pacific   
      .my-text-tiny.uk-button.uk-button-small.europe Europe   
      .my-text-tiny.uk-button.uk-button-small.north-america North America
    
    
    div
      .my-text-tiny.uk-button-small.uk-button.bg-white Top Companies | Showing {{ listLength_}}
      input.uk-form-width-medium.uk-margin-small-top(type="range" v-model="listLength_" min="1" max="200")

  
  div.uk-animation-shake(v-show="msgListSize100") 
    p Consider a smaller list size. Browser performance may suffer.
  div.uk-alert.uk-animation-shake(v-show="msgListSize200") 
    p List size cannot exceed 200. Browser may crash.

  ul.uk-list.uk-padding-remove
    li(v-for="(company, i) in topCompanies.slice(0, listLength_)" :key="company.value.gvkey" :class="company.value.region | makeKebab ").uk-text-left.uk-animation-slide-left.uk-padding-small.uk-box-shadow-small
      
      span.fg-black.uk-text-bold.uk-text-uppercase.uk-button-text  {{ company.key }} <br>

      div(uk-drop="pos:left-center")
        .uk-card.uk-card-default.uk-card-body.uk-padding-small#pop-details
          ul.uk-card-header
            li.uk-text-small.fg-black {{ company.value.industry}} | {{ startYear}}<span v-show="startYear != endYear">–{{ endYear }}</span>
            li.fg-blue.uk-text-bold.uk-text-uppercase.uk-text-break {{ company.key | removePeriods }}
            li.uk-text-meta {{ company.value.city }}, {{ company.value.country }}

          ul.uk-list.uk-text-right.fg-orange
            li R&amp;D Exp. 
              span.fg-blue $ <span class="">{{ company.value.rdex | roundUnit | thousandComma }}</span> M
            li Capital Exp. 
              span.fg-blue $ <span class="">{{ company.value.capex | roundUnit| thousandComma }}</span> M
            li Sales 
              span.fg-blue $ <span class="">{{ company.value.sales | roundUnit | thousandComma }}</span> M
            li EBITDA 
              span.fg-blue $ <span class="">{{ company.value.ebitda | roundUnit | thousandComma }}</span> M
            li Assets 
              span.fg-blue $ <span class="">{{ company.value.assets | roundUnit | thousandComma }}</span> M

          div.uk-card-footer
              a.uk-button.uk-button-small.fg-blue-400(target="_blank" :href="`https://patents.google.com/?assignee=${ removeLastWord(company.key) }&before=filing:${endYear}1231&after=filing:${startYear}0101&type=PATENT&num=50&sort=new`") Search Patents
              a.uk-button.uk-button-small.fg-orange-600(target="_blank" :href="'https://www.google.com/search?q=%22'+ removeLastWord(company.key) +'%22+%22'+company.value.country+'%22'") Search Company
      
      h3.uk-margin-remove.fg-orange-900.uk-text-large.uk-float-right {{ company.value.patentcount | thousandComma }}
    
      span.uk-label.bg-white.fg-blue.uk-margin-small-right {{ i+1 }}
      span.fg-blue {{ company.value.industry }} <br>

  </template>

<style lang="scss" scoped></style>
