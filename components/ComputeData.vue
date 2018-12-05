<script>
// This is a computaton component; not for presentation. It does all the heavylifting and emits events to update states of the presentation components.
// import modules
import Crossfilter from 'crossfilter';

// import data/data-promises
import { dataProm } from '@/assets/js/fetchData';

// import components; FilterBus is an event bus
import { FilterBus } from '@/assets/js/FilterBus';

export default {
  data() {
    return {
      country: 'All Countries',
      industry: 'All Industries',
      startYear: 1999,
      endYear: 2005,

      cf: null,
      // // Dimensions are expensive. Keep them under 6
      // companyDim: null,
      // industryDim: null,
      // countryDim: null,
      // regionDim: null,
      // yearsDim: null,

      companyGrp: null,

      warnYearWrong: false,
    };
  },
  created() {
    FilterBus.$emit('compute-data-created', false);
    this.loading = true;
    dataProm.then(data => {
      this.cf = Crossfilter(data);
      this.companyDim = this.cf.dimension(d => d.company);
      this.industryDim = this.cf.dimension(d => d.industry);
      this.countryDim = this.cf.dimension(d => d.country);
      this.regionDim = this.cf.dimension(d => d.region);
      this.yearsDim = this.cf.dimension(d => d.year);

      this.companyGrp = this.companyDim.group();
      // reduceSum gets an accessor function telling which field to sum
      this.companyGrp.reduceSum(d => d.patentcount);

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
          this.startYear = this.endYear;
          this.warnYearWrong = true;
        } else {
          this.warnYearWrong = false;
        }
        this.yearsDim.filter(null);
        // crossfilter's filterrange counts upto one less than endyear. So add 1.
        this.yearsDim.filter([this.startYear, this.endYear + 1]);
        this.emitData();
      });
      FilterBus.$on('change-endyear', payload => {
        this.endYear = payload;
        if (this.endYear < this.startYear) {
          this.endYear = this.startYear;
          this.warnYearWrong = true;
        } else {
          this.warnYearWrong = false;
        }
        this.yearsDim.filter(null);
        // crossfilter's filterrange counts upto one less than endyear. So add 1.
        this.yearsDim.filter([this.startYear, this.endYear + 1]);
        this.emitData();
      });
      FilterBus.$emit('compute-data-created', true);
    });
  },
  methods: {
    emitData() {
      FilterBus.$emit('new-data', this.companyGrp, this.cf);
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
  .uk-alert.uk-alert-warning(v-if="warnYearWrong") 
    a.uk-alert-close(uk-close)
    p The last year cannot be less than the first year. Showing data for the year {{ startYear }}
</template>
