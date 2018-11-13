import * as d3 from 'd3';
import { dataProm } from 'assets/js/fetchData';

// todo get by year
export const getCountriesProm = dataProm.then(data => {
  return [...new Set(data.map(el => el.country))];
});

// Get top n companies by country
export function getTopCompaniesByCountryProm(country, n, year) {
  return dataProm.then(data => {
    if (country == 'The World') {
      return data
        .filter(el => el.year == year)
        .sort((a, b) => d3.descending(a.patentcount, b.patentcount))
        .slice(0, n);
    }
    return data
      .filter(el => el.year == year)
      .filter(el => el.country == country)
      .sort((a, b) => d3.descending(a.patentcount, b.patentcount))
      .slice(0, n);
  });
}

// try to use the following simpler function instead of the one above.
// TODO: seems these can all be combined into one function
export function filterCompaniesInYears(data, startYear, endYear) {
  if (startYear == 1950 && endYear == 2017) return data;
  return data.filter(el => el.year >= startYear && el.year <= endYear);
}

export function filterCompaniesInRegion(data, region) {
  // debugger;
  if (region == 'All Regions') return data;
  // debugger;
  console.log('executing filter in region');
  return data.filter(el => el.region == region);
}

export function filterCompaniesInCountry(data, country) {
  if (country == 'All Countries') return data;
  return data.filter(el => el.country == country);
}

// Industry: fama french industry name as in lists.jsons
export function filterCompaniesInIndustry(data, industry) {
  // Move on if all industries
  if (industry == 'All Industries') return data;
  return data.filter(el => el.industry == industry);
}

// Generic version of the four above
export function filterCompaniesInXattr(data, Xattr) {
  if (Xattr.startsWith('All')) return;
  return data.filter(el.Xattr == Xattr);
}

export function sortCompanies(data) {
  console.log('sort', data);
  return data.sort((a, b) => d3.descending(a.patentcount, b.patentcount));
}
