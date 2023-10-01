import AboutUsImg from "../assets/AboutUs.png";

function MyComponent() {
  return (
    <div className="bg-background mx-auto px-20 flex justify-center h-[100vh] overflow-hidden">
      <div className="flex pt-10">
        <div className="w-1/3">
          <img src={AboutUsImg} alt="About Us Image" className="w-5/6" />
        </div>
        <div className="w-2/3 px-4 text-black ">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="mb-4">
            Welcome to our Mess Management System! We are dedicated to
            revolutionizing the dining experience on campus, making it more
            convenient and enjoyable for students and cafeteria staff alike. Our
            goal is to provide a seamless and efficient process for meal
            selection, order processing, and feedback collection. By leveraging
            cutting-edge technology, we aim to create a dining experience that
            meets the diverse preferences and dietary needs of our students.
          </p>
          <h2 className="text-2xl font-bold mb-2">Mission</h2>
          <p className="mb-4">
            At College of Science and Technology, our mission is to provide a
            seamless dining experience that caters to the diverse preferences
            and dietary needs of our students. We aim to achieve this by
            leveraging cutting-edge technology to streamline menu selection,
            order processing, and feedback collection.
          </p>

          <h2 className="text-2xl font-bold mb-2">Vision</h2>
          <p className="mb-4">
            We envision a campus where students can easily access nutritious and
            delicious meals, tailored to their individual tastes, all while
            ensuring efficient resource allocation and financial transparency
            for the Mess.
          </p>

          <h2 className="text-2xl font-bold mb-2">Meet Our Team</h2>
          <p className="mb-4">
            Our team is comprised of passionate individuals with a shared
            commitment to enhancing the dining experience at College of Science
            and Technology. Together, we bring a diverse range of skills and
            expertise to ensure the success of healthy and hygenic Mess.
          </p>
          <ul>
            <li>Chimi Dema</li>
            <li>Purna Badur</li>
            <li>Mess Uncle 1</li>
            <li>Mess Uncle 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
