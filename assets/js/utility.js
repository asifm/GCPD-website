// @ts-nocheck

import { format as d3Format } from 'd3-format';

// Needed for apexcharts year axis
export function fillRange(start, end) {
  return (
    Array(end - start + 1)
      // @ts-ignore
      .fill()
      .map((_, index) => start + index)
  );
}
// format numbers conditionally; mainly for apexcharts
export function formatNumber(
  val,
  valMultiplier = 1,
  numDigitsAfterDecimal = 2,
) {
  val = +val * valMultiplier;
  let formattedVal;
  switch (true) {
    case val >= 1e9:
      formattedVal =
        d3Format(',')((val / 1e9).toFixed(numDigitsAfterDecimal)) + ' B';
      break;
    case val >= 1e6:
      formattedVal =
        d3Format(',')((val / 1e6).toFixed(numDigitsAfterDecimal)) + ' M';
      break;
    case val >= 1e4:
      formattedVal =
        d3Format(',')((val / 1e3).toFixed(numDigitsAfterDecimal)) + ' K';
      break;
    case val < 1e4:
      formattedVal = d3Format(',')(val);
      break;
  }
  return formattedVal;
}
