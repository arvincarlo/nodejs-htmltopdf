import { 
  getAllUserCurrency,
  getFcbsDeposits,
  getAllTimeDeposits,
  getAllTrustDeposits,
  getAllTrustFixedIncome,
  getAllTrustEquities,
  getAllCBSecMapping,
  getAllTrustUitf,
  getLatestCurrencyRatesByMonth,
} from "../services/users.js";

export function formatPesos(value) {
  if (typeof value !== 'number') value = Number(value) || 0;
  return value.toLocaleString('en-PH', { currency: 'PHP', minimumFractionDigits: 2 });
}

export function getPercentage(value, total) {
  if (!total || isNaN(value) || isNaN(total)) return 0;
  return Math.round((Number(value) / Number(total)) * 100);
}

export function getPercentageChange(total, previous) {
  const value = (total - previous) / previous;
  const percent = (value * 100).toFixed(2);
  return percent;
}

// Format a JS Date object to 'DD-MMM-YY' (e.g., 11-Mar-23)
export function formatDateToShort(dateInput) {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export function getLastDayOfMonth(month, year) {
  // month: string (e.g. "April"), year: number or string
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const lastDay = new Date(year, monthIndex + 1, 0);
  // Format as "April 30, 2024"
  return `${month} ${lastDay.getDate()}, ${year}`;
}

export function sumOfFields(items, field) {
  return (items || []).reduce((sum, item) => sum + (item[field] || 0), 0);
}

export function getMonthNumber(month) {
  if (typeof month === 'number') return month;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const idx = months.findIndex(m => m.toLowerCase() === month.slice(0,3).toLowerCase());
  return idx === -1 ? 1 : idx + 1;
}

export async function getPrevMonthAUM(cifNumber, month, year) {
  // Convert month name to number
  const monthNum = getMonthNumber(month);
  let prevMonth = monthNum - 1;
  let prevYear = Number(year);

  if (prevMonth < 1) {
    prevMonth = 12;
    prevYear -= 1;
  }

  const allUserCurrencies = await getAllUserCurrency(cifNumber, prevMonth, prevYear);

  // Getting the value per currency
  const fcbsDeposits = {};
  const timeDeposits = {};
  const trustDeposits = {};
  const trustFixedIncome = {};
  const trustEquities = {};
  const cbsecMapping = {};
  const trustUitf = {};

  for (const currencyCode of allUserCurrencies) {
    fcbsDeposits[currencyCode] = await getFcbsDeposits(cifNumber, prevMonth, prevYear, currencyCode);
    timeDeposits[currencyCode] = await getAllTimeDeposits(cifNumber, prevMonth, prevYear, currencyCode);
    trustDeposits[currencyCode] = await getAllTrustDeposits(cifNumber, prevMonth, prevYear, currencyCode);
    trustFixedIncome[currencyCode] = await getAllTrustFixedIncome(cifNumber, prevMonth, prevYear, currencyCode);
    trustEquities[currencyCode] = await getAllTrustEquities(cifNumber, prevMonth, prevYear, currencyCode);
    cbsecMapping[currencyCode] = await getAllCBSecMapping(cifNumber, currencyCode);
    trustUitf[currencyCode] = await getAllTrustUitf(cifNumber, prevMonth, prevYear, currencyCode);
  }

  // Fetch Rates, and filter rates only for the user's currencies (prevMonth)
  const allLatestCurrencyRates = await getLatestCurrencyRatesByMonth(prevMonth, prevYear)

  const latestCurrencyRates = {};
  for (const code of allUserCurrencies) {
    if (allLatestCurrencyRates.hasOwnProperty(code)) {
      latestCurrencyRates[code] = allLatestCurrencyRates[code];
    }
  }

  // Get all currency codes present in any of the objects
  const allCurrencies = Array.from(
    new Set([
      ...Object.keys(fcbsDeposits),
      ...Object.keys(timeDeposits),
      ...Object.keys(trustDeposits)
    ])
  );

  // Product Holdings Section
  let totalMoneyMarket = 0;
  let totalFixedIncome = 0;
  let totalEquities = 0;
  let totalStructuredProducts = 0;
  let totalTrustUitf = 0;
  
  for (const code of allCurrencies) {
    // Deposit CASA
    const depositPHP = sumOfFields(fcbsDeposits[code], 'availableBalance');
    // Time Deposit
    const timeDepPHP = sumOfFields(timeDeposits[code], 'principalAmount');
    // Trust TD
    const trustDepPHP = sumOfFields(trustDeposits[code], 'principalAmount');
    // Trust Fixed Income
    const fixedIncomePHP = sumOfFields(trustFixedIncome[code], 'faceAmount');

    // Equities (Trust Equities + CB Securities Mapping)
    const trustEquitiesPHP = sumOfFields(trustEquities[code], 'purchaseAmount');
    const cbsecMappingPHP = sumOfFields(cbsecMapping[code], 'netPurchaseAmount');

    // Convert to PHP if not PHP (code 0)
    const rate = code === 'PHP' ? 1 : (latestCurrencyRates[code] || 1);
    totalMoneyMarket += (depositPHP + timeDepPHP + trustDepPHP) * rate;
    totalFixedIncome += fixedIncomePHP * rate;
    totalEquities += (trustEquitiesPHP + cbsecMappingPHP) * rate;
    totalStructuredProducts += (0) * rate;
    totalTrustUitf += sumOfFields(trustUitf[code], 'purchaseAmount') * rate;
  }

  const totalPrevMonthAUM = totalMoneyMarket + totalFixedIncome + totalEquities + totalStructuredProducts + totalTrustUitf;
  console.log("allUserCurrencies" , allUserCurrencies);
  console.log(prevMonth, " latestCurrencyRates " , latestCurrencyRates);
  console.log("prevMonth" , prevMonth);
  console.log("prevYear" , prevYear);
  console.log("fcbsDeposits" , fcbsDeposits);
  console.log("totalPrevMonthAUM" , totalPrevMonthAUM);
  return totalPrevMonthAUM;
}