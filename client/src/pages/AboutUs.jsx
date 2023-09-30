import React from 'react';
import './AboutUs.css';

function MyComponent() {
  return (
    <div className="flex bg-F0F7F9">
      <div className="w-40">
        <img src={AboutUsImg} alt="About Us Image" className="w-full" />
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
    </div>
  );
}

export default MyComponent;