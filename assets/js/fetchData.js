import * as d3 from 'd3';
let fThousand = d3.format(',');
// Exports promises, not the actual data; Need to be resolved by importing modules

// Reads the main data file: has all data; each row is for one company-year
const dataProm = d3
  .csv(require('@/assets/data/20181106_PatentData-ShortVariableNames.csv'))
  .then(data => {
    // todo: convert to correct data types and make other changes before returning the data
    data.forEach(el => {
      el.company = el.company.replace(
        /\s(plc|PLC|Plc|Corp|CORP|corp|Inc|INC|inc|Ltd|LTD|AG|Ag|ag|A\/S|Co|CO)\.*\s*$/,
        '',
      );
      el.ffname = el.ffname.replace(/Equipment/, 'Equip.');
      el.year = +el.year;
      el.patentcount = +el.patentcount;
    });
    return data;
  });

const fieldNamesProm = d3
  .csv(require('@/assets/data/FieldNamesMapped.csv'))
  .then(data => {
    return data;
  });

// read other aggregated data files
const patentByCountryProm = d3
  .csv(require('@/assets/data/20181101_PatentCountByCountry.csv'))
  .then(data => {
    return data;
  });

const worldMapProm = d3.json('/data/maps/world-110m.json').then(data => {
  // const worldMapProm = d3.json('assets/data/maps/world-110m.json').then(data => {
  return data;
});

export { dataProm, fieldNamesProm, patentByCountryProm, worldMapProm };
