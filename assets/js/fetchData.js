// Exports promises, not the actual data; Need to be resolved by importing modules
import * as d3 from 'd3';

// todo p2: optimize source data: (1) get rid of data that don't matter, (2) NORMALIZE: have separate files for country coordinates and such data
// Reads the main data file: has all data; each row is for one company-year
const dataProm = d3
  .csv(require('@/assets/data/20181106_PatentData-ShortVariableNames.csv'))
  .then(data => {
    // Convert to correct data types and make other changes before returning the data
    data.forEach(el => {
      // el.company = el.company.replace(
      //   // todo: Remove all suffixes to save space; eventually, do this on the data file.
      //   /\s(plc|PLC|Plc|Corp|CORP|corp|Inc|INC|inc|Ltd|LTD|AG|Ag|ag|Co|CO|Co Ltd|CO LTD| CO Ltd)\.*\s*$/,
      //   '',
      // );
      el.assets = +el.assets;
      el.sales = +el.sales;
      el.rdex = +el.rdex;
      el.capex = +el.capex;
      el.ebitda = +el.ebitda;
      el.year = +el.year;
      el.patentcount = +el.patentcount;
    });

    return data;
  });

const fieldNamesProm = d3
  .csv(require('@/assets/data/FieldNamesMapped.csv'))
  .then(data => {
    data.forEach(row => {
      return data;
    });
  });

export { dataProm, fieldNamesProm };
