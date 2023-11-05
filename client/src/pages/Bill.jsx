import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Bill = () => {
  const [month, setMonth] = useState('January');
  const [totalAmount, setTotalAmount] = useState('');
  const [expenditures, setExpenditures] = useState('');
  const [totalStudents, setTotalStudents] = useState('');
  const [bills, setBills] = useState([]);
  const [selectedBillIndex, setSelectedBillIndex] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const addBill = () => {
    if (month && totalAmount && expenditures && totalStudents) {
      if (selectedBillIndex !== null) {
        // If editing an existing bill
        const updatedBills = [...bills];
        updatedBills[selectedBillIndex] = {
          month,
          totalAmount,
          expenditures,
          totalStudents,
        };
        setBills(updatedBills);
        setSelectedBillIndex(null);
      } else {
        // If creating a new bill
        const newBill = {
          month,
          totalAmount,
          expenditures,
          totalStudents,
        };
        setBills([...bills, newBill]);
      }
      // Reset form fields
      setMonth('January');
      setTotalAmount('');
      setExpenditures('');
      setTotalStudents('');
    }
  };

  const editBill = (index) => {
    const billToEdit = bills[index];
    setMonth(billToEdit.month);
    setTotalAmount(billToEdit.totalAmount);
    setExpenditures(billToEdit.expenditures);
    setTotalStudents(billToEdit.totalStudents);
    setSelectedBillIndex(index);
  };

  const deleteBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
  };

  const resetForm = () => {
    setMonth('January');
    setTotalAmount('');
    setExpenditures('');
    setTotalStudents('');
    setSelectedBillIndex(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Monthly Bills', 75, 10);

    let y = 20;
    bills.forEach((bill, index) => {
      y += 10;
      doc.text(`Month: ${bill.month}`, 10, y);
      doc.text(`Total Amount: ${bill.totalAmount}`, 50, y);
      doc.text(`Expenditures: ${bill.expenditures}`, 100, y);
      doc.text(`Total Students: ${bill.totalStudents}`, 150, y);

      if (index < bills.length - 1) {
        doc.line(10, y + 5, 200, y + 5);
      }
    });

    doc.save('bills.pdf');
  };

  return (
    <div className="p-4 shadow-2xl bg-cute w-1/2 ">
      <h1 className="text-2xl font-bold">Bill Generation</h1>

      <div className="mt-4" >
        <label htmlFor="month" className="block font-semibold ">
          Select Month:
        </label>
        <select
          id="month"
          className="border p-2 rounded-md w-2/4"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="totalAmount" className="block font-semibold">
          Total Amount:
        </label>
        <input
          type="number"
          id="totalAmount"
          className="border p-2 rounded-md w-2/4"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="expenditures" className="block font-semibold">
          Expenditures:
        </label>
        <input
          type="text"
          id="expenditures"
          className="border p-2 rounded-md w-2/4"
          value={expenditures}
          onChange={(e) => setExpenditures(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="totalStudents" className="block font-semibold">
          Total Number of Students:
        </label>
        <input
          type="number"
          id="totalStudents"
          className="border p-2 rounded-md w-2/4"
          value={totalStudents}
          onChange={(e) => setTotalStudents(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <button onClick={addBill} className="bg-black text-white p-2 rounded-xl">
          {selectedBillIndex !== null ? 'Edit Bill' : 'Generate Bill'}
        </button>
        <button onClick={resetForm} className="bg-red-500 text-white p-2 rounded-xl ml-4">
          Reset
        </button>
      </div>

      <div className="mt-8">
        {bills.length > 0 && (
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400">Month</th>
                <th className="border border-gray-400">Total Amount</th>
                <th className="border border-gray-400">Expenditures</th>
                <th className="border border-gray-400">Total Students</th>
                <th className="border border-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400">{bill.month}</td>
                  <td className="border border-gray-400">{bill.totalAmount}</td>
                  <td className="border border-gray-400">{bill.expenditures}</td>
                  <td className="border border-gray-400">{bill.totalStudents}</td>
                  <td className="border border-gray-400">
                    <button onClick={() => editBill(index)} className="bg-black text-white p-2 rounded-xl">Edit</button>
                    <button onClick={() => deleteBill(index)} className="bg-black text-white p-2 rounded-xl ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4">
        <button onClick={generatePDF} className="bg-black text-white p-2 rounded-xl">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Bill;
