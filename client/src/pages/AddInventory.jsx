import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import mammoth from 'mammoth';

function AddInventory() {
  const [inventoryName, setInventoryName] = useState('');
  const [storeType, setStoreType] = useState('Essentials');
  const [quantity, setQuantity] = useState('');
  const [singlePrice, setSinglePrice] = useState('');
  const [essentialsData, setEssentialsData] = useState([]);
  const [vesselsData, setVesselsData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  const handleAddInventory = () => {
    if (storeType === 'Essentials') {
      const newEssentialItem = {
        date: new Date().toLocaleDateString(),
        inventoryName,
        quantity,
        usedQuantity: 0,
        remainingQuantity: quantity,
        singlePrice,
        subtotal: quantity * singlePrice,
      };
      setEssentialsData([...essentialsData, newEssentialItem]);
    } else if (storeType === 'Vessels') {
      const newVesselItem = {
        date: new Date().toLocaleDateString(),
        inventoryName,
        quantity,
        usedQuantity: 0,
        remainingQuantity: quantity,
        singlePrice,
        subtotal: quantity * singlePrice,
      };
      setVesselsData([...vesselsData, newVesselItem]);
    }

    // Reset the form fields
    setInventoryName('');
    setQuantity('');
    setSinglePrice('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index) => {
    if (storeType === 'Essentials') {
      const updatedData = [...essentialsData];
      updatedData[index].inventoryName = inventoryName;
      updatedData[index].quantity = quantity;
      updatedData[index].singlePrice = singlePrice;
      updatedData[index].subtotal = quantity * singlePrice;
      setEssentialsData(updatedData);
    } else if (storeType === 'Vessels') {
      const updatedData = [...vesselsData];
      updatedData[index].inventoryName = inventoryName;
      updatedData[index].quantity = quantity;
      updatedData[index].singlePrice = singlePrice;
      updatedData[index].subtotal = quantity * singlePrice;
      setVesselsData(updatedData);
    }

    setEditIndex(null);
    setInventoryName('');
    setQuantity('');
    setSinglePrice('');
  };

  const generatePDF = () => {
    const doc = (
      <Document>
        <Page size="A4">
          <View style={styles.header}>
            <Text style={styles.headerText}>Inventory Management</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Date</Text>
              <Text style={styles.headerCell}>Inventory Name</Text>
              <Text style={styles.headerCell}>Quantity</Text>
              <Text style={styles.headerCell}>Used Quantity</Text>
              <Text style={styles.headerCell}>Remaining Quantity</Text>
              <Text style={styles.headerCell}>Single Price</Text>
              <Text style={styles.headerCell}>Sub Total</Text>
            </View>
            {essentialsData.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell}>{item.inventoryName}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>{item.usedQuantity}</Text>
                <Text style={styles.cell}>{item.remainingQuantity}</Text>
                <Text style={styles.cell}>{item.singlePrice}</Text>
                <Text style={styles.cell}>{item.subtotal}</Text>
              </View>
            ))}
            {vesselsData.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell}>{item.inventoryName}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>{item.usedQuantity}</Text>
                <Text style={styles.cell}>{item.remainingQuantity}</Text>
                <Text style={styles.cell}>{item.singlePrice}</Text>
                <Text style={styles.cell}>{item.subtotal}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    setPdfData(doc);
  };

  const handleExportPDF = () => {
    generatePDF();
  };

  const handleExportWord = () => {
    const convertedHtml = `
      <html>
        <body>
          <h1>Inventory Management</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Inventory Name</th>
                <th>Quantity</th>
                <th>Used Quantity</th>
                <th>Remaining Quantity</th>
                <th>Single Price</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              ${essentialsData.map((item, index) => `
                <tr>
                  <td>${item.date}</td>
                  <td>${item.inventoryName}</td>
                  <td>${item.quantity}</td>
                  <td>${item.usedQuantity}</td>
                  <td>${item.remainingQuantity}</td>
                  <td>${item.singlePrice}</td>
                  <td>${item.subtotal}</td>
                </tr>
              `).join('')}
              ${vesselsData.map((item, index) => `
                <tr>
                  <td>${item.date}</td>
                  <td>${item.inventoryName}</td>
                  <td>${item.quantity}</td>
                  <td>${item.usedQuantity}</td>
                  <td>${item.remainingQuantity}</td>
                  <td>${item.singlePrice}</td>
                  <td>${item.subtotal}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    mammoth.convertToHtml({ arrayBuffer: new TextEncoder().encode(convertedHtml) })
      .then((result) => {
        const blob = new Blob([result.value], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'inventory.docx';
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-4">
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

      {storeType === 'Essentials' && (
        <div className="mt-8 ">
          <h2 className="text-xl font-semibold pl-96">Essentials Inventory</h2>
          <table className="w-full mt-4 ">
            <thead>
              <tr>
                <th>Date</th>
                <th>Inventory Name</th>
                <th>Quantity</th>
                <th>Used Quantity</th>
                <th>Remaining Quantity</th>
                <th>Single Price</th>
                <th>Sub Total</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {essentialsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>
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
                  <td>
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
                  <td>{item.usedQuantity}</td>
                  <td>{item.remainingQuantity}</td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={singlePrice}
                        onChange={(e) => setSinglePrice(e.target.value)}
                      />
                    ) : (
                      item.singlePrice
                    )}
                  </td>
                  <td>{item.subtotal}</td>
                  <td>
                    {editIndex === index ? (
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {storeType === 'Vessels' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Vessels Inventory</h2>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th>Date</th>
                <th>Inventory Name</th>
                <th>Quantity</th>
                <th>Used Quantity</th>
                <th>Remaining Quantity</th>
                <th>Single Price</th>
                <th>Sub Total</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {vesselsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>
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
                  <td>
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
                  <td>{item.usedQuantity}</td>
                  <td>{item.remainingQuantity}</td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={singlePrice}
                        onChange={(e) => setSinglePrice(e.target.value)}
                      />
                    ) : (
                      item.singlePrice
                    )}
                  </td>
                  <td>{item.subtotal}</td>
                  <td>
                    {editIndex === index ? (
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white p-2 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4  pb-48">
        <button onClick={handleExportPDF} className="bg-black text-white p-2 rounded-xl ">
          Export to PDF
        </button>
        <button onClick={handleExportWord} className="bg-black text-white p-2 rounded-xl ml-4">
          Export to Word
        </button>
      </div>

      {pdfData && (
        <div className="mt-4">
          <PDFViewer width={500} height={400}>
            {pdfData}
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
  },
  row: {
    display: 'table-row',
  },
  headerCell: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    padding: 5,
    textAlign: 'center',
  },
});

export default AddInventory;
