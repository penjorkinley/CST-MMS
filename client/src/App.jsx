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

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/order" element={<MealOrder />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="viewfeedback" element={<AdminFeedback />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="addmenu" element={<AddMenu />} />
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
    location.pathname !== "/" &&
    location.pathname !== "/admin" &&
    location.pathname !== "/admin/viewfeedback" &&
    location.pathname !== "/admin/adduser" &&
    location.pathname !== "/admin/addmenu";

  // Conditional rendering of RegularNav
  return shouldShowNav ? <RegularNav /> : null;
}

export default App;
