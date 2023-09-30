import Modal from "react-modal";
import { useState } from "react";
import MealCard from "../components/MenuCard";

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
      <div className=" flex justify-center items-center ">
        <div className="bg-white h-96 w-3/5 rounded-3xl ">
          <p className="mt-4 font-extrabold text-black text-4xl flex items-center justify-center">
            Todays Menu
          </p>
          <div className="flex justify-between items-center">
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
          <button className="bg-green-200 w-20 h-11 text-white font-semibold">
            Place Order
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Order Successful"
      >
        {orderSuccess ? (
          <div>
            <h2>Order Successful!</h2>
            <p>Your meal has been ordered.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        ) : (
          <p>Ordering...</p>
        )}
      </Modal>
    </div>
  );
}

export default MealOrder;
