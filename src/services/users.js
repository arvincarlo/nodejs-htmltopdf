
import sql from 'mssql/msnodesqlv8.js';

const config = {
  server: "(localdb)\\MSSQLLocalDB",
  database: "WealthAppDB1.0",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
}

export default async function getFcbsDepositsByCifNumber(cifNumber, month, year) {
  try {
    await sql.connect(config);
    const query = `
      SELECT SUM([currentBalance]) AS totalCurrentBalance
      FROM [FcbsDeposits]
      WHERE [cifNumber] = @cifNumber
        AND MONTH([dateCovered]) = @monthNum
        AND YEAR([dateCovered]) = @yearNum
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
    // Return the totalCurrentBalance value directly
    console.log(result);
    // return result.recordset || []; // recordset
    return result.recordset[0]?.totalCurrentBalance || 0;
  } catch (error) {
    console.error('SQL error:', error);
    return 0;
  }
}

