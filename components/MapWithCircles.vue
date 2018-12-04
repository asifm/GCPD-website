<script>
// :: imports libraries
import * as d3 from 'd3';
import fetch from 'node-fetch';

const radScale = d3.scaleSqrt().range([1, 30]);

export default {
  props: {
    countryValuesArr: {
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
    pathToGeoJson: {
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
    fetch(this.pathToGeoJson)
      .then(response => response.json())
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
  fill: #232d4b;
  opacity: 0.4;
  stroke: #aaa;
  stroke-width: 0.5px;
  transition: opacity 0.5s;
}

.path:hover {
  opacity: 1;
}
svg {
  // -webkit-filter: drop-shadow(2px 2px 10px #777);
  filter: drop-shadow(2px 2px 10px #777);
}
</style>
