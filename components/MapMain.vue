
<script>
// :: import components
import FiltersMain from '@/components/FiltersMain';
import ListMain from '@/components/ListMain';

// :: imports libraries
import * as d3 from 'd3';
import fetch from 'node-fetch';

const radScale = d3.scaleSqrt().range([1, 30]);

export default {
  components: { FiltersMain, ListMain },
  props: {
    countryTotalsArr: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: 1100,
    },
    height: {
      type: Number,
      default: 500,
    },
    margin: {
      type: Object,
      default: () => ({
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      }),
    },
    geoJsonDataPath: {
      type: String,
      default: '/data/world-110m.json',
    },
  },

  data() {
    return {
      geoFeatures: [],
      paths: [],
      circles: [],
    };
  },
  created() {
    const projection = d3
      .geoMercator()
      .translate([this.width / 2, this.height / 2 + 50]);

    // attach path generator function to component and use it in the methods
    this.path = d3.geoPath().projection(projection);
  },
  mounted() {
    fetch(this.geoJsonDataPath)
      .then(resp => resp.json())
      .then(geoJson => {
        this.geoFeatures = geoJson.features;
        this.paths = this.makePaths(this.geoFeatures);
      });
  },
  methods: {
    makePaths(features) {
      return this.geoFeatures.map(el => this.path(el));
    },
  },
};
</script>

<template lang="pug">
div
  svg#svg.uk-margin-remove.uk-padding-remove(:width="width" :height="height")
    g#path-group
      path(v-for="path in paths" :d="path" class="path")
    g#circle-group
      circle(v-for="")
</template>

<style lang="scss" scoped>
.path {
  fill: #334499;
  stroke: #aaa;
  stroke-width: 0.08736px;
}

.path:hover {
  fill: #333333;
}
svg {
  -webkit-filter: drop-shadow(-5px -5px 5px #000);
  filter: drop-shadow(1px 5px 5px #777);
}
</style>
