import { format } from 'd3-format';

// Needed for apexcharts year axis
export function fillRange(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((item, index) => start + index);
}
// format numbers conditionally; mainly for apexcharts
export function formatVal(val, opt) {
  val = +val;
  let formattedVal;
  switch (true) {
    case val >= 1000000:
      formattedVal = format(',')((val / 1000000).toFixed(2)) + 'M';
      break;
    case val >= 10000:
      formattedVal = format(',')(Math.round(val / 1000)) + 'K';
      break;
    case val < 10000:
      formattedVal = format(',')(val);
      break;
  }
  return formattedVal;
}
