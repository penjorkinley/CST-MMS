import { useState, useEffect } from "react";
import DoughnutChart from "../components/DoughnutChart";
import DashCards from "../components/DashCards";
import GradientLineGraph from "../components/GradientLineGraph";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";


function Dashboard() {
  const currentDate = new Date();

  const weekNumber = getWeekNumber(currentDate);

  function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

  const [orderCount, setOrderCount] = useState(undefined);
  const [studentCount, setStudentCount] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:3001/auth/placeOrder")
      .then((response) => response.json())
      .then((data) => {
        setOrderCount(data.count);
      })
      .catch((error) => {
        console.error("Error fetching order count: ", error);
      });
  }, []);

  // Fetch student count
  useEffect(() => {
    fetch("http://localhost:3001/auth/usercount")
      .then((response) => response.json())
      .then((data) => {
        setStudentCount(data.count);
      })
      .catch((error) => {
        console.error("Error fetching student count: ", error);
      });
  }, []);

  return (
    <div className="m-auto">
      <div className="flex items-center space-x-2 mb-5">
        <TbDeviceDesktopAnalytics className="text-5xl" />
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
    <div className="overflow-auto">
      <div className="grid grid-cols-3 gap-4 w-auto h-auto  mt-5">
        <DashCards
          title="Total Number of Students"
          count={studentCount !== undefined ? studentCount : "Loading..."}
          desc="20% more registrations"
        />
        <DashCards
          title="Todays Orders"
          count={orderCount !== undefined ? orderCount : "Loading..."}
          desc="students are coming for the meal"
        />
        <DoughnutChart />
      </div>
      <div className=" mt-8  w-[893px] h-[360px] bg-white text-black  shadow-md p-2 rounded-xl flex items-center justify-center flex-col">
        <h1 className="text-xl font-bold">
          Number of Meals Served in week {weekNumber}
        </h1>
        <GradientLineGraph />
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
