const chartImageBase64 = 'data:image/png;base64,...';

const soaTemplate = (users, chartImageBase64) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Statement of Account - China Bank</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        margin: 0;
        background: #f4f6f8;
        color: #222;
      }
      .container {
        max-width: 900px;
        margin: 40px auto;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(44,62,80,0.08);
        padding: 40px 48px;
      }
      .header {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #d32f2f;
        padding-bottom: 24px;
        margin-bottom: 32px;
      }
      .logo {
        width: 70px;
        height: 70px;
        background: #d32f2f;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 32px;
        font-weight: bold;
        margin-right: 24px;
        box-shadow: 0 2px 8px #eee;
      }
      .bank-info {
        font-size: 2em;
        color: #d32f2f;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .report-title {
        font-size: 1.3em;
        color: #222;
        margin-bottom: 8px;
        font-weight: 600;
      }
      .date {
        color: #888;
        font-size: 0.95em;
        margin-bottom: 24px;
      }
      .chart-container {
        width: 400px;
        height: 400px;
        margin: 32px auto;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px #eee;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 16px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px #eee;
      }
      th, td {
        padding: 14px 12px;
        text-align: left;
      }
      th {
        background: #d32f2f;
        color: #fff;
        font-weight: 600;
        border-bottom: 2px solid #fff;
      }
      tr {
        border-bottom: 1px solid #f0f0f0;
      }
      tr:last-child {
        border-bottom: none;
      }
      tr:nth-child(even) {
        background: #f9f9f9;
      }
      tr:hover {
        background: #ffeaea;
      }
      .footer {
        margin-top: 40px;
        text-align: center;
        color: #888;
        font-size: 0.95em;
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
      <div class="date">Generated: ${new Date().toLocaleDateString()}</div>
      <div class="chart-container">
        <img src="${chartImageBase64}" width="400" height="400" />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Bank Statement</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.role}</td>
              <td>${user.bankStatement}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="footer">
        This is a system-generated Statement of Account.<br>
        &copy; ${new Date().getFullYear()} China Bank. All rights reserved.
      </div>
    </div>
    <script>
      // Prepare role data for pie chart
      const users = ${JSON.stringify(users)};
      const roleCounts = {};
      users.forEach(u => {
        roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
      });
      const labels = Object.keys(roleCounts);
      const data = Object.values(roleCounts);

      new Chart(document.getElementById('rolePieChart').getContext('2d'), {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: ['#d32f2f', '#1976d2', '#388e3c', '#fbc02d', '#7b1fa2', '#0288d1']
          }]
        },
        options: {
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    </script>
  </body>
</html>
`;

export default soaTemplate;