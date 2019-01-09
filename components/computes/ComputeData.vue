<script>
// This is a computaton component; not for presentation. It does all the heavylifting and emits events to update states of the presentation components.
import Crossfilter from 'crossfilter';

import { dataProm } from '@/assets/js/fetchData';
import { lists } from '@/assets/data/listData';
const { min, max } = lists.dataYearRange;

// import components; FilterBus is an event bus
import { FilterBus } from '@/assets/js/FilterBus';

export default {
  data() {
    return {
    };
  },
  created() {
    dataProm.then(data => {
      this.showMessageCalculating(3000)
      //:: Initialize crossfilter with data and its dimensions and groups :://
      this.cf = Crossfilter(data);
      this.companyDim = this.cf.dimension(d => d.company);
      this.industryDim = this.cf.dimension(d => d.industry);
      this.countryDim = this.cf.dimension(d => d.country);
      this.regionDim = this.cf.dimension(d => d.region);
      this.yearsDim = this.cf.dimension(d => d.year);

      this.companyGrp = this.companyDim.group();
      this.countryGrp = this.countryDim.group();
      this.industryGrp = this.industryDim.group();
      this.regionGrp = this.regionDim.group();
      this.yearGrp = this.yearsDim.group();

      // reduceSum gets an accessor function telling which field to sum
      function reduceInitial() {
        return {
          gvkey: '',
          city: '',
          country: '',
          region: '',
          industry: '',
          assets: 0,
          capex: 0,
          ebitda: 0,
          patentcount: 0,
          rdex: 0,
          sales: 0,
        };
      }
      function reduceAdd(p, v) {
        p.gvkey = v.gvkey;
        p.city = v.city;
        p.country = v.country;
        p.region = v.region;
        p.industry = v.industry;
        p.assets = p.assets + v.assets;
        p.capex = p.capex + v.capex;
        p.ebitda = p.ebitda + v.ebitda;
        p.patentcount = p.patentcount + v.patentcount;
        p.rdex = p.rdex + v.rdex;
        p.sales = p.sales + v.sales;
        return p;
      }

      function reduceRemove(p, v) {
        p.assets = p.assets - v.assets;
        p.capex = p.capex - v.capex;
        p.ebitda = p.ebitda - v.ebitda;
        p.patentcount = p.patentcount - v.patentcount;
        p.rdex = p.rdex - v.rdex;
        p.sales = p.sales - v.sales;
        return p;
      }
      this.companyGrp.reduce(reduceAdd, reduceRemove, reduceInitial);

      this.countryGrp.reduceSum(d => d.patentcount);
      this.industryGrp.reduceSum(d => d.patentcount);
      this.regionGrp.reduceSum(d => d.patentcount);
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
            this.countryDim.filter(null);
            break;
          case 'North America':
          case 'Europe':
          case 'Asia Pacific':
            // this.regionDim.filter(null);
            this.countryDim.filter(null);
            this.regionDim.filter(this.country);
            break;
          default:
            this.regionDim.filter(null);
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
        // this.yearDim.filter(null);
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
        // this.yearDim.filter(null);
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
        [
          this.cf,
          this.companyGrp,
          this.countryGrp,
          this.industryGrp,
          this.regionGrp,
          this.yearGrp,
        ],
        [this.industry, this.country, this.startYear, this.endYear],
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
  .uk-alert(v-if="warnYearWrong").uk-animation-shake.bg-orange-50.fg-blue
    div
      p The first year must be less than the last year.
</template>
