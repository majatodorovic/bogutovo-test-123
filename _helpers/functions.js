"use client"
export const currencyFormat = (
  amount,
  currency = 'RSD',
  showFractions = false
) => {
  // Guard: no amount
  if (amount == null || isNaN(amount)) {
    return '-'
  }

  // Number of digits to show after the decimal places
  const decimalDigits = showFractions ? 2 : 0

  // Summarize options
  const options = {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  }

  // Format to two decimal places
  const price = new Intl.NumberFormat('de-DE', options).format(amount)
  const currencyLabel = currency?.toLocaleUpperCase() ?? ''

  return `${price} ${currencyLabel}`.trim()
}

export const convertHttpToHttps = (url) => {
  const isHttp = url?.includes("http:");
  return isHttp ? url.replace("http", "https") : url;
};

export const convertDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  return day + "." + month + "." + year;
};

