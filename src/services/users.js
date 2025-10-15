
import sql from 'mssql/msnodesqlv8.js';
import { currencyConfig } from '../constants/currency.js';
import config from '../config/db.js';

/**
 * Retrieves the total available balance from FcbsDeposits for a given cifNumber, month, and year,
 * and adds the total principal amount from FcbsTimeDeposits for the same cifNumber.
 *
 * @param {string} cifNumber - The CIF number to filter records.
 * @param {string} month - The short month name (e.g., 'Jan', 'Feb', 'Mar').
 * @param {string|number} year - The year (e.g., '2024' or 2024).
 * @returns {Promise<number>} The sum of availableBalance (for the given month/year) and principalAmount (all time) for the cifNumber.
 *
 * Example usage:
 *   const total = await getFcbsDepositsByCifNumber('R23500000', 'Nov', 2024);
 */
export async function getFcbsDepositsByCifNumber(cifNumber, month, year) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        ISNULL(SUM(fd.[availableBalance]), 0) AS totalAvailableBalance,
        (
          SELECT ISNULL(SUM([principalAmount]), 0)
          FROM FcbsTimeDeposits
          WHERE [cifNumber] = @cifNumber
        ) AS totalPrincipalAmount
      FROM FcbsDeposits fd
      WHERE fd.[cifNumber] = @cifNumber
        AND MONTH(fd.[dateCovered]) = @monthNum
        AND YEAR(fd.[dateCovered]) = @yearNum
    `;

    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);


    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);


    const result = await request.query(query);
    await sql.close();

    const row = result.recordset[0] || {};
    // Return the sum of availableBalance and principalAmount
    return (row.totalAvailableBalance || 0) + (row.totalPrincipalAmount || 0);
  } catch (error) {
    console.error('SQL error:', error);
    return 0;
  }
}


/**
 * Get the sum of CBSecMapping.marketValue for a given cifNumber.
 * @param {string} cifNumber
 * @returns {Promise<number>} The total market value
 */
export async function getTotalCBCSecMarketValue(cifNumber) {
  try {
    await sql.connect(config);
    const query = `
      SELECT ISNULL(SUM([marketValue]), 0) AS totalMarketValue
      FROM CBSecMapping
      WHERE [cifNumber] = @cifNumber
    `;
    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    const result = await request.query(query);
    await sql.close();

    return result.recordset[0]?.totalMarketValue || 0;
  } catch (error) {
    console.error('SQL error:', error);
    return 0;
  }
}

/**
 * Retrieves all deposit records for a given CIF number, month, and year from the FcbsDeposits table.
 *
 * @param {string} cifNumber - The CIF number to filter records.
 * @param {string} month - The short month name (e.g., 'Jan', 'Feb', 'Mar').
 * @param {string|number} year - The year (e.g., '2024' or 2024).
 * @returns {Promise<Array>} An array of deposit records, each containing:
 *   - accountName
 *   - branch
 *   - productDescription
 *   - referenceNumber
 *   - currentBalance
 *   - availableBalance
 *
 * Example usage:
 *   const deposits = await getFcbsDeposits('R23500000', 'Jun', 2024);
 */
export async function getFcbsDeposits(cifNumber, month, year, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        [accountName],
        [branch],
        [productDescription],
        [referenceNumber],
        [currentBalance],
        [availableBalance]
      FROM FcbsDeposits
      WHERE [cifNumber] = @cifNumber
        AND MONTH([dateCovered]) = @monthNum
        AND YEAR([dateCovered]) = @yearNum
        ${currency !== undefined ? 'AND [currency] = @currency' : ''}
    `;

    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);
    if (currency !== undefined) {
      request.input('currency', sql.VarChar, currency);
    }

    const result = await request.query(query); 
    await sql.close();

    return result.recordset;
  }  catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}


export async function getAllTimeDeposits(cifNumber, month, year, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        *
      FROM FcbsTimeDeposits
      WHERE [cifNumber] = @cifNumber
        ${currency !== undefined ? 'AND [currency] = @currency' : ''}
      AND MONTH([valueDate]) = @monthNum
      AND YEAR([valueDate]) = @yearNum
    `;
    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);

    if (currency !== undefined) {
      request.input('currency', sql.VarChar, currency);
    }

    const result = await request.query(query);
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getAllTrustDeposits(cifNumber, month, year, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        *
      FROM TrustDeposits
      WHERE [cifNumber] = @cifNumber
        ${currency !== undefined ? 'AND [currency] = @currency' : ''}
      AND MONTH([valueDate]) = @monthNum
      AND YEAR([valueDate]) = @yearNum
    `;
    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);

    if (currency !== undefined) {
      request.input('currency', sql.VarChar, currency);
    }

    const result = await request.query(query);
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}


