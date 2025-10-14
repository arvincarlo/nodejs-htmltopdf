# nodejs-htmltopdf

done items
1. Month and year
2. AccountName
33 to 50

QUERIES:
GET all debit in CASA based on account number
SELECT SUM([debit]) as totalDebit
FROM [FcbsCashTransactionHistorySACA]
WHERE [accountNumber] IN (
  SELECT [accountNumber]
  FROM [WealthAppDB1.0].[dbo].[AccountDataTables]
  WHERE [cif] = 'R23500000'
)
AND EOMONTH([transDateValueDate]) = EOMONTH('2024-04-09');

DB alter commands:
1. EXEC sp_rename 'FcbsDeposits.currency', 'currencyInt', 'COLUMN';
2. ALTER TABLE FcbsDeposits
ADD currency NVARCHAR(3);
3. UPDATE FcbsDeposits
SET currency = 
  CASE 
    WHEN currencyInt = 0 THEN 'PHP'
    WHEN currencyInt = 1 THEN 'USD'
    WHEN currencyInt = 2 THEN 'EUR'
    WHEN currencyInt = 3 THEN 'JPY'
    ELSE NULL
  END;


clarifications:
1. FcbsTimeDeposits.
maturityValue type is (Date), how can i total, must be integer value

62	(PHP) Maturity Value TOTAL	Total of all maturity value from client's PHP TD / PSA accounts		Number	Total of  all values under field 	FcbsTimeDeposits.maturityValue
String	PHP	FcbsTimeDeposits.currency

page 8 - accountNumber
page 9 - accountNumber



DONE pages:
page 1 - done
page 2 - done
page 3 - done
page 4 - pending sa field
page 5 - pending sa fields
page 6 - pending sa fields
page 7 - pending sa fields
page 8 - done
page 9 - done
page 10 - done
page 11 - ongoing (for confirmation)
page 12 - ongoing
page 13 - ongoing
page 14 - ongoing
appendix - ongoing


wala sa d360 yung values ni UI - treasury

update db data type

Minutes of the meeting 10/08/25:

1. confirm and identify from d360 if currency is varchar / int
2. d360 values in UI - treasury - fieldName 
3. forex discussion - foreign xchange rate with currency
4. FcbsTimeDeposits.maturityValue datatype is (date), getting the total of Maturity value, must be integer value
(ETL)
5. UI - Treasury - mapping

Exposed currently:
- FCBS
- CBSEC

Update all the table to varchar(3)


1. Update datatable

FCBS Xchange rate
- fields
- value

confirm to ms laurice if 4 lang i di display
confirm kung anong wealth lang si client - portfolio ni client






// Assume these are your data objects:
const totalAvailableBalance = { 0: 10000, 1: 2000 }; // 0: PHP, 1: USD, etc.
const totalPrincipalAmountTimeDeposit = { 0: 5000, 1: 1000 };
const totalPrincipalAmountTrustDeposit = { 0: 3000, 1: 500 };
const exchangeRates = { 1: 58.00, 2: 67.00, 3: 45.00, 4: 50.00 }; // 1: USD, etc.

// Helper to get value in PHP for a currency
function toPHP(amount, currencyCode) {
  if (currencyCode === 0) return amount; // PHP
  return amount * (exchangeRates[currencyCode] || 1);
}

// Calculate Money Market
function calculateMoneyMarket(
  totalAvailableBalance,
  totalPrincipalAmountTimeDeposit,
  totalPrincipalAmountTrustDeposit,
  exchangeRates
) {
  let moneyMarket = 0;
  // Get all currency codes present in any of the objects
  const allCurrencies = Array.from(
    new Set([
      ...Object.keys(totalAvailableBalance),
      ...Object.keys(totalPrincipalAmountTimeDeposit),
      ...Object.keys(totalPrincipalAmountTrustDeposit)
    ].map(Number))
  );
  for (const code of allCurrencies) {
    moneyMarket += toPHP(totalAvailableBalance[code] || 0, code);
    moneyMarket += toPHP(totalPrincipalAmountTimeDeposit[code] || 0, code);
    moneyMarket += toPHP(totalPrincipalAmountTrustDeposit[code] || 0, code);
  }
  return moneyMarket;
}

// Example usage:
const moneyMarket = calculateMoneyMarket(
  totalAvailableBalance,
  totalPrincipalAmountTimeDeposit,
  totalPrincipalAmountTrustDeposit,
  exchangeRates
);

console.log('Money Market (PHP):', moneyMarket.toFixed(2));



-----------------------------


// Example input data (replace with your actual data)
const totalDeposits = {/* ...as provided... */};
const totalTimeDeposits = {/* ...as provided... */};
const totalTrustDeposits = {/* ...as provided... */};
const latestCurrencyRates = { 1: 58.00, 2: 67.00, 3: 45.00, 4: 50.00 }; // Example rates

function sumAvailableBalance(deposits) {
  return (deposits || []).reduce((sum, d) => sum + (d.availableBalance || 0), 0);
}
function sumPrincipalAmount(deposits) {
  return (deposits || []).reduce((sum, d) => sum + (d.principalAmount || 0), 0);
}

// Get all currency codes present in any of the objects
const allCurrencies = Array.from(
  new Set([
    ...Object.keys(totalDeposits),
    ...Object.keys(totalTimeDeposits),
    ...Object.keys(totalTrustDeposits)
  ].map(Number))
);

// Calculate money market in PHP
let moneyMarket = 0;
for (const code of allCurrencies) {
  // Deposit CASA
  const depositPHP = sumAvailableBalance(totalDeposits[code]);
  // Time Deposit
  const timeDepPHP = sumPrincipalAmount(totalTimeDeposits[code]);
  // Trust TD
  const trustDepPHP = sumPrincipalAmount(totalTrustDeposits[code]);

  // Convert to PHP if not PHP (code 0)
  const rate = code === 0 ? 1 : (latestCurrencyRates[code] || 1);
  moneyMarket += (depositPHP + timeDepPHP + trustDepPHP) * rate;
}

console.log('Money Market (PHP):', moneyMarket.toFixed(2));