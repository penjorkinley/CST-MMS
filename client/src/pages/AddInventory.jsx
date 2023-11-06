import React, { useState, useEffect } from "react";
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
    if (storeType === "Essentials") {
      const updatedData = [...essentialsData];
      updatedData[index].inventoryName = inventoryName;
      updatedData[index].quantity = quantity;
      updatedData[index].singlePrice = singlePrice;
      updatedData[index].subtotal = quantity * singlePrice;
      setEssentialsData(updatedData);
    } else if (storeType === "Vessels") {
      const updatedData = [...vesselsData];
      updatedData[index].inventoryName = inventoryName;
      updatedData[index].quantity = quantity;
      updatedData[index].singlePrice = singlePrice;
      updatedData[index].subtotal = quantity * singlePrice;
      setVesselsData(updatedData);
    }

    setEditIndex(null);
    setInventoryName("");
    setQuantity("");
    setSinglePrice("");
  };

  const handleDelete = (index) => {
    if (storeType === "Essentials") {
      const updatedData = [...essentialsData];
      updatedData.splice(index, 1);
      setEssentialsData(updatedData);
    } else if (storeType === "Vessels") {
      const updatedData = [...vesselsData];
      updatedData.splice(index, 1);
      setVesselsData(updatedData);
    }
  };

  const generatePDF = () => {
    const tableData = [
      ["Date", "Inventory Name", "Quantity", "Single Price", "Sub Total"],
      ...essentialsData.map((item) => [
        item.date,
        item.inventoryName,
        item.quantity,
        item.singlePrice,
        item.subtotal,
      ]),
      ...vesselsData.map((item) => [
        item.date,
        item.inventoryName,
        item.quantity,
        item.singlePrice,
        item.subtotal,
      ]),
    ];

    const doc = (
      <Document>
        <Page size="A4">
          <View style={styles.header}>
            <Text style={styles.headerText}>Inventory Management</Text>
          </View>
          <View style={styles.table}>
            {tableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                  <Text
                    key={cellIndex}
                    style={cellIndex === 0 ? styles.headerCell : styles.cell}
                  >
                    {cell}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    return doc;
  };

  return (
    <div className="p-4 shadow-2xl bg-cute">
      <h1 className="text-2xl font-bold">Inventory Management</h1>

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
              className="bg-black text-white p-2 rounded-xl"
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
          <h2 className="text-xl font-semibold pl-96">Essentials Inventory</h2>
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
                        className="bg-black text-white p-2 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-black text-white p-2 rounded-md w-16"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-black text-white p-2 rounded-md ml-2"
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
                    {editIndex === index ? (
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-black text-white p-2 rounded-md w-16 "
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-black text-white p-2 rounded-md ml-2"
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

      <div className="mt-4 pb-48 ">
        <PDFDownloadLink document={generatePDF()} fileName="inventory.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>
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
