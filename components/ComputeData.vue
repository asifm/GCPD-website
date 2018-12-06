<script>
// This is a computaton component; not for presentation. It does all the heavylifting and emits events to update states of the presentation components.
// import modules
import Crossfilter from 'crossfilter';

// import data/data-promises
import { dataProm } from '@/assets/js/fetchData';
import { lists } from '@/assets/data/listData';
const { min, max } = lists.dataYearRange;
const numYears = max - min + 1;

// import components; FilterBus is an event bus
import { FilterBus } from '@/assets/js/FilterBus';
import { numericLiteral } from 'babel-types';

export default {
  props: {
    country_: {
      type: String,
      default: 'All Countries',
    },
    industry_: {
      type: String,
      default: 'All Industries',
    },
    startYear_: {
      type: Number,
      default: 2000,
    },
    endYear_: {
      type: Number,
      default: 2017,
    },
  },
  data() {
    return {
      country: this.country_,
      industry: this.industry_,
      startYear: this.startYear_,
      endYear: this.endYear_,

      cf: null,

      // companyGrp: null,

      warnYearWrong: false,
    };
  },
  created() {
    dataProm.then(data => {
      // ---- Initialize crossfilter with data and its dimensions and groups
      this.cf = Crossfilter(data);
      this.companyDim = this.cf.dimension(d => d.company);
      this.industryDim = this.cf.dimension(d => d.industry);
      this.countryDim = this.cf.dimension(d => d.country);
      this.regionDim = this.cf.dimension(d => d.region);
      this.yearDim = this.cf.dimension(d => d.year);

      this.companyGrp = this.companyDim.group();
      this.countryGrp = this.countryDim.group();
      this.industryGrp = this.industryDim.group();
      this.yearGrp = this.yearDim.group();

      // reduceSum gets an accessor function telling which field to sum
      this.companyGrp.reduceSum(d => d.patentcount);
      this.countryGrp.reduceSum(d => d.patentcount);
      this.industryGrp.reduceSum(d => d.patentcount);
      this.yearGrp.reduceSum(d => d.patentcount);

      // on creation $emit data for parent based on the props values, which are set by parent as defaults
      this.computeAndEmitDefault();
      // -----

      // ::Listening for changes:: //
      FilterBus.$on('change-country', payload => {
        // Although country and region are separate fields in the data, they're in the same list in the UI's select control.
        this.country = payload;
        // first remove current filter
        this.countryDim.filter(null);
        switch (this.country) {
          case 'All Countries':
            this.regionDim.filter(null);
            break;
          case 'North America':
          case 'Europe':
          case 'Asia Pacific':
            this.regionDim.filter(null);
            this.regionDim.filter(this.country);
            break;
          default:
            this.countryDim.filter(this.country);
        }
        this.emitData();
      });
      FilterBus.$on('change-industry', payload => {
        this.industry = payload;
        this.industryDim.filter(null);
        // Apply new filter only if it's not "all industries"
        if (this.industry !== 'All Industries')
          this.industryDim.filter(this.industry);
        this.emitData();
      });
      // Listen for any changes made in the selection controls, process the data when a change happens, and emits the new data for the upstream component to capture
      FilterBus.$on('change-startyear', payload => {
        this.startYear = payload;
        if (this.endYear < this.startYear) {
          // this.startYear = this.endYear;
          this.warnYearWrong = true;
          return;
        } else {
          this.warnYearWrong = false;
        }
        this.yearDim.filter(null);
        // crossfilter's filterrange counts upto one less than endyear. So add 1.
        this.yearDim.filter([this.startYear, this.endYear + 1]);
        this.emitData();
      });
      FilterBus.$on('change-endyear', payload => {
        this.endYear = payload;
        if (this.endYear < this.startYear) {
          // this.endYear = this.startYear;
          this.warnYearWrong = true;
          return;
        } else {
          this.warnYearWrong = false;
        }
        this.yearDim.filter(null);
        // crossfilter's filterrange counts upto but not including the endyear. So add 1.
        this.yearDim.filter([this.startYear, this.endYear + 1]);
        this.emitData();
      });
      // ends:listneing for changes//
    });
  },
  methods: {
    emitData() {
      FilterBus.$emit(
        'new-data',
        this.companyGrp,
        this.industryGrp,
        this.countryGrp,
        this.yearGrp,
      );
    },
    computeAndEmitDefault() {
      this.yearDim.filter([this.startYear, this.endYear + 1]);
      if (this.industry !== 'All Industries')
        this.industryDim.filter(this.industry);
      if (
        (this.country == 'North America') |
        (this.country == 'Asia Pacific') |
        (this.country == 'Europe')
      ) {
        this.regionDim.filter(this.country);
      } else if (this.country !== 'All Countries') {
        this.countryDim.filter(this.country);
      }
      console.log('emitting first data');
      this.emitData();
    },
  },
};
</script>

<template lang="pug">
div
  p start year {{startYear}}
  p end year {{ endYear}}
  p industry {{ industry }}
  p country {{ country }}
  p(v-if="cf") total patents {{ cf.groupAll().reduceSum(d => d.patentcount).value() }}
  
  .uk-alert(v-if="warnYearWrong").uk-animation-shake.bg-orange-50.fg-blue
    div
      p The last year must be greater than the first year.
</template>
