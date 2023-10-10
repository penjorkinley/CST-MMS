import React, { useState } from 'react';

function AddMenu() {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [menuItem, setMenuItem] = useState('');
  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [lunchMenu, setLunchMenu] = useState([]);
  const [dinnerMenu, setDinnerMenu] = useState([]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddMenuItem = () => {
    const newItem = menuItem.trim();

    if (newItem !== '') {
      switch (selectedCategory) {
        case 'Breakfast':
          setBreakfastMenu([...breakfastMenu, newItem]);
          break;
        case 'Lunch':
          setLunchMenu([...lunchMenu, newItem]);
          break;
        case 'Dinner':
          setDinnerMenu([...dinnerMenu, newItem]);
          break;
        default:
          break;
      }
      setMenuItem('');
    }
  };

  const handleUpdateMenu = () => {
    // Handle updating menus here
    console.log('Breakfast Menu:', breakfastMenu);
    console.log('Lunch Menu:', lunchMenu);
    console.log('Dinner Menu:', dinnerMenu);
  };

  const handleClearMenu = () => {
    // Clear all menu items
    setBreakfastMenu([]);
    setLunchMenu([]);
    setDinnerMenu([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Add Menu Item</h1>

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
          className="bg-black text-white p-3 rounded-xl font-bold"
        >
          Add
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="bg-white p-4 rounded-md shadow-md font-bold " style={{ height: '300px', width: '250px', overflow: 'auto' }}>
            <h2 className="text-xl font-bold text-center">Breakfast</h2><br/>
            <ul>
              {breakfastMenu.map((item, index) => (
                <li key={index}>&#8226;{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white p-4 rounded-md shadow-md font-bold " style={{ height: '300px', width: '250px', overflow: 'auto' }}>
            <h2 className="text-xl font-bold text-center">Lunch</h2><br/>
            <ul>
              {lunchMenu.map((item, index) => (
                <li key={index}>&#8226;{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white p-4 rounded-md shadow-md font-bold" style={{ height: '300px', width: '250px', overflow: 'auto' }}>
            <h2 className="text-xl font-bold text-center ">Dinner</h2><br/>
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
          className="bg-black font-bold text-white p-3 rounded-xl"
        >
          Update
        </button>
        <button
          onClick={handleClearMenu}
          className="bg-black font-bold text-white p-3 rounded-xl ml-4"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default AddMenu;
