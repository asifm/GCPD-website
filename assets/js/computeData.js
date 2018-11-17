import * as d3 from 'd3';
import { rollup } from 'd3-array';
import keyBy from 'lodash/keyBy';

/**
 *
 * Groups and aggregates data by company
 * @export
 * @param {Array<{}>} data
 * @returns {Array<Array>} aggregated patent and other data for each company
 */
export function rollupCompany(data) {
  console.log(data);
  let rolledupCompany = rollup(
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
        industry_short: v[0].industry_short,
        gvkey: v[0].gvkey,
      };
    },
    d => d.company,
  );

  return Array.from(rolledupCompany);
}

/**
 *
 *
 * @param {Array<Array>} rolledupCompany
 * @returns {Array<Array>} total number of patents and companies in the selected data
 */
export function sumPatentsNumCompanies(rolledupCompany) {
  return [
    d3.sum(rolledupCompany, el => el[1].totalpatent),
    rolledupCompany.length,
  ];
}

/**
 *
 * First groups by country and then by year and returns total for each country-year.
 * @param {Array<{}>} rolledupCompany
 * @returns {Array<Array>}
 */
export function rollupCountryYear(rolledupCompany) {
  const rolledupCountryYear = rollup(
    rolledupCompany,
    v => d3.sum(v, d => d.patentcount),
    d => d.country,
    d => d.year,
  );
  return Array.from(rolledupCountryYear);
}

/**
 *
 *
 * @export
 * @param {Array<{}>} data
 * @param {number} startYear
 * @param {number} endYear
 * @param {string} region
 * @param {string}country
 * @param {string} industry_short
 * @param {{}} dataYearRange
 * @returns
 */
export function filterData(
  data,
  startYear,
  endYear,
  region,
  country,
  industry_short,
  dataYearRange,
) {
  let filteredDataYears = data.filter(el => {
    if (startYear == dataYearRange.min && endYear == dataYearRange.max)
      return data;
    return el.year >= startYear && el.year <= endYear;
  });

  // industry_short is the short name of an industry.
  // It's a property in industry objects in the "industries" array in lists.jsons
  let filteredDataIndustry = filteredDataYears.filter(el => {
    if (industry_short == 'All Industries') return filteredDataYears;
    return el.industry_short == industry_short;
  });

  let filteredDataRegion = filteredDataIndustry.filter(el => {
    if (region == 'All Regions') return filteredDataIndustry;
    return el.region == region;
  });

  let filteredDataCountry = filteredDataRegion.filter(el => {
    if (country == 'All Countries') return filteredDataRegion;
    return el.country == country;
  });

  return filteredDataCountry;
}
