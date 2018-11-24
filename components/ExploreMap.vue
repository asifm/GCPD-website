
<script>
// ::import npm modules

// ::import components
import SelectFromList from '@/components/SelectFromList';
import InputNumber from '@/components/InputNumber';
import ListCompanyBasic from '@/components/ListCompanyBasic';

// ::import functions
import { renderMap } from '@/assets/js/drawWorldMap.js';

// ::import content
import NoteExploreMain from '@/content/NoteExploreMain.md';

// todo p2: get country name by clicking on the map
// todo p1: Remove from data the unimportant countries

export default {
  components: {
    SelectFromList,
    InputNumber,
    ListCompanyBasic,
    NoteExploreMain,
  },
  data() {
    return {
      // todo p1: Optimize the first computation so that it doesn't block scrolling and rendering
      listLengthSelected: 50,
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
    // console.log(
    //   Array.from(document.getElementsByTagName('circle')).map(
    //     el => el.__data__,
    //   ),
    // );
  },
  methods: {
    initRenderMap() {
      console.log('got to div');
      // renderMap();
    },
  },
};
</script>

<template lang="pug">

.uk-container.uk-container-large
  .uk-grid(uk-grid).uk-grid-collapse
    .uk-width-1-3.uk-padding-remove
      h3 Explore the World of Corporate Patents 
      note-explore-main
    .uk-width-2-3
      p [a smaller map]
      
  .uk-grid.uk-container-expand.uk-text-center.uk-grid-small(uk-grid)
    .uk-width-1-4
      select-from-list(param-list="countries")
    .uk-width-1-4
      select-from-list(param-list="industries")
    .uk-width-1-4.uk-grid(uk-grid).uk-grid-collapse
      .uk-width-1-3
        input-number(type="text" event-name="change-startyear").uk-input.uk-form-width-small
        input-number(type="text" event-name="change-endyear").uk-input.uk-form-width-small

      .uk-width-2-3
        input-number(type="range" event-name="change-startyear").uk-range
        input-number(type="range" event-name="change-endyear").uk-range
        
    .uk-width-1-4.uk-panel-scrollable.uk-height-large
      list-company-basic(:topCompaniesListLength="listLengthSelected")
    div  
      svg#svg.uk-margin-remove.uk-padding-remove(ref='svgMap')
 
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
