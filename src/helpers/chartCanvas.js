import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 400;
const height = 400;
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
});

// Add this to show the labels
// plugins: {
//   modern: ['chartjs-plugin-datalabels']
// }

export async function generatePieChart(users) {
  // Count users per role
  const roleCounts = {};
  users.forEach(u => {
    roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
  });
  const labels = Object.keys(roleCounts);
  const data = Object.values(roleCounts);

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
        legend: { position: 'bottom' },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 16 },
          formatter: (value) => value
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