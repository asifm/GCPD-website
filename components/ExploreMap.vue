<script>
// ::import npm modules
// ::import components
import SelectParamFromList from '@/components/SelectParamFromList';
import InputNumber from '@/components/InputNumber';
import ListCompanyDetailed from '@/components/ListCompanyDetailed';
import MapWithCircles from '@/components/MapWithCircles';
// ::import functions

// ::import content
import NoteExploreMain from '@/content/NoteExploreMain.md';

// todo p2: get country name by clicking on the map
// todo p1: Remove from data the unimportant countries

export default {
  components: {
    SelectParamFromList,
    InputNumber,
    ListCompanyDetailed,
    MapWithCircles,
    NoteExploreMain,
  },
  data() {
    return {
      // todo p1: Optimize the first computation so that it doesn't block scrolling and rendering
      listLengthSelected: 10,
    };
  },
  mounted() {},
  updated() {
    // todo p2: update circles size on data update.
  },
  methods: {},
};
</script>

<template lang="pug">

.uk-container.uk-container-large
  .uk-grid(uk-grid).uk-grid-collapse
    .uk-width-1-1.uk-padding-remove
      h2 Explore the World of Corporate Patents
      
  .uk-grid.uk-grid-small(uk-grid)
    .uk-width-3-4
      .uk-width-1-1(uk-grid).uk-grid
        .uk-width-1-4
          select-param-from-list(param-list="countries").uk-margin-small-bottom
          select-param-from-list(param-list="industries").uk-margin-small-bottom
        
        .uk-width-1-2.uk-grid(uk-grid).uk-grid-collapse
          .uk-width-1-4
            input-number(type="number" event-name="change-startyear").uk-input.uk-form-width-small
            input-number(type="number" event-name="change-endyear").uk-input.uk-form-width-small
          .uk-width-3-4
            input-number(type="range" event-name="change-startyear" id="range-start").uk-range
            input-number(type="range" event-name="change-endyear" id="range-start").uk-range
          
        .uk-width-1-4
      .uk-width-1-1.uk-padding-remove.uk-margin-top
        map-with-circles
    .uk-width-1-4
      list-company-detailed(:topCompaniesListLength="listLengthSelected")
</template>
