// ::import libraries
import * as d3 from 'd3';

// ::import data (as promises)
import { patentByCountryProm } from 'assets/js/fetchData';

// todo: receive per country aggregate data from ExploreMap.vue and render updated map
export function renderMap(
  width = 1160,
  height = 500,
  geoProjection = d3.geoMercator,
  geoJsonPath = '/data/world-110m.json',
) {
  let margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };

  const projection = geoProjection().translate([width / 2, height / 2 + 50]);

  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select('#svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');

  const radScale = d3.scaleSqrt().range([1, 30]);

  d3.json(geoJsonPath)
    .then(countries => {
      let mapG = svg.append('g');
      let map = svg.append('g');

      // todo: click/hover on path to select country for showing data
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
      svg.call(zoom).on('wheel.zoom', null);

      patentByCountryProm.then(d => {
        let data = d;

        let maxPatentCount = d3.max(data, d => d.patentCount);

        radScale.domain([1, maxPatentCount]);
        let circles = map
          .selectAll('.circle')
          .data(data)
          .enter()
          .append('circle')
          // .attr('class', 'circle')
          .attr('fill', '#232d4b')
          .attr('opacity', 0.5)
          .attr('stroke-width', '0.5px')
          .attr('stroke', 'gray')
          .attr('cx', d => projection([d.longitude, d.latitude])[0])
          .attr('cy', d => projection([d.longitude, d.latitude])[1])
          .attr('r', d => radScale(d.patentCount))
          .attr(
            'uk-tooltip',
            d =>
              `title:${d.country} <br> ${d3.format(',')(
                d.patentCount,
              )} patents;pos:top`,
          );
      });
    })
    .catch(error => {
      console.log('Something went wrong:', error);
      throw error;
    });
}
