import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: true
      },
      ticks: {
        color: '#3b3b3b',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    y: {
      grid: {
        display: true
      },
      beginAtZero: true
    }
  }
};


function LineChart({data}) {
    return (
        <Line options={options} data={data} />
    )
}

export default LineChart