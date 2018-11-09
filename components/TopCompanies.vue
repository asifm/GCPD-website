<script>
import * as d3 from 'd3';
import { getTopCompaniesByCountryProm } from 'assets/js/computeData';

let fThousand = d3.format(',');

export default {
  props: {
    country: { type: String, default: 'The World' },
    year: { type: Number, default: 2015 },
    howMany: { type: Number, default: 10 },
  },
  data() {
    return {
      topCompanies: [],
    };
  },
  watch: {
    country: function() {
      getTopCompaniesByCountryProm(this.country, this.howMany, this.year).then(
        companies => {
          this.topCompanies = companies;
        },
      );
    },
  },
  created() {
    this.fThousand = fThousand;
    getTopCompaniesByCountryProm(this.country, this.howMany, this.year).then(
      companies => {
        this.topCompanies = companies;
      },
    );
  },
  methods: {
    dots: function(num) {
      let numDots = num / 1000;
      return numDots;
    },
  },
};
</script>

<template lang="pug">
.uk-tile.uk-box-shadow-large.uk-padding-remove-vertical
  h4.fg-orange.uk-text-left {{ country }} 
    span.fg-blue {{ year }}
  
  ul.uk-list.uk-list-striped.uk-animation-slide-left
    li(v-for="company in topCompanies" :key="company.gvkey").uk-text-left.uk-animation-slide-left-medium
      span.fg-blue-lighten-1.uk-text-bold.uk-text-uppercase {{ company.company }} <br>
      span.uk-button-text.fg-orange.uk-text-large.uk-float-right {{ fThousand(company.patentcount) }} 
      span.fg-blue-fade-out-4.uk-position-bottom-right {{ "⚛".repeat(Math.round(dots(company.patentcount))) }} <br>
      span.fg-blue-lighten-2 {{ company.ffname }} <br>
      span.uk-text-baseline.uk-text-bold {{ company.country }} 

  </template>
