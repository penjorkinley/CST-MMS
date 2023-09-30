import React from "react";

import AboutUsImg from "../assets/AboutUs.png";

function MyComponent() {
  return (
    <div className="flex">
      <div className="w-1/3">
        <img src={AboutUsImg} alt="About Us Image" className="w-full" />
      </div>
      <div className="w-2/3 px-4">
        <h1>About Us</h1>
        <p>
          Welcome to our Mess Management System! We are dedicated to
          revolutionizing the dining experience on campus, making it more
          convenient and enjoyable for students and cafeteria staff alike.
        </p>
        <h2>Mission</h2>
        <p>
          At College of Science and Technology, our mission is to provide a
          seamless dining experience that caters to the diverse preferences and
          dietary needs of our students. We aim to achieve this by leveraging
          cutting-edge technology to streamline menu selection, order
          processing, and feedback collection.
        </p>

        <h2>Vision</h2>
        <p>
          We envision a campus where students can easily access nutritious and
          delicious meals, tailored to their individual tastes, all while
          ensuring efficient resource allocation and financial transparency for
          the Mess.
        </p>

        <h2>Meet Our Team</h2>
        <p>
          Our team is comprised of passionate individuals with a shared
          commitment to enhancing the dining experience at College of Science
          and Technology. Together, we bring a diverse range of skills and
          expertise to ensure the success of this project.
        </p>
        <ul>
          <li>Chimi Dema</li>
          <li>Purna Badur</li>
          <li>Mess Uncle 1</li>
          <li>Mess Uncle 2</li>
        </ul>
      </div>
    </div>
  );
}

export default MyComponent;
