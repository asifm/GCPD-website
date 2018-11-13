// Exports promises, not the actual data; Need to be resolved by importing modules
import * as d3 from 'd3';
let fThousand = d3.format(',');

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
      el.year = +el.year;
      el.patentcount = +el.patentcount;
    });
    // todo: sort data by patentcount in the source csv file
    return data;
  });

const fieldNamesProm = d3
  .csv(require('@/assets/data/FieldNamesMapped.csv'))
  .then(data => {
    data.forEach(row => {
      return data;
    });
  });

// read other aggregated data files
const patentByCountryProm = d3
  .csv(require('@/assets/data/20181101_PatentCountByCountry.csv'))
  .then(data => {
    data.forEach(row => {
      row.patentCount = +row.patentcount;
      row.longitude = +row.longitude;
      row.latitude = +row.latitude;
    });
    return data;
  });

// todo p3: refactor: webpack can directly read json; no need for d3
const worldGeojsonProm = d3
  .json('/data/maps/world-110m.json')
  .then(mapData => mapData);

export { dataProm, fieldNamesProm, patentByCountryProm, worldGeojsonProm };
