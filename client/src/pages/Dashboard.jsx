import DoughnutChart from "../components/DoughnutChart";
import Students from "../components/Students";

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4 w-auto h-auto mr-auto ml-auto">
      <Students />
      <DoughnutChart />
      <DoughnutChart />
    </div>
  );
}

export default Dashboard;
