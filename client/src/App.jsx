import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch is removed and Routes is imported
import About from "./pages/AboutUs";
import Footer from "./components/footer";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
