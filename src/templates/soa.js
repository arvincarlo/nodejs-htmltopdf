const soaTemplate = (users, pieChart, lineChart) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Statement of Account - China Bank</title>
    <style>
      body {
        font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
        margin: 0;
        background: #f2f4f8;
        color: #222;
      }
      .container {
        max-width: 1400px;
        margin: 40px auto;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 6px 32px rgba(44,62,80,0.12);
        padding: 48px 56px;
      }
      .header {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #1a237e;
        padding-bottom: 28px;
        margin-bottom: 36px;
      }
      .logo {
        width: 80px;
        height: 80px;
        background: #1a237e;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 36px;
        font-weight: bold;
        margin-right: 28px;
        box-shadow: 0 2px 12px #e3e3e3;
        letter-spacing: 2px;
      }
      .bank-info {
        font-size: 2.2em;
        color: #1a237e;
        font-weight: 700;
        letter-spacing: 2px;
      }
      .report-title {
        font-size: 1.5em;
        color: #222;
        margin-bottom: 10px;
        font-weight: 700;
        letter-spacing: 1px;
      }
      .date {
        color: #555;
        font-size: 1em;
        margin-bottom: 28px;
        font-weight: 500;
      }
      .main-content {
        display: flex;
        flex-direction: row;
        gap: 40px;
        align-items: flex-start;
        justify-content: center;
      }
      .chart-container {
        min-width: 420px;
        min-height: 420px;
        background: #f8fafc;
        border-radius: 10px;
        box-shadow: 0 2px 12px #e3e3e3;
        padding: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .chart-container img {
        display: block;
        width: 420px;
        height: 420px;
        object-fit: contain;
      }
      .table-container {
        flex: 1;
        background: #f8fafc;
        border-radius: 10px;
        box-shadow: 0 2px 12px #e3e3e3;
        padding: 28px;
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: none;
      }
      th, td {
        padding: 16px 14px;
        text-align: left;
        font-size: 1em;
      }
      th {
        background: #1a237e;
        color: #fff;
        font-weight: 700;
        border-bottom: 2px solid #fff;
        letter-spacing: 1px;
      }
      tr {
        border-bottom: 1px solid #e0e0e0;
      }
      tr:last-child {
        border-bottom: none;
      }
      tr:nth-child(even) {
        background: #f4f6f8;
      }
      tr:hover {
        background: #e3eafc;
      }
      .footer {
        margin-top: 48px;
        text-align: center;
        color: #555;
        font-size: 1em;
        font-weight: 500;
        letter-spacing: 1px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">CB</div>
        <div class="bank-info">Chinabank Corporation</div>
      </div>
      <div class="report-title">Statement of Account Report</div>
      <div class="date">Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>
      <div class="main-content">
        <div class="chart-container">
          <img src="${pieChart}" width="420" height="420" />
        </div>
        <div class="table-container">
          <div class="chart-container">
            <img src="${lineChart}" width="420" height="420" />
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Statement</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(user => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.fullName}</td>
                  <td>${user.role}</td>
                  <td>${user.status}</td>
                  <td>${user.emailAddress}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="footer">
        This is a confidential, system-generated Statement of Account.<br>
        &copy; ${new Date().getFullYear()} Chinabank Corporation. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;

export default soaTemplate;