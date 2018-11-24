<script>
// todo p2: consolidate regions and countries into on select control
// todo p2: change map based on selection of Years
// todo p2: highlight circles for selected countries
import { lists } from 'assets/data/listData';

// To ignore the "Other" region
let { Other, ...regionsCountries } = lists.regions;
let { industries, countries, dataYearRange } = lists;

// Keep a list of all countries to restore list in select dropdowns
let allCountries = countries;
if (!allCountries.includes('All Countries'))
  allCountries.unshift('All Countries');

/* note: Used here is Fama French industry classification (12-class)
  industry_desc is a more descriptive name than industry_short
  industry_short is usually showed to the user */

export default {
  props: {
    region: { type: String, default: '' },
    country: { type: String, default: '' },
    industry_short: { type: String, default: '' },
    startYear: { type: Number, default: null },
    endYear: { type: Number, default: null },
  },
  data() {
    return {
      regionsCountries,
      allCountries,
      countries,
      industries,
      regions: ['All Regions', 'Asia Pacific', 'Europe', 'North America'],
      industry_shorts: industries.map(el => el.industry_short),
      // The range of yers for which data is available in the source file
      dataYearRange,
    };
  },
  watch: {
    region: function() {
      if (this.region == 'All Regions') {
        this.countries = this.allCountries;
      } else {
        this.countries = this.regionsCountries[this.region]['countries'];
        if (!this.countries.includes('All Countries'))
          this.countries.unshift('All Countries');
      }
      // this.country = 'All Countries';
      this.$emit('update:country', 'All Countries');
    },
  },
  methods: {
    changeSelection(event) {
      let targetId = event.target.id;
      let targetValue = event.target.value;

      if (targetId == 'region-selection') {
        this.$emit('update:region', targetValue);
      } else if (targetId == 'country-selection') {
        this.$emit('update:country', targetValue);
      } else if (targetId == 'industry-selection') {
        this.$emit('update:industry_short', targetValue);
      } else if (targetId == 'start-year-input') {
        if (targetValue > this.endYear) {
          this.$emit('update:startYear', this.endYear);
        } else {
          this.$emit('update:startYear', Number(targetValue));
        }
      } else if (targetId == 'end-year-input') {
        if (targetValue < this.startYear) {
          this.$emit('update:endYear', this.startYear);
        } else {
          this.$emit('update:endYear', Number(targetValue));
        }
      }
    },
  },
};
</script>

<template lang="pug">
div.uk-grid-small.uk-tile.uk-grid(uk-grid).uk-padding-small.uk-box-shadow-medium.uk-animation-fade
  div.uk-width-1-5
    select(@change="changeSelection" id="region-selection" :value="region").uk-select
      option.uk-button-text(v-for="reg in regions" :label="reg") {{ reg }}
    
  div.uk-width-1-5
    select(@change="changeSelection" id="country-selection" :value="country" ref="cntry").uk-select
      option(v-for="coun in countries" :label="coun" ) {{ coun }}

  div.uk-width-1-5
    select(@change="changeSelection" id="industry-selection" :value="industry_short").uk-select
      option(v-for="industry_sh in industry_shorts" :label="industry_sh") {{ industry_sh }}

  div.uk-width-2-5.uk-text-right
    //- todo p3: change to better range input controls
    //- https://refreshless.com/nouislider/
    //- OR https://leaverou.github.io/multirange/
    h6.uk-float-right.uk-display-inline
      span.uk-text-muted From 
      input.uk-input(type="number" @change="changeSelection" id="start-year-input" placeholder="" :value.number="startYear" :min="dataYearRange.min" :max="dataYearRange.max").uk-form-width-small
      input.uk-range(type="range" @change="changeSelection" id="start-year-input" placeholder="" :value.number="startYear" :min="dataYearRange.min" :max="dataYearRange.max").uk-form-width-medium
      <br>
      span.uk-text-muted  to 
      input.uk-input(type="number" @change="changeSelection" id="end-year-input" placeholder="" :value.number="endYear" :min="dataYearRange.min" :max="dataYearRange.max").uk-form-width-small 
      input.uk-range(type="range" @change="changeSelection" id="end-year-input" placeholder="" :value.number="endYear" :min="dataYearRange.min" :max="dataYearRange.max").uk-form-width-medium

  #instructions(uk-modal)
    button.uk-modal-close-default(type="button" uk-close)
    .uk-modal-dialog.uk-modal-body.uk-margin-auto-vertical Help and instructions. Magna sit veniam cillum labore occaecat esse officia do fugiat officia magna in reprehenderit. Laborum sunt dolor Lorem officia ullamco in excepteur. Labore reprehenderit commodo cupidatat dolore irure.
</template>
