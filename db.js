// import sql from 'mssql';
// import dotenv from 'dotenv';
// dotenv.config();


// const config = {
//   server: process.env.DB_SERVER,
//   options: {
//     encrypt: process.env.DB_ENCRYPTION === 'true',
//     trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
//   },
//   authentication: {
//     type: process.env.DB_AUTH_TYPE,
//     options: {
//       userName: process.env.DB_USER,
//       password: process.env.DB_PASSWORD
//     }
//   }
// };


// export async function getRecords(query) {
//   try {
//     await sql.connect(config);
//     const result = await sql.query(query);
//     return result.recordset;
//   } catch (error) {
//     console.error('Error fetching records:', error);
//     throw error;
//   } finally {
//     await sql.close();
//   }
// }