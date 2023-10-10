import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
Chart.defaults.plugins.legend.position = "right";
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.text = "Meal preferences";
Chart.defaults.plugins.legend.title.font = "Helvetica Neue";

const data = {
  labels: ["Chicken", "Paneer", "Pork"],
  datasets: [
    {
      data: [60, 30, 10],
      backgroundColor: ["#83CDDD", "rgb(204, 223, 243)", "#F0F7F9"],
      borderWidth: 1,
      radius: "100%",
    },
  ],
};

function DoughnutChart() {
  return (
    <div>
      <div className="bg-white text-black w-72 h-52 shadow-md p-2 rounded-xl">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default DoughnutChart;
