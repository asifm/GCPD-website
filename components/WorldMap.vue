
<script>
// Import libraries
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

// Import components
import TopCompanies from '@/components/TopCompanies';

// Import data (as promises)
import { patentByCountryProm, worldMapProm } from 'assets/js/fetchData';
import { setTimeout } from 'timers';

// todo: Refactor function — move to a separate file
function renderMap() {
  var width = 1160,
    height = 500;

  let margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };

  var projection = d3.geoMercator().translate([width / 2, height / 2 + 50]);
  // .scale(1.5);

  var path = d3.geoPath().projection(projection);

  var svg = d3
    .select('#svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');

  const radScale = d3.scaleSqrt().range([1, 30]);

  worldMapProm
    .then(countries => {
      let mapG = svg.append('g');
      let map = svg.append('g');

      let paths = mapG
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'path')
        .attr('d', path)
        .style('fill', '#232d4b')
        .style('fill-opacity', 0.1)
        .style('stroke', '#999')
        .style('stroke-width', '0.5px');

      let zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on('zoom', () => {
          let trans = {};

          trans['stroke-width'] = 1.5 / d3.event.transform.k + 'px';
          trans['transform'] = d3.event.transform;

          mapG.style('stroke-width', trans['stroke-width']);
          mapG.attr('transform', trans['transform']);

          map.style('stroke-width', trans['stroke-width']);
          map.attr('transform', trans['transform']);
        });
      svg.call(zoom);

      patentByCountryProm.then(data => {
        data.forEach(row => {
          row.patentCount = +row.patentCount;
          row.longitude = +row.longitude;
          row.latitude = +row.latitude;
        });

        let f = d3.format(',');
        let tip = d3Tip()
          .attr('class', 'd3-tip uk-animation-fade')
          .html(
            d =>
              `<div class="uk-card uk-card-default uk-card-body uk-padding-small uk-box-shadow-large"><span class="uk-text-large fg-orange">${
                d.country
              }</span><br/><span>Patents: ${f(d.patentCount)}</span></div>`,
          );

        mapG.call(tip);

        let maxPatentCount = d3.max(data, d => d.patentCount);

        radScale.domain([1, maxPatentCount]);
        let circles = map
          .selectAll('.circle')
          .data(data)
          .enter()
          .append('circle')
          // .attr('class', 'circle')
          .attr('fill', 'white')
          .attr('stroke-width', '0.5px')
          .attr('stroke', 'gray')
          .attr('cx', d => projection([d.longitude, d.latitude])[0])
          .attr('cy', d => projection([d.longitude, d.latitude])[1])
          .attr('r', d => radScale(d.patentCount));

        // Turn off tooltips
        // circles.on('mouseover', tip.show).on('mouseout', tip.hide);
      });
    })
    .catch(error => {
      console.log('Something went wrong:', error);
    });
}

export default {
  components: { TopCompanies },
  data() {
    return {
      countrySelected: 'The World',
    };
  },
  mounted() {
    renderMap();
  },
  methods: {
    changelist(event) {
      if (event.path[0].__data__) {
        this.countrySelected = event.path[0].__data__.country;
      } else {
        this.countrySelected = 'The World';
      }
    },
  },
};
</script>

<template lang="pug">
div
  .uk-grid(uk-grid).uk-container-expand.uk-text-center(@mouseover="changelist")
    
    .uk-width-3-4
      .uk-tile.uk-width-expand.uk-padding-remove-top(uk-scrollspy="cls: uk-animation-fade; delay: 100; repeat: true")
        svg#svg.uk-margin-remove.uk-padding-remove
          .uk-card 
            p Officia laborum exercitation tempor ut deserunt commodo occaecat. Voluptate irure aute fugiat ut minim nostrud amet eiusmod do sit sint id labore ex. Enim id consectetur aute sunt sunt voluptate tempor fugiat. Aute in est amet culpa sint ea.


    .uk-width-1-4
      top-companies(:country="countrySelected")
      
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
