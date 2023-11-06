import React, { useState, useEffect } from "react";
import { MdOutlineInventory } from "react-icons/md";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

function AddInventory() {
  const [inventoryName, setInventoryName] = useState("");
  const [storeType, setStoreType] = useState("Essentials");
  const [quantity, setQuantity] = useState("");
  const [singlePrice, setSinglePrice] = useState("");
  const [essentialsData, setEssentialsData] = useState([]);
  const [vesselsData, setVesselsData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    //fetch Essentials data
    fetch("http://localhost:3001/inventory/essentials")
      .then((response) => response.json())
      .then((data) => setEssentialsData(data));

    // Fetch Vessels data
    fetch("http://localhost:3001/inventory/vessels")
      .then((response) => response.json())
      .then((data) => setVesselsData(data));
  }, []);

  const handleAddInventory = () => {
    const newItem = {
      date: new Date().toLocaleDateString(),
      inventoryName,
      quantity,
      singlePrice,
      subtotal: quantity * singlePrice,
    };

    fetch(`http://localhost:3001/inventory/${storeType.toLowerCase()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (response.ok) {
          // If the response status code is successful, then return the response JSON
          return response.json();
        } else {
          // If the response status code is not successful, throw an error
          throw new Error("Something went wrong while adding the inventory.");
        }
      })
      .then((data) => {
        // Handling the successful response here
        if (storeType === "Essentials") {
          setEssentialsData([...essentialsData, data]);
        } else if (storeType === "Vessels") {
          setVesselsData([...vesselsData, data]);
        }
        // Alert success message
        alert("Inventory added successfully!");
      })
      .catch((error) => {
        // Handle any errors here
        alert(error.message);
      });

    // Reset the form fields
    setInventoryName("");
    setQuantity("");
    setSinglePrice("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index) => {
    // Determine the correct array based on the store type
    const dataArray = storeType === "Essentials" ? essentialsData : vesselsData;
    const item = dataArray[index];

    // Create an object with the updated data
    const updatedItem = {
      ...item,
      inventoryName: inventoryName,
      quantity: quantity,
      singlePrice: singlePrice,
      subtotal: quantity * singlePrice,
    };

    // Make an API call to update the item in the backend
    fetch(
      `http://localhost:3001/inventory/${storeType.toLowerCase()}/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      }
    )
      .then((response) => response.json())
      .then((updatedItemFromServer) => {
        // Update the state with the new data returned from the server
        const updatedData = dataArray.map((data, idx) =>
          idx === index ? updatedItemFromServer : data
        );

        if (storeType === "Essentials") {
          setEssentialsData(updatedData);
        } else if (storeType === "Vessels") {
          setVesselsData(updatedData);
        }

        // Reset edit index and form fields
        setEditIndex(null);
        setInventoryName("");
        setQuantity("");
        setSinglePrice("");

        alert("Inventory updated successfully!");
      })
      .catch((error) => {
        // Handle any errors here
        alert(
          "An error occurred while updating the inventory: " + error.message
        );
      });
  };

  const handleDelete = (index) => {
    // Determine the correct array and item ID based on the store type
    const dataArray = storeType === "Essentials" ? essentialsData : vesselsData;
    const itemId = dataArray[index]._id;

    // Log the item ID to the console
    console.log("Item ID to be deleted:", itemId);

    // Ask for confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inventory item?"
    );

    if (confirmDelete) {
      // Make an API call to delete the item from the backend
      fetch(
        `http://localhost:3001/inventory/${storeType.toLowerCase()}/${itemId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Filter out the deleted item from the state
          const updatedData = dataArray.filter((_, idx) => idx !== index);

          if (storeType === "Essentials") {
            setEssentialsData(updatedData);
          } else if (storeType === "Vessels") {
            setVesselsData(updatedData);
          }

          alert("Inventory deleted successfully!");
        })
        .catch((error) => {
          // Handle any errors here
          alert(
            "An error occurred while deleting the inventory: " + error.message
          );
        });
    }
  };

  const generatePDF = (inventoryType) => {
    const doc = new jsPDF();

    const tableData = [
      ["Date", "Inventory Name", "Quantity", "Single Price", "Sub Total"],
      ...(inventoryType === "Essentials"
        ? essentialsData.map((item) => [
            item.date,
            item.inventoryName,
            item.quantity,
            item.singlePrice,
            item.subtotal,
          ])
        : vesselsData.map((item) => [
            item.date,
            item.inventoryName,
            item.quantity,
            item.singlePrice,
            item.subtotal,
          ])),
    ];

    doc.text(`Inventory Management (${inventoryType})`, 10, 10);

    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 20,
      theme: "grid",
    });

    doc.save(`inventory_${inventoryType.toLowerCase()}.pdf`);
  };

  return (
    <div className="flex-row  items-center ">
      <div className="flex items-center space-x-2 mb-5">
        <MdOutlineInventory className="text-5xl" />
        <h1 className="text-4xl font-bold">Inventory Management</h1>
      </div>
      <div className="p-4 shadow-2xl bg-cute">
        <div className="mt-4 ">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Inventory Name"
              value={inventoryName}
              onChange={(e) => setInventoryName(e.target.value)}
              className="border p-2 rounded-md w-1/4"
            />
            <select
              value={storeType}
              onChange={(e) => setStoreType(e.target.value)}
              className="border p-2 rounded-md w-1/4"
            >
              <option value="Essentials">Essentials</option>
              <option value="Vessels">Vessels</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded-md w-1/4"
            />
            <input
              type="number"
              placeholder="Single Price"
              value={singlePrice}
              onChange={(e) => setSinglePrice(e.target.value)}
              className="border p-2 rounded-md w-1/4"
            />
            {editIndex === null ? (
              <button
                onClick={handleAddInventory}
                className="bg-blackText text-white p-2 rounded-xl"
              >
                Add Inventory
              </button>
            ) : (
              <button
                onClick={() => handleSave(editIndex)}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Save
              </button>
            )}
          </div>
        </div>

        {storeType === "Essentials" && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold pl-96">
              Essentials Inventory
            </h2>
            <table className="w-full mt-4 border-collapse border border-gray-400 bg-white shadow-xl">
              <thead>
                <tr>
                  <th className="border border-gray-400">Date</th>
                  <th className="border border-gray-400">Inventory Name</th>
                  <th className="border border-gray-400">Quantity</th>
                  <th className="border border-gray-400">Single Price</th>
                  <th className="border border-gray-400">Sub Total</th>
                  <th className="border border-gray-400">Operation</th>
                </tr>
              </thead>
              <tbody>
                {essentialsData.map((item, index) => (
                  <tr key={index} className="border border-gray-400">
                    <td className="border border-gray-400 text-center">
                      {item.date}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={inventoryName}
                          onChange={(e) => setInventoryName(e.target.value)}
                        />
                      ) : (
                        item.inventoryName
                      )}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {item.singlePrice}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {item.subtotal}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {editIndex === index ? (
                        <button
                          onClick={() => handleSave(index)}
                          className="bg-blackText text-white p-2 rounded-md"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          {/* <button
                          onClick={() => handleEdit(index)}
                          className="bg-black text-white p-2 rounded-md w-16"
                        >
                          Edit
                        </button> */}
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 text-white p-2 rounded-md ml-2 mt-1 mb-1"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {storeType === "Vessels" && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold pl-96">Vessels Inventory</h2>
            <table className="w-full mt-4 border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400">Date</th>
                  <th className="border border-gray-400">Inventory Name</th>
                  <th className="border border-gray-400">Quantity</th>
                  <th className="border border-gray-400">Single Price</th>
                  <th className="border border-gray-400">Sub Total</th>
                  <th className="border border-gray-400">Operation</th>
                </tr>
              </thead>
              <tbody>
                {vesselsData.map((item, index) => (
                  <tr key={index} className="border border-gray-400">
                    <td className="border border-gray-400 text-center">
                      {item.date}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={inventoryName}
                          onChange={(e) => setInventoryName(e.target.value)}
                        />
                      ) : (
                        item.inventoryName
                      )}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {item.singlePrice}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {item.subtotal}
                    </td>
                    <td className="border border-gray-400 text-center">
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 pb-48 ">
          <button
            onClick={() => generatePDF(storeType)}
            className="bg-blackText text-white p-2 rounded-xl"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    fontFamily: "Lato",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    margin: "auto",
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
  headerCell: {
    backgroundColor: "lightgray",
  },
});

export default AddInventory;
