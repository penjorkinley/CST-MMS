import Modal from "react-modal";
import { useState, useRef } from "react";
import MealCard from "../components/MenuCard";
import html2canvas from "html2canvas"; // Import html2canvas library

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 1000,
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
  const modalRef = useRef(null); // Create a ref for the Modal content

  const handleOrder = () => {
    setTimeout(() => {
      setOrderSuccess(true);
      setIsModalOpen(true);
    }, 1000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Capture the Modal content as an image using html2canvas
    html2canvas(modalRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png");

      // Create a link element to download the image
      const downloadLink = document.createElement("a");
      downloadLink.href = image;
      downloadLink.download = "meal_order.png";
      downloadLink.click();
    });
  };

  return (
    <div className="h-[75vh]">
      <div className="flex justify-center items-center">
        <div
          className="bg-white h-96 w-3/5 rounded-3xl p-8 relative"
          ref={modalRef}
        >
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
        style={customStyles}
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
              onClick={handleSave}
              className="bg-emerald-500 mt-4 mr-2 px-4 py-2 rounded-md text-white font-semibold"
            >
              Save
            </button>
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
