import React, { useEffect, useState } from "react";
import { MdRestaurantMenu } from "react-icons/md";

function AddMenu() {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const [menuItem, setMenuItem] = useState("");
  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [lunchMenu, setLunchMenu] = useState([]);
  const [dinnerMenu, setDinnerMenu] = useState([]);
  const [currentDate] = useState(new Date());

  // useEffect(() => {
  //   setCurrentDate(new Date());
  // }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddMenuItem = () => {
    const newItem = menuItem.trim();

    if (newItem !== "") {
      switch (selectedCategory) {
        case "Breakfast":
          setBreakfastMenu([...breakfastMenu, newItem]);
          break;
        case "Lunch":
          setLunchMenu([...lunchMenu, newItem]);
          break;
        case "Dinner":
          setDinnerMenu([...dinnerMenu, newItem]);
          break;
        default:
          break;
      }
      setMenuItem("");
    }
  };

  const handleUpdateMenu = async () => {
    const menuData = {
      date: currentDate.toISOString(), // Ensure the date is in the right format
      breakfast: breakfastMenu,
      lunch: lunchMenu,
      dinner: dinnerMenu,
    };

    try {
      const response = await fetch("http://localhost:3001/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Menu updated successfully!");
        // You might want to clear the menu or navigate the admin to another page
      } else {
        alert(`Failed to update the menu: ${result.message}`);
      }
    } catch (error) {
      alert(`Error sending menu data: ${error}`);
    }
  };

  const handleClearMenu = () => {
    // Clear all menu items
    setBreakfastMenu([]);
    setLunchMenu([]);
    setDinnerMenu([]);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <MdRestaurantMenu className="text-4xl " />
        <h1 className="text-4xl font-bold">Add Menu</h1>
      </div>

      <div className="my-4">
        <label htmlFor="category" className="mr-2">
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded-md"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      <div className="flex space-x-4 my-4">
        <input
          type="text"
          placeholder="Enter Menu Item"
          value={menuItem}
          onChange={(e) => setMenuItem(e.target.value)}
          className="border p-2 rounded-md flex-grow"
        />
        <button
          onClick={handleAddMenuItem}
          className="bg-blackText text-white p-3 rounded-xl font-bold"
        >
          Add
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div
            className="bg-white p-4 rounded-md shadow-md font-bold "
            style={{ height: "300px", width: "250px", overflow: "auto" }}
          >
            <h2 className="text-2xl font-bold text-center text-[#3eadcc]">
              Breakfast
            </h2>
            <br />
            <ul>
              {breakfastMenu.map((item, index) => (
                <li key={index}>&#8226;{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div
            className="bg-white p-4 rounded-md shadow-md font-bold "
            style={{ height: "300px", width: "250px", overflow: "auto" }}
          >
            <h2 className="text-2xl font-bold text-center text-[#3eadcc]">
              Lunch
            </h2>
            <br />
            <ul>
              {lunchMenu.map((item, index) => (
                <li key={index}>&#8226;{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div
            className="bg-white p-4 rounded-md shadow-md font-bold"
            style={{ height: "300px", width: "250px", overflow: "auto" }}
          >
            <h2 className="text-2xl font-bold text-center text-[#3eadcc]">
              Dinner
            </h2>
            <br />
            <ul>
              {dinnerMenu.map((item, index) => (
                <li key={index}>&#8226;{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="my-4">
        <button
          onClick={handleUpdateMenu}
          className="bg-blackText font-bold text-white p-3 rounded-xl"
        >
          Update
        </button>
        <button
          onClick={handleClearMenu}
          className="bg-buttons font-bold text-white p-3 rounded-xl ml-4"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default AddMenu;
