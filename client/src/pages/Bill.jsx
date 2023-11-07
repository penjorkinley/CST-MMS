import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { MdReceipt } from "react-icons/md";

const Bill = () => {
  const [month, setMonth] = useState("January");
  const [totalFund, setTotalFund] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [bills, setBills] = useState([]);
  const [selectedBillIndex, setSelectedBillIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/auth/placeOrder")
      .then((response) => response.json())
      .then((data) => {
        setTotalStudents(data.count);
      })
      .catch((error) => {
        console.error("Error fetching order count: ", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/bill/getbill")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data); // Check the data format here
        setBills(data.bills);
      })
      .catch((error) => {
        console.error("Error fetching bills: ", error);
      });
  }, []);

  const expenditures = totalStudents * 75; // No state needed if it's always calculated
  const balance = totalFund - expenditures;

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
      const newBill = {
        month,
        totalFund,
        totalStudents,
        expenditures,
        balance,
      };

      fetch("http://localhost:3001/bill/savebill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBill),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Update local bills array with newly added bill from database
            setBills([...bills, data.bill]);
          } else {
            console.error("Failed to save the bill.");
          }
          setBills([...bills, data.bill]);

          alert("Bill Generated and saved successfully");

          // Reset form fields
          setMonth("January");
          setTotalFund(0);
          setTotalStudents(0);
        });
    } else {
      alert("Bill Generation Failed");
    }
  };

  // const editBill = (index) => {
  //   const billToEdit = bills[index];
  //   setMonth(billToEdit.month);
  //   setTotalFund(billToEdit.totalFund);
  //   setExpenditures(billToEdit.expenditures);
  //   setTotalStudents(billToEdit.totalStudents);
  //   setBalance(billToEdit.balance);
  //   setSelectedBillIndex(index);
  // };

  const deleteBill = (id, index) => {
    // Ask user if they really want to delete the bill
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this bill?"
    );

    // Proceed with deletion only if the user confirms
    if (isConfirmed) {
      fetch(`http://localhost:3001/bill/deletebill/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Remove deleted bill from local array
            const updatedBills = [...bills];
            updatedBills.splice(index, 1);
            setBills(updatedBills);
            alert("The bill has been successfully deleted.");
          } else {
            console.error("Failed to delete the bill.");
            alert("Failed to delete the bill.");
          }
        })
        .catch((error) => {
          console.error("Error deleting bill:", error);
          alert("Error occurred while deleting the bill.");
        });
    }
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
      "No. of Students Dined",
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
    <div className="flex-row w-1/2  items-center ">
      <div className="flex items-center space-x-2 mb-5">
        <MdReceipt className="text-4xl" />
        <h1 className="text-4xl font-bold">Bill Generation</h1>
      </div>

      <div className="p-4  bg-cute ">
        <div className="flex justify-between">
          <div>
            <div className="mt-4">
              <label htmlFor="month" className="block font-semibold ">
                Select Month:
              </label>
              <select
                id="month"
                className="border p-2 rounded-md w-52"
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
                className="border p-2 rounded-md w-52"
                value={totalFund}
                onChange={(e) => setTotalFund(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt-4">
              <label
                htmlFor="totalStudents"
                className="block font-semibold mb-3"
              >
                Number of Students Dined:
              </label>
              <label id="totalStudents" className="font-bold p-2 rounded-md w-2/4">
                {totalStudents}
              </label>
            </div>

            <div className="mt-4">
              <label
                htmlFor="expenditures"
                className="block font-semibold mb-3"
              >
                Expenditures:
              </label>
              <label id="expenditures" className="font-bold p-2 rounded-md w-2/4">
                {expenditures}
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="balance" className="block font-semibold mb-3">
                Balance:
              </label>
              <label id="balance" className="font-bold p-2 rounded-md w-2/4">
                {balance}
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={addBill}
            className="bg-blackText text-white p-2 rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-black"
          >
            {selectedBillIndex !== null ? "Edit Bill" : "Generate Bill"}
          </button>
          <button
            onClick={resetForm}
            className="bg-red-500 text-white p-2 rounded-xl ml-4 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-black"
          >
            Reset
          </button>
        </div>

        <div className="mt-8 h-[350px] overflow-auto">
          {bills.length > 0 && (
            <table className="w-full border-collapse border border-gray-400 bg-white shadow-xl ">
              <thead>
                <tr>
                  <th className="border border-gray-400 text-center">Month</th>
                  <th className="border border-gray-400 text-center">
                    Total Fund
                  </th>
                  <th className="border border-gray-400 text-center">
                    No. of Students Dined
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
                      {/* <button
                        onClick={() => editBill(index)}
                        className="bg-yellow-500 text-white p-2 rounded-xl mt-2 mb-2"
                      >
                        Edit
                      </button> */}
                      <button
                        onClick={() => deleteBill(bill._id, index)} // Assuming bill has _id property from MongoDB
                        className="bg-red-500 text-white p-2 rounded-xl ml-2 mt-2 mb-2 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-black"
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
            className="bg-blackText text-white p-2 rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-black"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
