import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)
const options =
{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },  
         
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
      },
     
};

function VerticalBar({ data }) {
    return (
        <Bar options={options} data={data}/>
    )
}

export default VerticalBar