export async function getTransactionHistory(cifNumber, month, year) {
  try {
    await sql.connect(config);
    const query = `
      SELECT *
      FROM FcbsCashTransactionHistorySACA
      WHERE [accountNumber] IN (
        SELECT [accountNumber]
        FROM AccountDataTables
        WHERE [cif] = @cifNumber
      )
      AND MONTH([transDateValueDate]) = @monthNum
      AND YEAR([transDateValueDate]) = @yearNum;
    `;
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);

    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.Int, monthNum);
    request.input('yearNum', sql.Int, yearNum);

    const result = await request.query(query);
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getAllTrustFixedIncome(cifNumber, month, year, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        *
      FROM TrustFixedIncome
      WHERE [cifNumber] = @cifNumber
        ${currency !== undefined ? 'AND [currency] = @currency' : ''}
      AND MONTH([valueDate]) = @monthNum
      AND YEAR([valueDate]) = @yearNum
    `;
    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);

    if (currency !== undefined) {
      request.input('currency', sql.VarChar, currency);
    }

    const result = await request.query(query);
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getAllTrustEquities(cifNumber, month, year, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        *
      FROM TrustEquities
      WHERE [cifNumber] = @cifNumber
        ${currency !== undefined ? 'AND [currency] = @currency' : ''}
      AND MONTH([valueDate]) = @monthNum
      AND YEAR([valueDate]) = @yearNum
    `;
    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);

    if (currency !== undefined) {
      request.input('currency', sql.VarChar, currency);
    }

    const result = await request.query(query);
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getAllTrustUitf(cifNumber, month, year, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        *
      FROM TrustUitf
      WHERE [cifNumber] = @cifNumber
        ${currency !== undefined ? 'AND [currency] = @currency' : ''}
      AND MONTH([valueDate]) = @monthNum
      AND YEAR([valueDate]) = @yearNum
    `;
    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);

    if (currency !== undefined) {
      request.input('currency', sql.VarChar, currency);
    }

    const result = await request.query(query);
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getAllCBSecMapping(cifNumber, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT *
      FROM CBSecMapping
      WHERE accountCode IN (
        SELECT AccountNumber
        FROM AccountDataTables
        WHERE [Cif] = @Cif
      )
      ${currency !== undefined ? 'AND [accountType] = @accountType' : ''}
    `;

    const request = new sql.Request();
    request.input('Cif', sql.VarChar, cifNumber);
    if (currency !== undefined) {
      request.input('accountType', sql.VarChar, currency);
    }

    const result = await request.query(query);
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getPrevMonthAUM(cifNumber, month, year) {
  try {
    await sql.connect(config);
    const query = `
      SELECT SUM(moneyMarketValue + fixedIncomeValue + equitiesValue + structuredProductsValue + unitTrustsValue)
      FROM [WealthAppDB1.0].[dbo].[CustomerDetails]
      WHERE [cifNumber] = @cifNumber
        AND MONTH([dateCovered]) = 
          (CASE 
            WHEN @monthNum = 1 THEN 12 
            ELSE @monthNum - 1 
          END)
        AND YEAR([dateCovered]) = 
          (CASE 
            WHEN @monthNum = 1 THEN @yearNum - 1 
            ELSE @yearNum 
          END)
    `;

    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);


    const result = await request.query(query);
    await sql.close();
    
    const value = result.recordset[0]?.[''] || 0;
    return value;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}


export async function getAllUserCurrency(cifNumber, month, year) {
  try {
    await sql.connect(config);

    // Get currencies from FcbsDeposits, FcbsTimeDeposits, and TrustDeposits for the given cifNumber/month/year
    const query = `
      SELECT DISTINCT [currency] FROM FcbsDeposits
        WHERE [cifNumber] = @cifNumber
          AND MONTH([dateCovered]) = @monthNum
          AND YEAR([dateCovered]) = @yearNum
      UNION
      SELECT DISTINCT [currency] FROM FcbsTimeDeposits
        WHERE [cifNumber] = @cifNumber
          AND MONTH([valueDate]) = @monthNum
          AND YEAR([valueDate]) = @yearNum
      UNION
      SELECT DISTINCT [currency] FROM TrustDeposits
        WHERE [cifNumber] = @cifNumber
          AND MONTH([valueDate]) = @monthNum
          AND YEAR([valueDate]) = @yearNum
    `;

    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);
    const request = new sql.Request();

    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);

    const result = await request.query(query);
    await sql.close();

    // map the currencies to return an array
    const currencyCodes = result.recordset.map(c => c.currency);

    return currencyCodes;
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getTotalBankPortfolioPerCurrency(cifNumber, month, year, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        ISNULL(SUM(fd.[availableBalance]), 0) AS totalAvailableBalance,
        (
          SELECT ISNULL(SUM([principalAmount]), 0)
          FROM FcbsTimeDeposits
          WHERE [cifNumber] = @cifNumber AND [currency] = @currency
        ) AS totalPrincipalAmount
      FROM FcbsDeposits fd
      WHERE fd.[cifNumber] = @cifNumber
        AND MONTH(fd.[dateCovered]) = @monthNum
        AND YEAR(fd.[dateCovered]) = @yearNum
        AND fd.[currency] = @currency
    `;

    // Convert month shortname to month number (jun -> 6)
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);

    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.VarChar, monthNum);
    request.input('yearNum', sql.VarChar, yearNum);
    request.input('currency', sql.VarChar, currency);

    const result = await request.query(query);
    await sql.close();

    const row = result.recordset[0] || {};
    // Return the sum of availableBalance and principalAmount
    return (row.totalAvailableBalance || 0) + (row.totalPrincipalAmount || 0);
  } catch (error) {
    console.error('SQL error:', error);
    return 0;
  }
}

export async function getTotalTrustPortfolioPerCurrency(cifNumber, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        ISNULL((SELECT SUM(faceAmount) FROM TrustFixedIncome WHERE cifNumber = @cifNumber AND currency = @currency), 0) AS totalFixedIncome,
        ISNULL((SELECT SUM(purchaseAmount) FROM TrustEquities WHERE cifNumber = @cifNumber AND currency = @currency), 0) AS totalEquities,
        ISNULL((SELECT SUM(purchaseAmount) FROM TrustUitf WHERE cifNumber = @cifNumber AND currency = @currency), 0) AS totalUitf,
        ISNULL((SELECT SUM(principalAmount) FROM TrustDeposits WHERE cifNumber = @cifNumber AND currency = @currency), 0) AS totalDeposits
    `;
    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('currency', sql.VarChar, currency);
    const result = await request.query(query);
    await sql.close();

    const row = result.recordset[0] || {};

    // Sum all fields for the total
    return (
      (row.totalDeposits || 0) +
      (row.totalFixedIncome || 0) +
      (row.totalEquities || 0) +
      (row.totalUitf || 0)
    );
  } catch (error) {
    console.error('SQL error:', error);
    return 0;
  }
}

