
<script>
// ::import components
import ControlsExploreMap from '@/components/ControlsExploreMap';
import ListCompaniesTop from '@/components/ListCompaniesTop';

// ::import functions
// todo: get country name by clicking on the map
import { renderMap } from '@/assets/js/drawWorldMap.js';

export default {
  components: { ControlsExploreMap, ListCompaniesTop },
  data() {
    return {
      regionSelected: 'All Regions',
      countrySelected: 'All Countries',
      industrySelected: 'All Industries',

      startYearSelected: 2016,
      endYearSelected: 2016,
      numTopCompaniesToSelect: 10,
      // spin: false,
    };
  },
  mounted() {
    // todo p3: implement spinner
    // ? nextTick not working
    // this.$nextTick(() => {
    // console.log('next ticked', this.spin);
    // this.spin = false;
    // });
    renderMap();
  },
};
</script>

<template lang="pug">
div
  .uk-grid(uk-grid).uk-container-expand.uk-text-center()
    .uk-width-3-4
      controls-explore-map(
        :region.sync="regionSelected"
        :country.sync="countrySelected"
        :ff_short.sync="industrySelected"
        :startYear.sync="startYearSelected"
        :endYear.sync="endYearSelected"
      )
      //- div(v-if="spin")
        //- span( uk-spinner="ratio:1")
      .uk-tile.uk-width-expand.uk-padding-remove-top(uk-scrollspy="cls: uk-animation-fade; delay: 100; repeat: true")
        svg#svg.uk-margin-remove.uk-padding-remove
          .uk-card 
            p Officia laborum exercitation tempor ut deserunt commodo occaecat. Voluptate irure aute fugiat ut minim nostrud amet eiusmod do sit sint id labore ex. Enim id consectetur aute sunt sunt voluptate tempor fugiat. Aute in est amet culpa sint ea.
    .uk-width-1-4
      list-companies-top(
        :region="regionSelected" 
        :country="countrySelected"
        :ff_short="industrySelected" 
        :startYear="startYearSelected" 
        :endYear="endYearSelected"
        :numTopCompanies="numTopCompaniesToSelect"
        )
      
</template>

<style lang="scss" scoped>
/* .path {
  fill: #334499;
  stroke: #aaa;
  stroke-width: 0.08736px;
} */

.path:hover {
  /* opacity: 0.7; */
  fill: #eee;
}
svg {
  -webkit-filter: drop-shadow(-5px -5px 5px #000);
  filter: drop-shadow(1px 5px 5px #777);
}
.circle {
  fill: #232d4b;
  fill-opacity: 0.5;
}

/* Style northward tooltips differently */
.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}
</style>
