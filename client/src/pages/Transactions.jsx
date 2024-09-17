import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal"; // Import the form modal
import ActionModal from "../components/ActionModal"; // Import the first modal with borrow/repay buttons

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total_borrowed_A: "0",
    total_repaid_A: "0",
    total_borrowed_B: "0",
    total_repaid_B: "0",
  });
  const [selectedUser, setSelectedUser] = useState("A");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false); // First modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Second modal
  const [modalAction, setModalAction] = useState(""); // "borrow" or "repay"
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
      return response.data.message;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  useEffect(() => {
    if (selectedUser === "both") {
      Promise.all([fetchSummary(1), fetchSummary(2)]).then(
        ([summaryA, summaryB]) => {
          setSummary({
            total_borrowed_A: summaryA.total_borrowed || "0",
            total_repaid_A: summaryA.total_repaid || "0",
            total_borrowed_B: summaryB.total_borrowed || "0",
            total_repaid_B: summaryB.total_repaid || "0",
          });
        }
      );
      fetchTransactions(null);
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

  const handleAddTransaction = async (formData) => {
    try {
      const payload = {
        lenderId: parseInt(formData.lenderId),
        borrowerId: parseInt(formData.borrowerId),
        amount: parseFloat(formData.amount),
      };
      const endpoint = modalAction === "borrow" ? "/api/borrow" : "/api/repay";

      await axios.post(`http://localhost:8080${endpoint}`, payload);
      setIsFormModalOpen(false);
      fetchTransactions(null);
    } catch (error) {
      console.error(error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
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
            onClick={() => setIsActionModalOpen(true)} // Open the first modal
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            เพิ่มรายการใหม่
          </button>
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
                  selectedUser === "both"
                    ? "text-black"
                    : (transaction.user_id === 1 &&
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

      {/* First Modal: Choose between Borrow and Repay */}
      {isActionModalOpen && (
        <ActionModal
          closeModal={() => setIsActionModalOpen(false)}
          openFormModal={(action) => {
            setModalAction(action);
            setIsActionModalOpen(false);
            setIsFormModalOpen(true);
          }}
        />
      )}

      {/* Second Modal: Add transaction details */}
      {isFormModalOpen && (
        <Modal
          borrowerId={borrowerId}
          lenderId={lenderId}
          amount={amount}
          setBorrowerId={setBorrowerId}
          setLenderId={setLenderId}
          setAmount={setAmount}
          closeModal={() => setIsFormModalOpen(false)}
          handleSubmit={handleAddTransaction}
          titles={
            modalAction === "borrow"
              ? {
                  borrowerTitle: "ผู้ยืม",
                  lenderTitle: "ผู้ให้ยืม",
                  amountTitle: "จำนวน",
                }
              : {
                  borrowerTitle: "ผู้คืน",
                  lenderTitle: "คืนให้",
                  amountTitle: "จำนวน",
                }
          }
        />
      )}
    </div>
  );
}
