
import sql from 'mssql/msnodesqlv8.js';

const config = {
  server: "(localdb)\\MSSQLLocalDB",
  database: "WealthAppDB1.0",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
}

export default async function getFcbsDepositsByCifNumber(cifNumber) {
  try {
    await sql.connect(config);
    const query = `
      SELECT SUM([currentBalance]) AS totalCurrentBalance
      FROM [FcbsDeposits]
      WHERE [cifNumber] = @cifNumber
    `;
    const request = new sql.Request();
    request.input('cifNumber', sql.VarChar, cifNumber);
    const result = await request.query(query);
    await sql.close();
    // Return the totalCurrentBalance value directly
    return result.recordset[0]?.totalCurrentBalance || 0;
  } catch (error) {
    console.error('SQL error:', error);
    return 0;
  }
}

