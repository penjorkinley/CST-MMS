import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { MdReceipt } from "react-icons/md";

const Bill = () => {
  const [month, setMonth] = useState("January");
  const [totalFund, setTotalFund] = useState("");
  const [expenditures, setExpenditures] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [balance, setBalance] = useState(""); // Added state for balance
  const [bills, setBills] = useState([]);
  const [selectedBillIndex, setSelectedBillIndex] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const addBill = () => {
    if (month && totalFund && totalStudents && expenditures && balance) {
      if (selectedBillIndex !== null) {
        // If editing an existing bill
        const updatedBills = [...bills];
        updatedBills[selectedBillIndex] = {
          month,
          totalFund,
          totalStudents,
          expenditures,
          balance,
        };
        setBills(updatedBills);
        setSelectedBillIndex(null);
      } else {
        // If creating a new bill
        const newBill = {
          month,
          totalFund,
          totalStudents,
          expenditures,
          balance,
        };
        setBills([...bills, newBill]);
      }
      // Reset form fields
      setMonth("January");
      setTotalFund("");
      setTotalStudents("");
      setExpenditures("");
      setBalance("");
    }
  };

  const editBill = (index) => {
    const billToEdit = bills[index];
    setMonth(billToEdit.month);
    setTotalFund(billToEdit.totalFund);
    setExpenditures(billToEdit.expenditures);
    setTotalStudents(billToEdit.totalStudents);
    setBalance(billToEdit.balance);
    setSelectedBillIndex(index);
  };

  const deleteBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
  };

  const resetForm = () => {
    setMonth("January");
    setTotalFund("");
    setExpenditures("");
    setTotalStudents("");
    setBalance("");
    setSelectedBillIndex(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Monthly Bills 2023", 85, 10);
    doc.text("Note: ", 15, 20);
    doc.text("Each meal price as Nu.25", 15, 30);

    const tableHeaders = [
      "Month",
      "Total Fund",
      "Total Students",
      "Expenditures",
      "Balance",
    ]; // Added Balance to headers
    const tableData = bills.map((bill) => [
      bill.month,
      bill.totalFund,
      bill.totalStudents,
      bill.expenditures,
      bill.balance,
    ]); // Added balance to data

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 40,
      theme: "striped",
    });

    doc.save("bills.pdf");
  };

  return (
    <div className="flex-row w-1/2 items-center">
      <div className="flex items-center space-x-2 mb-5">
        <MdReceipt className="text-4xl" />
        <h1 className="text-4xl font-bold">Bill Generation</h1>
      </div>

      <div className="p-4 shadow-2xl bg-cute ">
        <div className="mt-4">
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
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="totalFund" className="block font-semibold">
            Total Fund:
          </label>
          <input
            type="number"
            id="totalFund"
            className="border p-2 rounded-md w-2/4"
            value={totalFund}
            onChange={(e) => setTotalFund(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="totalStudents" className="block font-semibold">
            Number of Students Dined:
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
          <label htmlFor="balance" className="block font-semibold">
            Balance:
          </label>
          <input
            type="number"
            id="balance"
            className="border p-2 rounded-md w-2/4"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button
            onClick={addBill}
            className="bg-black text-white p-2 rounded-xl"
          >
            {selectedBillIndex !== null ? "Edit Bill" : "Generate Bill"}
          </button>
          <button
            onClick={resetForm}
            className="bg-red-500 text-white p-2 rounded-xl ml-4"
          >
            Reset
          </button>
        </div>

        <div className="mt-8">
          {bills.length > 0 && (
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 text-center">Month</th>
                  <th className="border border-gray-400 text-center">
                    Total Amount
                  </th>
                  <th className="border border-gray-400 text-center">
                    Total Students
                  </th>
                  <th className="border border-gray-400 text-center">
                    Expenditures
                  </th>
                  <th className="border border-gray-400 text-center">
                    Balance
                  </th>
                  <th className="border border-gray-400 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index} className="border border-gray-400">
                    <td className="border border-gray-400 text-center">
                      {bill.month}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {bill.totalFund}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {bill.totalStudents}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {bill.expenditures}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {bill.balance}
                    </td>
                    <td className="border border-gray-400 text-center">
                      <button
                        onClick={() => editBill(index)}
                        className="bg-black text-white p-2 rounded-xl"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBill(index)}
                        className="bg-black text-white p-2 rounded-xl ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={generatePDF}
            className="bg-black text-white p-2 rounded-xl"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
