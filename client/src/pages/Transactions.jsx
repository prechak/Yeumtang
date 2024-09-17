import { useState, useEffect } from "react";
import axios from "axios";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total_borrowed_A: "0",
    total_repaid_A: "0",
    total_borrowed_B: "0",
    total_repaid_B: "0",
  });
  const [selectedUser, setSelectedUser] = useState("A");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [borrowerId, setBorrowerId] = useState("");
  const [lenderId, setLenderId] = useState("");
  const [amount, setAmount] = useState("");

  const fetchTransactions = async (userId) => {
    try {
      const endpoint = userId
        ? `/api/transactions?userId=${userId}`
        : "/api/transactions";
      const response = await axios.get(`http://localhost:8080${endpoint}`);
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSummary = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/summary?userId=${userId}`
      );
      return response.data.message; // Ensure this returns the summary data
    } catch (error) {
      console.error(error);
      return {}; // Return an empty object in case of error
    }
  };

  useEffect(() => {
    if (selectedUser === "both") {
      // Fetch combined summary for both users
      Promise.all([
        fetchSummary(1), // Summary for User A
        fetchSummary(2), // Summary for User B
      ]).then(([summaryA, summaryB]) => {
        setSummary({
          total_borrowed_A: summaryA.total_borrowed || "0",
          total_repaid_A: summaryA.total_repaid || "0",
          total_borrowed_B: summaryB.total_borrowed || "0",
          total_repaid_B: summaryB.total_repaid || "0",
        });
      });
      fetchTransactions(null); // Fetch all transactions
    } else {
      const userId = selectedUser === "A" ? 1 : selectedUser === "B" ? 2 : null;
      fetchTransactions(userId);
      if (userId)
        fetchSummary(userId).then((summary) => {
          setSummary({
            total_borrowed: summary.total_borrowed || "0",
            total_repaid: summary.total_repaid || "0",
          });
        });
    }
  }, [selectedUser]);

  const handleAddTransaction = async () => {
    try {
      const payload = {
        lenderId: parseInt(lenderId),
        borrowerId: parseInt(borrowerId),
        amount: parseFloat(amount),
      };
      await axios.post(`http://localhost:8080/api/borrow`, payload);
      setIsModalOpen(false);
      fetchTransactions(null); // Refresh transaction list
    } catch (error) {
      console.error(error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="container w-[100vw] mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-semibold">รายการยืม/คืนเงิน</h1>
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedUser("A")}
            className={`px-4 py-2 rounded ${
              selectedUser === "A" ? "bg-green-700" : "bg-green-500"
            } text-white`}
          >
            นาย A
          </button>
          <button
            onClick={() => setSelectedUser("B")}
            className={`px-4 py-2 rounded ${
              selectedUser === "B" ? "bg-green-700" : "bg-green-500"
            } text-white`}
          >
            นาย B
          </button>
          <button
            onClick={() => setSelectedUser("both")}
            className={`px-4 py-2 rounded ${
              selectedUser === "both" ? "bg-green-700" : "bg-green-500"
            } text-white`}
          >
            นาย A และ นาย B
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            เพิ่มรายการใหม่
          </button>
        </div>
      </div>
      {/* Summary Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">สรุปการติดหนี้</h2>
        <div className="bg-gray-100 p-4 rounded">
          {selectedUser === "both" ? (
            <>
              <p className="text-gray-700">
                นาย A ยืมเงิน นาย B ทั้งหมด:{" "}
                <span className="text-red-500 font-bold">
                  {summary.total_borrowed_A} บาท
                </span>
              </p>
              <p className="text-gray-700">
                นาย A คืนเงิน นาย B แล้วทั้งหมด:{" "}
                <span className="text-green-500 font-bold">
                  {summary.total_repaid_A} บาท
                </span>
              </p>
              <p className="text-gray-700">
                นาย B ยืมเงิน นาย A ทั้งหมด:{" "}
                <span className="text-red-500 font-bold">
                  {summary.total_borrowed_B} บาท
                </span>
              </p>
              <p className="text-gray-700">
                นาย B คืนเงิน นาย A แล้วทั้งหมด:{" "}
                <span className="text-green-500 font-bold">
                  {summary.total_repaid_B} บาท
                </span>
              </p>
            </>
          ) : (
            <div>
              <p className="text-gray-700">
                นาย {selectedUser === "A" ? "A" : "B"} ยืมเงิน นาย{" "}
                {selectedUser === "A" ? "B" : "A"} ทั้งหมด:{" "}
                <span className="text-red-500 font-bold">
                  {summary.total_borrowed} บาท
                </span>
              </p>
              <p className="text-gray-700">
                นาย {selectedUser === "A" ? "A" : "B"} คืนเงิน นาย{" "}
                {selectedUser === "A" ? "B" : "A"} แล้วทั้งหมด:{" "}
                <span className="text-green-500 font-bold">
                  {summary.total_repaid} บาท
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Transaction List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">รายการยืม/คืนเงิน</h2>
        <div className="flex flex-col bg-white">
          <div className="flex border-b text-gray-800 text-center bg-gray-100">
            <div className="flex-1 px-6 py-3">ผู้ใช้</div>
            <div className="flex-1 px-6 py-3">วันที่</div>
            <div className="flex-1 px-6 py-3">รายการ</div>
            <div className="flex-1 px-6 py-3">จำนวน</div>
          </div>
          {transactions.map((transaction, index) => (
            <div key={index} className="flex border-b text-center">
              <div className="flex-1 px-6 py-4 text-gray-800">
                {"นาย " + transaction.user_name}
              </div>
              <div className="flex-1 px-6 py-4 text-gray-800">
                {formatDate(transaction.timestampz)}
              </div>
              <div className="flex-1 px-6 py-4 text-gray-800">
                นาย {transaction.borrower_name}{" "}
                {transaction.transaction_type_id === 1 ? "ยืมเงิน" : "คืนเงิน"}{" "}
                นาย {transaction.lender_name}
              </div>
              <div
                className={`flex-1 px-6 py-4 text-center ${
                  (transaction.user_id === 1 &&
                    transaction.transaction_type_name === "repay") ||
                  (transaction.user_id === 2 &&
                    transaction.transaction_type_name !== "repay")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.amount} บาท
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding a new transaction */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-semibold mb-4">เพิ่มรายการใหม่</h2>
            <div className="mb-4">
              <label className="block text-gray-700">ผู้ยืม</label>
              <input
                type="text"
                value={borrowerId}
                onChange={(e) => setBorrowerId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">ผู้ให้ยืม</label>
              <input
                type="text"
                value={lenderId}
                onChange={(e) => setLenderId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">จำนวน</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-black"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleAddTransaction}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                เพิ่มรายการ
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
