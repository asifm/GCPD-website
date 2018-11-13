import * as d3 from 'd3';

// ? rollup can't be found in main d3 for some reason;
import { rollup } from 'd3-array';

export function rollupData(data) {
  // ! d3.rollup returns a JS Map
  return rollup(
    data,
    v => {
      return {
        totalpatent: d3.sum(v, d => d.patentcount),
        totalrdex: d3.sum(v, d => d.rdex),
        totalcapex: d3.sum(v, d => d.capex),
        totalsales: d3.sum(v, d => d.sales),
        totalebitda: d3.sum(v, d => d.ebitda),
        totalassets: d3.sum(v, d => d.assets),
        city: v[0].city,
        country: v[0].country,
        ff_short: v[0].ff_short,
        gvkey: v[0].gvkey,
      };
    },
    d => d.company,
  );
}
