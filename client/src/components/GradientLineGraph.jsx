import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //xasxi
  LinearScale, //yaxis
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);





const GradientLineGraph = () => {

  const data = {
    labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri','Sat', 'Sun'],
    datasets: [{
        label: '',
        data: [107,69,78,99,47,50,62],
        backgroundColor: 'aqua',
        borderColor: 'black',
        pointBorderColor: '#61BDD5',
        fill: true,
        tension: 0.4
    }]
  }  

  const options = {
    plugins: {
        legend: false
    },
    scales: {
        y: {
            // min: 3,
            // max: 6
        }
    }
  }

  return <div className="w-[500px] h-[300px] p-5">
    <Line
    data={data}
    options={options}
    ></Line>
  </div>;
};

export default GradientLineGraph;
