// import numeral from 'numeral';

// ----------------------------------------------------------------------

export function formatNumber(number) {
  const formatter = new Intl.NumberFormat("en-ke", {
    localeMatcher:'best fit',
    style: "decimal",
    notation: "compact",
    compactDisplay:'short',
  });
  return formatter.format(number);
}

// export function fCurrency(number) {
//   const format = number ? numeral(number).format('$0,0.00') : '';

//   return result(format, '.00');
// }

export const formatCurrency = (amount) => {
  // Format the price as Kenyan currency
  const formatter = new Intl.NumberFormat("en-Ke", {
    style: "currency",
    currency: "KES",
  });
  return formatter.format(amount);
};

// export function fPercent(number) {
//   const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

//   return result(format, '.0');
// }

// export function fShortenNumber(number) {
//   const format = number ? numeral(number).format('0.00a') : '';

//   return result(format, '.00');
// }

// export function fData(number) {
//   const format = number ? numeral(number).format('0.0 b') : '';

//   return result(format, '.0');
// }

// function result(format, key = '.00') {
//   const isInteger = format.includes(key);

//   return isInteger ? format.replace(key, '') : format;
// }
