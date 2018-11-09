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
