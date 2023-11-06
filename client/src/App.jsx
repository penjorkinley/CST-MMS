import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/AboutUs";
import Footer from "./components/footer";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import RegularNav from "./components/RegularNav";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/landingPage";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";
import { useLocation } from "react-router-dom";
import MealOrder from "./pages/MealOrder";
import AddUser from "./pages/AddUser";
import AddMenu from "./components/AddMenu";
import AddInventory from "./pages/AddInventory";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Bill from "./pages/Bill";
import NotFound from "./pages/notFound";
import { useMemo } from "react";

function App() {
  return (
    <AuthProvider>
      <div
        className="App"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Router>
          <Navigation />
          
          <div style={{ flex: 1 }}>
            {" "}
            {/* This div will grow to take up all available space */}
            <Routes>
              <Route path="/order" element={<MealOrder />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/admin" element={<AdminDashboard />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="viewfeedback" element={<AdminFeedback />} />
                <Route path="adduser" element={<AddUser />} />
                <Route path="addmenu" element={<AddMenu />} />
                <Route path="inventory" element={<AddInventory />} />
                <Route path="bill" element={<Bill />} />
              </Route>
              <Route path="/aboutus" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

function Navigation() {
  const location = useLocation();

  const shouldShowNav = useMemo(() => {
    return !(
      location.pathname === "/" ||
      location.pathname === "/admin" ||
      location.pathname === "/admin/viewfeedback" ||
      location.pathname === "/admin/adduser" ||
      location.pathname === "/admin/addmenu" ||
      location.pathname === "/admin/inventory" ||
      location.pathname === "/admin/bill" ||
      location.pathname === "*"
    );
  }, [location]);

  return shouldShowNav ? <RegularNav /> : null;
}

export default App;
