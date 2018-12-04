<script>
// import components
import MapWithCircles from '@/components/MapWithCircles';

// import data or data-promises
import { patentByCountryProm } from '@/assets/js/fetchData';

export default {
  components: { MapWithCircles },
  data() {
    return {
      patentCountByCountry: [],
    };
  },
  mounted() {
    patentByCountryProm.then(data => {
      this.patentCountByCountry = data;
    });
  },
};
</script>

<template lang="pug">
.uk-section
  .uk-container
    map-with-circles
</template>
