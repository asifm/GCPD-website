<script>
import vegaEmbed from 'vega-embed';
// Assign the specification to a local variable vlSpec.
const vlSpec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v3.json',
  data: {
    values: [
      { a: 'C', b: 2 },
      { a: 'C', b: 7 },
      { a: 'C', b: 4 },
      { a: 'D', b: 1 },
      { a: 'D', b: 2 },
      { a: 'D', b: 6 },
      { a: 'E', b: 8 },
      { a: 'E', b: 4 },
      { a: 'E', b: 7 },
    ],
  },
  mark: 'bar',
  encoding: {
    y: { field: 'a', type: 'nominal' },
    x: {
      aggregate: 'average',
      field: 'b',
      type: 'quantitative',
      axis: {
        title: 'Average of b',
      },
    },
  },
};
export default {
  mounted() {
    vegaEmbed('#vis', vlSpec);
  },
};
// Embed the visualization in the container with id `vis`
</script>
<template>
  <div>
    <h1>Template for Embedding Vega-Lite Visualization</h1>
    <!-- Container for the visualization -->
    <div id="vis" />
  </div>
</template>

<style lang="scss" scoped>
canvas {
  filter: drop-shadow(2px 2px 10px #777);
}
</style>
