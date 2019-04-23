<script>
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
      numCompaniesInSelectedData: null,
    };
  },
  computed: {
    industry_desc: function() {
      return this.industry
        ? industries.find(el => el.industry == this.industry).industry_desc
        : '';
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

      this.numCompaniesInSelectedData = this.topCompanies.length;
    });
  },
};
</script>

<template lang="pug">
div(
  v-show="topCompanies"
  )
  div.uk-card-header.uk-padding-small.bg-white.uk-animation-fade
    //- Show end year only if it's different from start year; same start and end means single year selection
    p.uk-h3.uk-margin-small-top  {{ startYear }}<span v-show="startYear != endYear">–{{ endYear }}</span>
      span.fg-blue-900  {{ geography }} <br />
      span.my-text-thin.fg-orange-400  {{ industry_desc }} 
      span.my-text-thin.fg-blue-300(
        v-show="numCompaniesInSelectedData > 0"
        ) {{ numCompaniesInSelectedData  | thousandComma  }} companies
    div
      p Leading Companies
      div.my-text-tiny
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
