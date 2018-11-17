
<script>
// ::import components
import MapMain from '@/components/MapMain';
import ControlsMain from '@/components/ControlsMain';
import ListMain from '@/components/ListMain';

// ::import functions
// todo: get country name by clicking on the map
// todo p1: Remove from data the unimportant countries
import { renderMap } from '@/assets/js/drawWorldMap.js';

export default {
  components: { MapMain, ControlsMain, ListMain },
  data() {
    return {
      // fix p1: Optimize the first computation so that it doesn't block scrolling and rendering
      regionSelected: 'All Regions',
      countrySelected: 'All Countries',
      industrySelected: 'All Industries',

      startYearSelected: 2017,
      endYearSelected: 2017,
      numTopCompaniesToSelect: 10,
      // spin: false,
    };
  },
  mounted() {
    renderMap();
  },
  updated() {
    // todo p2: get paths data so country paths can be highlighted/selected with mouse event
    /* 
    todo p2: update circles size on data update.
    trigger update first time to load default data
    pass data to renderMap function on every update 
    get aggregate numbers for each country 
     */
    console.log(
      Array.from(document.getElementsByTagName('circle')).map(
        el => el.__data__,
      ),
    );
    // todo p3: implement spinner
    // ? nextTick not working
    // this.$nextTick(() => {
    // console.log('next ticked', this.spin);
    // this.spin = false;
    // });
  },
};
</script>

<template lang="pug">
div
  .uk-grid(uk-grid).uk-container-expand.uk-text-center()
    .uk-width-3-4
      controls-main(
        :region.sync="regionSelected"
        :country.sync="countrySelected"
        :ff_short.sync="industrySelected"
        :startYear.sync="startYearSelected"
        :endYear.sync="endYearSelected"
      )
      //- div(v-if="spin")
        //- span( uk-spinner="ratio:1")
      .uk-tile.uk-width-expand.uk-padding-remove-top(uk-scrollspy="cls: uk-animation-fade; delay: 100; repeat: true")
        map-main

    .uk-width-1-4
      list-main(
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
  fill: #eee;
}
svg {
  -webkit-filter: drop-shadow(-5px -5px 5px #000);
  filter: drop-shadow(1px 5px 5px #777);
}
</style>
