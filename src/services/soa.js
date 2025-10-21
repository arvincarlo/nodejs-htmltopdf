
import sql from 'mssql/msnodesqlv8.js';
import { currencyConfig } from '../constants/currency.js';
import config from '../config/db.js';


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


export async function getTransactionHistory(cifNumber, month, year, currency) {
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
      ${currency !== undefined ? 'AND [ccy] = @currency' : ''}
      AND MONTH([transDateValueDate]) = @monthNum
      AND YEAR([transDateValueDate]) = @yearNum;
    `;
    const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
    const yearNum = parseInt(year, 10);

    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    request.input('monthNum', sql.Int, monthNum);
    request.input('yearNum', sql.Int, yearNum);

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
      UNION
      SELECT DISTINCT [currency] FROM TrustFixedIncome
        WHERE [cifNumber] = @cifNumber
          AND MONTH([valueDate]) = @monthNum
          AND YEAR([valueDate]) = @yearNum
      UNION
      SELECT DISTINCT [currency] FROM TrustEquities
        WHERE [cifNumber] = @cifNumber
          AND MONTH([valueDate]) = @monthNum
          AND YEAR([valueDate]) = @yearNum
      UNION
      SELECT DISTINCT [currency] FROM TrustUitf
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

export async function getAllForexRates(month, year) {
  const rates = {};
  await sql.connect(config);

  // Build the first day of the month for filtering
  const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
  const yearNum = parseInt(year, 10);

  // Get the first and last day of the month
  const firstDay = `${yearNum}-${monthNum.toString().padStart(2, '0')}-01`;
  const lastDay = new Date(yearNum, monthNum, 0); // 0th day of next month = last day of this month
  const lastDayStr = `${yearNum}-${monthNum.toString().padStart(2, '0')}-${lastDay.getDate().toString().padStart(2, '0')}`;

  const query = `
    SELECT [FROM], [TO], [CONVERSIONRATE]
    FROM Forex
    WHERE [CURRENCY_CONVERSION_DATE] >= @firstDay
      AND [CURRENCY_CONVERSION_DATE] <= @lastDay
      AND [CURRENCY_CONVERSION_DATE] = (
        SELECT MAX([CURRENCY_CONVERSION_DATE])
        FROM Forex r2
        WHERE r2.[FROM] = Forex.[FROM]
          AND r2.[CURRENCY_CONVERSION_DATE] >= @firstDay
          AND r2.[CURRENCY_CONVERSION_DATE] <= @lastDay
      )
  `;

  const request = new sql.Request();
  request.input('firstDay', sql.Date, firstDay);
  request.input('lastDay', sql.Date, lastDayStr);
  const result = await request.query(query);

  for (const row of result.recordset) {
    rates[row.FROM] = row.CONVERSIONRATE;
  }
  return rates;
}