import "./App.css";
import Footer from "./components/footer";
import RegularNav from "./components/RegularNav";
import AdminNavbar from "./components/adminNavbar";

function App() {
  return (
    <>
      <RegularNav/>
      <AdminNavbar/>
      
    
      <h1 className="text-3xl font-bold underline text-red-400">

        Hello world!
      </h1>
      <Footer/>
   
    </>
  );
}

export default App;
