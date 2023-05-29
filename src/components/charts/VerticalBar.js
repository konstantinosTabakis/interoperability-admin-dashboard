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
        // labels: {
        //     render: 'label',
        //     fontColor: '#3b3b3b',
        //     fontSize: 18,
        //     fontStyle: 'bold'
        //   }
    },
    scales: {
        x: {
          grid: {
            display: true
          },
          ticks: {
            color: '#3b3b3b', // Customize the label font color
            font: {
              size: 14, // Customize the label font size
              weight: 'bold' // Customize the label font weight
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