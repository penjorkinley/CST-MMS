import AdminTopNavbar from "../components/AdminTopNavbar";
import AdminNavbar from "../components/AdminNavbar";
import Dashboard from "../components/Dashboard";
import AddMenu from "../components/AddMenu";
import DailyAttendance from "../components/DailyAttendance";
import AddUser from "../components/AddUser";
import ViewFeedback from "../components/ViewFeedback";
import { Routes, Route } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <AdminNavbar />
      </div>

      <div className="w-5/6">
        <AdminTopNavbar />
        <div className="p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addmenu" element={<AddMenu />} />
            <Route path="/dailyattendent" element={<DailyAttendance />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/viewfeedback" element={<ViewFeedback />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
