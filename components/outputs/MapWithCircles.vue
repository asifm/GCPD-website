<script>
// fix: name mismatch between two sources of data
// todo: add annotation for the first three countries
// todo: add legends for circle size
// todo: color code circle by region
// :: imports libraries
import * as d3 from 'd3';
import fetch from 'node-fetch';

const pathToCountryCentroids = '/data/20181210_country_centroids.csv';
const pathToGeoJson = '/data/world-110m.json';

import { FilterBus } from '@/assets/js/FilterBus';

const radScale = d3.scaleSqrt().range([5, 50]);
const projection = d3.geoMercator();

// attach path generator function to component and use it in the methods
const path = d3.geoPath().projection(projection);

export default {
  props: {
    width: {
      type: Number,
      default: 900,
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
  },

  data() {
    return {
      countryData: [],
      geoFeatures: [],
      paths: [],
      circles: [],
      centroids: [],
    };
  },
  created() {
    projection.translate([this.width / 2, this.height / 2 + 50]).scale(200);

    fetch(pathToGeoJson)
      .then(response => response.json())
      .then(geoJson => {
        this.geoFeatures = geoJson.features;
        this.paths = this.makePaths(this.geoFeatures);
      });
    d3.csv(pathToCountryCentroids).then(centroids => {
      this.centroids = centroids;
    });

    // listen for new data from compute-data component
    FilterBus.$on('new-data', (arr1, arr2) => {
      const [
        crsfltr,
        companyGrp,
        countryGrp,
        industryGrp,
        regionGrp,
        yearGrp,
      ] = arr1;

      this.countryData = countryGrp.top(Infinity);
      radScale.domain(d3.extent(this.countryData.map(el => el.value)));

      if (this.centroids.length > 0) {
        this.circles = this.countryData.map(el => {
          el.r = radScale(el.value);
          let centroid = this.centroids.find(
            centroid_ => centroid_.country == el.key,
          );
          if (centroid) {
            const projectedCentroid = projection([+centroid.x, +centroid.y]);

            el.cx = projectedCentroid[0];
            el.cy = projectedCentroid[1];
          }

          return el;
        });
      }
    });
  },
  mounted() {
    this.$refs.circleGroup.addEventListener('click', ev => {
      console.log('this', this);
      console.log(ev);
    });
  },
  methods: {
    makePaths(features) {
      return this.geoFeatures.map(el => path(el));
    },
    clicked(ev) {
      console.log('clicked', ev, this);
    },
  },
};
</script>

<template lang="pug">
div.uk-padding-remove.uk-margin-remove
  svg#svg.uk-margin-remove.uk-padding-remove(:width="width" :height="height")
    g#path-group
      path(v-for="path in paths" :d="path" class="path")
    g#circle-group(ref="circleGroup")
      circle(@click.capture="clicked" v-for="circle in circles" :r="circle.r" :cx="circle.cx" :cy="circle.cy" :id="circle.key" class="circle" :data-patent="circle.value")
</template>

<style lang="scss" scoped>
.path {
  fill: #232d4b;
  opacity: 0.2;
  stroke: #000;
  stroke-width: 0.5px;
  transition: opacity 0.5s;
}

.path:hover {
  opacity: 0.4;
}

.circle {
  fill: steelblue;
  opacity: 0.5;
  transition: all 2s;
  // transition: opacity 5s;
  stroke: #000;
  stroke-width: 0.5px;
}

.circle:hover {
  opacity: 0.7;
}
svg {
  // -webkit-filter: drop-shadow(2px 2px 10px #777);
  filter: drop-shadow(2px 2px 10px #777);
}
</style>
