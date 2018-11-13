export function filterData(
  data,
  startYear,
  endYear,
  ff_short,
  region,
  country,
  dataYearRange,
) {
  let filteredDataYears = data.filter(el => {
    if (startYear == dataYearRange.min && endYear == dataYearRange.max)
      return data;
    return el.year >= startYear && el.year <= endYear;
  });

  // ff_short is the short name of an industry. It's a property in industry objects in the "industries" array in lists.jsons
  let filteredDataIndustry = filteredDataYears.filter(el => {
    if (ff_short == 'All Industries') return filteredDataYears;
    return el.ff_short == ff_short;
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
