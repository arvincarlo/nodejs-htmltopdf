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

export async function generatePieChart(users) {
  // Count roles
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
          font: {
            weight: 'bold',
            size: 16
          },
          formatter: (value) => value
        }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration, 'image/png');
  return `data:image/png;base64,${image.toString('base64')}`;
}