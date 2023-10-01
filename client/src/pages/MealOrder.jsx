import Modal from "react-modal";
import { useState } from "react";
import MealCard from "../components/MenuCard";

// Define a custom CSS class for the modal overlay
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with a slight opacity
    backdropFilter: "blur(5px)", // Apply blur effect to the background
    zIndex: 1000, // Ensure that the overlay is above other content
  },
  content: {
    width: "80%", 
    maxWidth: "400px", 
    height: "150px", 
    maxHeight: "80vh", 
    margin: "auto", 
    padding: "20px", 
    borderRadius: "8px", 
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", 
  },
};

Modal.setAppElement("#root");

function MealOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrder = () => {
    // Simulate a successful order
    // You can replace this with your actual order logic (e.g., API calls)
    setTimeout(() => {
      setOrderSuccess(true);
      setIsModalOpen(true);
    }, 1000); // Simulating a 1-second delay for demonstration
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-[75vh]">
      <div className="flex justify-center items-center">
        <div className="bg-white h-96 w-3/5 rounded-3xl p-8 relative">
          <p className="mt-4 font-extrabold text-black text-4xl flex items-center justify-center">
            Todays Menu
          </p>
          <div className="flex justify-between items-center">
            {/* MealCard components */}
            <MealCard
              meal={"Breakfast"}
              time={"7:00AM - 8:00AM"}
              one={"Fried Rice"}
              two={"Ezzay"}
              three={"Tea"}
            />
            <MealCard
              meal={"Lunch"}
              time={"11:30AM - 1:00PM"}
              one={"Rice"}
              two={"Kewa Datsi"}
              three={"Lentils Soup"}
            />
            <MealCard
              meal={"Dinner"}
              time={"7:00PM - 8:00PM"}
              one={"Rice"}
              two={"Chicken Chilli"}
              three={"Lentils Soup"}
            />
          </div>
          <button
            onClick={handleOrder}
            className="bg-emerald-500 w-[120px] h-11 mr-9 px-4 py-2 rounded-md text-white font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Order Successful"
        style={customStyles} // Apply custom styles to the Modal
      >
        {orderSuccess ? (
          <div className="text-center">
            <h2>Order Successful!</h2>
            <div className="checkmark">
              <div className="checkmark_circle"></div>
              <div className="checkmark_stem"></div>
              <div className="checkmark_kick"></div>
            </div>
            <p>Your meal has been ordered.</p>
            <button
              onClick={closeModal}
              className="bg-emerald-500 mt-4 px-4 py-2 rounded-md text-white font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <p>Ordering...</p>
        )}
      </Modal>
    </div>
  );
}

export default MealOrder;