export async function getTotalCBSecMarketValue(cifNumber, currency) {
  try {
    await sql.connect(config);
    const query = `
      SELECT *
      FROM CBSecMapping
      WHERE accountCode IN (
        SELECT AccountNumber
        FROM AccountDataTables
        WHERE [Cif] = @Cif
      )
      AND accountType = @currency
    `;
      
    const request = new sql.Request();
    request.input('Cif', sql.VarChar, cifNumber);
    request.input('currency', sql.VarChar, currency);
    
    const result = await request.query(query);
    await sql.close();
      
    return result.recordset.reduce((acc, row) => acc + (row.marketValue || 0), 0);
  } catch (error) {
    console.error('SQL error: ', error);
    return 0;
  }
}

export async function getLatestCurrencyRates() {
  const rates = {};
  await sql.connect(config);

  const query = `
    SELECT currencyCode, rate
      FROM CurrencyExchangeRates r
      WHERE effectiveDate = (
        SELECT MAX(effectiveDate)
        FROM CurrencyExchangeRates r2
        WHERE r2.currencyCode = r.currencyCode
      )
  `;

  const request = new sql.Request();
  const result = await request.query(query);

  for (const row of result.recordset) {
    for (const [code, intCode] of Object.entries(currencyConfig)) {
      if (row.currencyCode === code) {
        rates[code] = row.rate;
        break;
      }
    }
  }
  return rates;
}