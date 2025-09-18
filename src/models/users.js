
import sql from 'mssql/msnodesqlv8.js';

const config = {
  server: "(localdb)\\MSSQLLocalDB",
  database: "WealthAppDB1.0",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
}

async function getUserModel(role) {
  await sql.connect(config);
  let query = "SELECT * FROM UserDetailsModel";
  if (role !== "all") {
    query += `WHERE role = ${role}`;
  }
  const request = new sql.Request();
  if (role !== "all") request.input('role', sql.VarChar, role);
  const result = await request.query(query);
  await sql.close();
  return result.recordset;
}

export default getUserModel
