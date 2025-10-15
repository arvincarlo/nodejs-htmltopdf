import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 400;
const height = 400;
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  plugins: {
    modern: ['chartjs-plugin-datalabels']
  }
});

// Add this to show the labels
// plugins: {
//   modern: ['chartjs-plugin-datalabels']
// }

export async function generatePortfolioPieChart(pieChartData) {
  const labels = [
    'Money Market',
    'Fixed Income',
    'Equities',
    'Structured Products',
    'Unit Trusts',
  ];
  const values = [
    pieChartData.totalMoneyMarket || 0,
    pieChartData.totalFixedIncome || 0,
    pieChartData.totalEquities || 0,
    pieChartData.totalStructuredProducts || 0,
    pieChartData.totalTrustUitf || 0,
  ];
  const total = values.reduce((sum, val) => sum + val, 0);

  const configuration = {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: [
          '#ff7e91ff', // light pink
          '#FF6347', // tomato
          '#DC143C', // crimson
          '#B22222', // firebrick
          '#3f0b0bff', // dark red
        ],
        borderColor: '#000', // Add black border
        borderWidth: 2        // Set border width
      }]
    },
    options: {
      cutout: '35%',
      plugins: {
        legend: { position: 'bottom' },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 22 },
          formatter: (value, context) => {
            const percent = total ? Math.round((value / total) * 100) : 0;
            return `${percent}%`;
          }
        }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration, 'image/png');
  return `data:image/png;base64,${image.toString('base64')}`;
}

export async function generatePieChart(users) {
  // Count users per role
  const roleCounts = {};
  users.forEach(u => {
    roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
  });
  const labels = Object.keys(roleCounts);
  const data = Object.values(roleCounts);

  const total = pieChartData.reduce((sum, val) => sum + val, 0);

  const configuration = {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ['#d32f2f', '#1976d2', '#388e3c', '#fbc02d', '#7b1fa2', '#0288d1']
      }]
    },
    options: {
      plugins: {
        legend: { 
          position: "bottom",
          labels: {
            font: {
              size: 32,
              weight: 'bold'
            }
          }
        },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 22 }, // Make label bigger
          formatter: (value, context) => {
            const percent = total ? Math.round((value / total) * 100) : 0;
            return `${percent}%`;
          }
        }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration, 'image/png');
  return `data:image/png;base64,${image.toString('base64')}`;
}

export async function generateLineChart(users) {
  const roleCounts = {};
  users.forEach(u => {
    roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
  });
  const labels = Object.keys(roleCounts);
  const data = Object.values(roleCounts);

  const configuration = {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Number of Users',
        data,
        fill: false,
        borderColor: '#1976d2',
        backgroundColor: '#1976d2',
        tension: 0.3,
        pointBackgroundColor: '#d32f2f',
        pointBorderColor: '#fff',
        pointRadius: 5
      }]
    },
    options: {
      plugins: {
        legend: { display: true, position: 'top' },
        datalabels: {
          color: '#1976d2',
          font: {
            weight: 'bold',
            size: 14
          },
          anchor: 'end',
          align: 'top',
          formatter: (value) => value
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Role' }
        },
        y: {
          title: { display: true, text: 'User Count' },
          beginAtZero: true,
          precision: 0
        }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration, 'image/png');
  return `data:image/png;base64,${image.toString('base64')}`;
}