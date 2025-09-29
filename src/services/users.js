
import sql from 'mssql/msnodesqlv8.js';

const config = {
  server: "(localdb)\\MSSQLLocalDB",
  database: "WealthAppDB1.0",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
}

export async function getFcbsDepositsByCifNumber(cifNumber, month, year) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        ISNULL(SUM(fd.[availableBalance]), 0) AS totalAvailableBalance,
        (
          SELECT ISNULL(SUM([principalAmount]), 0)
          FROM [FcbsTimeDeposits]
          WHERE [cifNumber] = @cifNumber
        ) AS totalPrincipalAmount
      FROM [FcbsDeposits] fd
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
    console.log(result);
    await sql.close();

    // Return the totalCurrentBalance value directly
    // return result.recordset || []; // recordset
    // return result.recordset[0]?.totalAvailableBalance || 0;

    const row = result.recordset[0] || {};
    // Return the sum of availableBalance and principalAmount
    return (row.totalAvailableBalance || 0) + (row.totalPrincipalAmount || 0);
  } catch (error) {
    console.error('SQL error:', error);
    return 0;
  }
}

/**
 * Get the sum of TrustFixedIncome.faceAmount, TrustEquities.purchaseAmount, and TrustUitf.purchaseAmount for a given cifNumber.
 * @param {string} cifNumber
 * @returns {Promise<number>} The total sum
 */
export async function getTotalTrustPortfolio(cifNumber) {
  try {
    await sql.connect(config);
    const query = `
      SELECT
        ISNULL(SUM(tfi.faceAmount), 0) AS totalFixedIncome,
        ISNULL(SUM(teq.purchaseAmount), 0) AS totalEquities,
        ISNULL(SUM(tuitf.purchaseAmount), 0) AS totalUitf
      FROM TrustFixedIncome tfi
      LEFT JOIN TrustEquities teq ON teq.cifNumber = tfi.cifNumber
      LEFT JOIN TrustUitf tuitf ON tuitf.cifNumber = tfi.cifNumber
      WHERE tfi.cifNumber = @cifNumber
        OR teq.cifNumber = @cifNumber
        OR tuitf.cifNumber = @cifNumber
    `;
    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    const result = await request.query(query);
    await sql.close();

    const row = result.recordset[0] || {};
    // Sum all three fields for the total
    return (row.totalFixedIncome || 0) + (row.totalEquities || 0) + (row.totalUitf || 0);
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
      FROM [CBSecMapping]
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
