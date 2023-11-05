import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import MealCard from "../components/MenuCard";
import html2canvas from "html2canvas"; // Import html2canvas library
import land from "../assets/Menu-Background.png"; // Replace 'your-image-path.jpg' with the actual path to your image

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
    maxHeight: "100vh",
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
  const [menu, setMenu] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef(null); // Create a ref for the Modal content

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.breakfast && data.lunch && data.dinner) {
          setMenu(data);
        } else {
          setError("Menu data is empty or not in expected format.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

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
      closeModal();
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center h-[83vh] relative overflow-hidden">
      <img
        src={land}
        className="absolute w-4/5 h-full object-cover"
        alt="background"
      />
      <div
        className="rounded-3xl w-3/5  p-8 shadow-2xl border-[1px] border-gray-300 relative"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(1px)",
        }}
        ref={modalRef}
      >
        <p className="mt-4 font-extrabold text-black text-4xl flex items-center justify-center mb-4">
          Todays Menu
        </p>
        <div className="flex justify-between items-center mb-6">
          <MealCard
            meal={"Breakfast"}
            time={"7:00AM - 8:00AM"}
            one={menu.breakfast?.[0]} // Use optional chaining to avoid errors if the array is empty
            two={menu.breakfast?.[1]}
            three={menu.breakfast?.[2]}
            four={menu.breakfast?.[3]}
            five={menu.breakfast?.[4]}
          />
          <MealCard
            meal={"Lunch"}
            time={"11:30AM - 1:00PM"}
            one={menu.lunch?.[0]}
            two={menu.lunch?.[1]}
            three={menu.lunch?.[2]}
            four={menu.lunch?.[3]}
            five={menu.lunch?.[4]}
          />
          <MealCard
            meal={"Dinner"}
            time={"7:00PM - 8:00PM"}
            one={menu.dinner?.[0]}
            two={menu.dinner?.[1]}
            three={menu.dinner?.[2]}
            four={menu.dinner?.[3]}
            five={menu.dinner?.[4]}
          />
        </div>
        <button
          onClick={handleOrder}
          className="bg-emerald-500 w-[120px] h-11 px-4 py-2 rounded-md text-white font-semibold ml-4 hover:bg-black"
        >
          Place Order
        </button>
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
              className="bg-emerald-500 mt-4 mr-2 px-4 py-2 rounded-md text-white font-semibold hover:bg-black"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-emerald-500 mt-4 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-500"
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
