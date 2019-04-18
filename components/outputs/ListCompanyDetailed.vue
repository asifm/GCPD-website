<script>
import { TweenLite } from 'gsap';

// FilterBus is a globally registered vue component (event bus) whose sole purpose is to transfer data between components
import { FilterBus } from '@/assets/js/FilterBus';

import { lists } from '@/assets/data/listData';

import CardCompanyFacts from '@/components/outputs/CardCompanyFacts';

const industries = lists.industries;

export default {
  components: {
    CardCompanyFacts,
  },
  props: {
    listLength: { type: Number, default: 50 },
  },
  data() {
    return {
      geography: '',
      industry: '',
      startYear: null,
      endYear: null,
      topCompanies: [],
      sumPatentsInSelectedData: null,
      numCompaniesInSelectedData: null,
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
    sumPatentsInSelectedData: function(newVal) {
      TweenLite.to(this.$data, 2, {
        tweenedNumber: newVal,
      });
    },
  },
  beforeCreate() {
    // listen for new data from compute-data component
    FilterBus.$on('new-data', dataObj => {
      const { industry, geography, rangeYears, cf, companyGrp } = dataObj;
      this.industry = industry;
      this.geography = geography;
      this.startYear = rangeYears[0];
      this.endYear = rangeYears[1];

      companyGrp.order(d => d.patentcount);

      const allCompanies = companyGrp.top(Infinity);
      this.topCompanies = allCompanies.filter(el => el.value.patentcount);

      this.sumPatentsInSelectedData = cf
        .groupAll()
        .reduceSum(d => d.patentcount)
        .value();

      this.numCompaniesInSelectedData = this.topCompanies.length;
    });
  },
};
</script>

<template lang="pug">
div.uk-card.uk-card-body.uk-card-default.uk-padding-remove.uk-animation-slide-left(
  v-show="topCompanies"
  )
  div.uk-text-left.uk-card-header.uk-padding-small.bg-white
    //- Show end year only if it's different from start year; same start and end means single year selection
    h3.my-text-heavy.uk-text-large.fg-blue-800.uk-margin-auto-vertical.uk-padding-small.uk-padding-remove-vertical  {{ startYear }}<span v-show="startYear != endYear">–{{ endYear }}</span>
      span.fg-orange-900.uk-margin-small-left {{ geography }} <br />
      span.fg-blue-600.my-text-thin {{ industry_desc }}

    div.uk-padding-small.uk-margin-remove.uk-padding-remove-vertical
      div.uk-animation-fade(
        v-show="sumPatentsInSelectedData > 0"
        ) <span class="fg-orange-700">{{  sumPatentsInSelectedDataAnimated | thousandComma  }} patents</span> <span class="fg-blue-400"> {{ numCompaniesInSelectedData  | thousandComma  }} companies</span>
      div(
        v-show="sumPatentsInSelectedData === 0"
        ) No patents found in the currently selected data.
    hr
    div.uk-padding-small
      p Top {{ listLength }} Companies
  

      div.uk-margin-small-top.my-text-tiny
        span.fg-black.uk-padding-tiny.asia-pacific Asia Pacific
        span.fg-black.uk-padding-tiny.europe Europe
        span.fg-black.uk-padding-tiny.north-america North America
        span.fg-black.uk-padding-tiny.other Other
    
  ul.uk-list.uk-padding-remove
    li.uk-text-left.uk-animation-slide-left.uk-padding-small.uk-box-shadow-small.list-item(
      v-for="(company, i) in topCompanies.slice(0, listLength)" 
      :key="company.value.gvkey" 
      :class="company.value.region | makeKebab "
      )
      div
        span.fg-black.uk-text-bold.uk-text-uppercase  {{ company.key }} <br>
        h3.uk-margin-remove.fg-blue-900.uk-text-large.uk-float-right
          | {{ company.value.patentcount | thousandComma }}
        span.uk-label.bg-white.fg-blue.uk-margin-small-right
          | {{ i+1 }}
        span.fg-blue
          | {{ company.value.industry }}
      
      card-company-facts.card-company(
        :company="company",
        :startYear="startYear",
        :endYear="endYear"
        uk-drop="pos: left-center; offset: 80; animation: uk-animation-fade; duration: 500"
      )
</template>

<style lang="scss" scoped>
.list-item {
  transition: background-color 0.3s;
  &:hover {
    background-color: white;
  }
}
</style>
