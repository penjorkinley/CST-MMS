
import './AboutUs.css';
import aboutusImg from "./client/src/assets/AboutUs.png";

function AboutUs() {
  return (
    <div style={{ backgroundColor: 'blue' }}>
      {<div className="flex">
      <div className="w-40">
        <img src={aboutusImg} alt="About Us Image" className="w-full" />
      </div>
      <div className="w-60 px-4">
        <h2>Mission</h2>
        <p>Our mission is...</p>

        <h2>Vision</h2>
        <p>Our vision is...</p>

        <h2>Team</h2>
        <ul>
          <li>Team Member 1</li>
          <li>Team Member 2</li>
          {/* Add more team members as needed */}
        </ul>
      </div>
    </div>}
    </div>
  );
}

export default AboutUs;