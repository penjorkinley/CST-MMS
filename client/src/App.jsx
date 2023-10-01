import "./App.css";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
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
import AddInventory from "./pages/AddInventory";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/addinventory" element={<AddInventory />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/adminfeedback" element={<AdminFeedback />} /> */}
          <Route path="/order" element={<MealOrder />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="viewfeedback" element={<AdminFeedback />} />
          </Route>
          <Route path="/aboutus" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

function Navigation() {
  // Import useLocation here
  const location = useLocation();

  // Check if the current route is not the landing page
  const shouldShowNav =
    location.pathname !== "/" && location.pathname !== "/admin";

  // Conditional rendering of RegularNav
  return shouldShowNav ? <RegularNav /> : null;
}

export default App;
