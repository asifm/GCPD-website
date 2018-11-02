<template>
  <svg 
    id="svg"/>
</template>

<script>
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

function renderMap() {
  var width = 1160,
    height = 500;

  let margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  };

  var projection = d3.geoMercator().translate([width / 2, height / 2 + 50]);
  // .scale(1.5);

  var path = d3.geoPath().projection(projection);

  var svg = d3
    .select('#svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');

  var url = '/data/maps/world-110m.json';

  const radScale = d3.scaleLinear().range([5, 30]);

  d3.json(url)
    .then(countries => {
      let mapG = svg.append('g');
      let map = svg.append('g');

      mapG
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

      let trans = {};

      let zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on('zoom', () => {
          trans['stroke-width'] = 1.5 / d3.event.transform.k + 'px';
          trans['transform'] = d3.event.transform;

          mapG.style('stroke-width', trans['stroke-width']);
          mapG.attr('transform', trans['transform']);

          map.style('stroke-width', trans['stroke-width']);
          map.attr('transform', trans['transform']);
        });
      svg.call(zoom);

      d3.csv('/data/20181101_patentCountByCountry.csv').then(data => {
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
              }</span><br/><span>Patents: ${f(d.patentCount)}</span></div>`
          );

        mapG.call(tip);

        radScale.domain([1, 1000000]);

        map
          .selectAll('.circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('class', 'circle')
          .attr('cx', d => projection([d.longitude, d.latitude])[0])
          .attr('cy', d => projection([d.longitude, d.latitude])[1])
          .attr('r', d => radScale(d.patentCount))
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

export default {
  data() {
    return {};
  },
  mounted() {
    renderMap();
  }
};
</script>


<style>
/* .path {
  fill: #334499;
  stroke: #aaa;
  stroke-width: 0.08736px;
} */

.path:hover {
  /* opacity: 0.7; */
  fill: #eee;
}
.circle {
  /* fill: #e57200; */
  fill: #232d4b;
  fill-opacity: 0.5;
  /* stroke: #fff; */
}

/* Style northward tooltips differently */
.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}
</style>
