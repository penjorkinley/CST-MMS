import "./App.css";
import Footer from "./components/Footer";
import LandingPage from "./pages/landingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import LogIn from "./pages/LogIn";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
