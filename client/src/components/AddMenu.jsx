import React, { useState, useEffect } from "react";

function AddMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState("");
  const [selectedMealTime, setSelectedMealTime] = useState("breakfast");

  useEffect(() => {
    // Fetch menu items from your database/API and update the state
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleAddMenuItem = async () => {
    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealTime: selectedMealTime,
          name: newMenuItem,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMenuItems([...menuItems, data]);
      setNewMenuItem("");
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add Menu Item</h2>
      <div className="flex items-center space-x-2">
        <select
          value={selectedMealTime}
          onChange={(e) => setSelectedMealTime(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <input
          type="text"
          value={newMenuItem}
          onChange={(e) => setNewMenuItem(e.target.value)}
          placeholder="Enter menu item"
          className="border p-2 rounded flex-grow"
        />
        <button
          onClick={handleAddMenuItem}
          className="bg-black w-[60px] text-white font-semibold p-2 rounded hover:bg-buttons hover:text-black"
        >
          Add
        </button>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="border-b p-2 flex items-center justify-between"
          >
            <span>{item.name}</span>
            <span className="text-gray-500">({item.mealTime})</span>
            <button
              onClick={() => handleDeleteMenuItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddMenu;
