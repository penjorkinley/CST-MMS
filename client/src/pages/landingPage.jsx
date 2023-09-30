
import land from "../assets/Menu-Background.png";
import logo from "../assets/Logo.PNG"
function LandingPage() {
  return (
    <div className="relative h-screen bg-cute">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={land}
          className="h-screen bg-center bg-cover"
          alt="image please sho"
        />
      </div>
      <div className="z-10 flex justify-between items-center h-50 bg-transparent w-full pr-8">
          <img src={logo} alt="logo" className="h-32 w-34"/>
          <button className="bg-btn h-11 w-40 rounded-md text-white font-semibold">Get Meal</button>
        </div>
    </div>
  );
}

export default LandingPage
