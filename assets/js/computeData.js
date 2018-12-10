import * as d3 from 'd3';
import { rollup } from 'd3-array';
import { lists } from '@/assets/data/listData';
/**
 *
 * Groups and aggregates data by company
 * @export
 * @param {Array<{}>} data
 * @returns {Array<Array>} aggregated patent and other data for each company
 */
export function rollupCompanies(data, toSort = true) {
  if (data && data.length > 0) {
    let rolledupCompanies = rollup(
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
          industry: v[0].industry,
          gvkey: v[0].gvkey,
        };
      },
      d => d.company,
    );

    const rolledupCompaniesArr = Array.from(rolledupCompanies);
    if (toSort) {
      return rolledupCompaniesArr.sort(
        (a, b) => b[1].totalpatent - a[1].totalpatent,
      );
    } else {
      return rolledupCompaniesArr;
    }
  } else {
    return [];
  }
}

/**
 *
 *
 * @param {Array<Array>} rolledupCompanies
 * @returns {Array<Array>} total number of patents and companies in the selected data
 */
export function sumPatentsNumCompanies(rolledupCompanies) {
  if (rolledupCompanies && rolledupCompanies.length > 0) {
    return [
      d3.sum(rolledupCompanies, el => el[1].totalpatent),
      rolledupCompanies.length,
    ];
  } else {
    return [];
  }
}

/**
 *
 * First groups by country and then by year and returns total for each country-year.
 * @param {Array<{}>} rolledupCompany
 * @returns {Array<Array>}
 */
export function rollupCountryYears(rolledupCompanies) {
  const rolledupCountryYears = rollup(
    rolledupCompanies,
    v => d3.sum(v, d => d.patentcount),
    d => d.country,
    d => d.year,
  );
  return Array.from(rolledupCountryYears);
}

// save in variables to avoid unnecessary lookups
const minYear = lists.dataYearRange.min;
const maxYear = lists.dataYearRange.max;

/**
 *
 *
 * @param {*} {
 *   data,
 *   startyear,
 *   endyear,
 *   industry,
 *   country,
 *   dataYearRange = lists.dataYearRange,
 * }
 * @returns {{}[]}
 */
export function filterData(
  data,
  startyear = 2000,
  endyear = 2017,
  industry = 'All Industries',
  country = 'All Countries',
) {
  if (data && data.length > 0) {
    return data
      .filter(el => {
        if (startyear === minYear && endyear === maxYear) return true;
        return el.year >= startyear && el.year <= endyear;
      })
      .filter(el => {
        if (industry === 'All Industries') return true;
        return el.industry === industry;
      })
      .filter(el => {
        if (country === 'All Countries') {
          return true;
        } else if (
          ['Asia Pacific', 'Europe', 'North America'].includes(country)
        ) {
          return el.region === country;
        } else {
          return el.country === country;
        }
      });
  } else {
    return [];
  }
}
