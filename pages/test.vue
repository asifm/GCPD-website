<script>
import Crossfilter from 'crossfilter';
import { dataProm } from '@/assets/js/fetchData';

// import components
import MapWithCircles from '@/components/outputs/MapWithCircles';

export default {
  components: { MapWithCircles },
  data() {
    return {
      cf: [],

      // this dim perhaps not needed; keep dims fewer than 6
      // patentcountDim: [],
      companyDim: [],
      industryDim: [],
      countryDim: [],
      regionDim: [],
      yearDim: [],

      companyGrp: [],
      countryGrp: [],
      industryGrp: [],
      regionGrp: [],
    };
  },
  mounted() {
    dataProm.then(data => {
      this.cf = Crossfilter(data);
      // this.patentcountDim = this.cf.dimension(d => d.patentcount);
      this.companyDim = this.cf.dimension(d => d.company);
      this.industryDim = this.cf.dimension(d => d.industry);
      this.countryDim = this.cf.dimension(d => d.country);
      this.regionDim = this.cf.dimension(d => d.region);
      this.yearDim = this.cf.dimension(d => d.year);

      this.companyGrp = this.companyDim.group();
      this.industryGrp = this.industryDim.group();

      this.countryGrp = this.countryDim.group();
    });
  },
};
</script>

<template lang="pug">
.uk-section
  .uk-container
    map-with-circles
</template>
