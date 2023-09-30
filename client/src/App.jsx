import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch is removed and Routes is imported
import About from "./pages/AboutUs";
import Footer from "./components/footer";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import RegularNav from "./components/RegularNav";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/landingPage";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";

function App() {
  return (
    <div className="App">
      <Router>
        <RegularNav />
        <Routes>
          <Route path="/adminfeedback" element={<AdminFeedback />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
