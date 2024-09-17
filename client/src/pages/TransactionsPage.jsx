import { useState, useEffect } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import ActionModal from "../components/ActionModal";
import useTransactions from "../hooks/useTransactions";
import useSummary from "../hooks/useSummary";
import formatDate from "../utils/dateFormat";

export default function TransactionPage() {
  const [selectedUser, setSelectedUser] = useState("A");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [borrowerId, setBorrowerId] = useState("");
  const [lenderId, setLenderId] = useState("");
  const [amount, setAmount] = useState("");

  const transactions = useTransactions(
    selectedUser === "both" ? null : selectedUser === "A" ? 1 : 2
  );

  const [summaryA, summaryB] = [useSummary(1), useSummary(2)];

  const summary =
    selectedUser === "both"
      ? {
          total_borrowed_A: summaryA.total_borrowed || "0",
          total_repaid_A: summaryA.total_repaid || "0",
          total_borrowed_B: summaryB.total_borrowed || "0",
          total_repaid_B: summaryB.total_repaid || "0",
        }
      : {
          total_borrowed:
            selectedUser === "A"
              ? summaryA.total_borrowed
              : summaryB.total_borrowed,
          total_repaid:
            selectedUser === "A"
              ? summaryA.total_repaid
              : summaryB.total_repaid,
        };

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
      // Trigger a refresh of transactions
      const refreshId =
        selectedUser === "both" ? null : selectedUser === "A" ? 1 : 2;
      fetchTransactions(refreshId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container w-[100vw] mx-auto p-6">
      {/* Header */}
      <Header
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setIsActionModalOpen={setIsActionModalOpen}
      />
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
            <div className="flex-1 px-6 py-3">วันที่</div>
            <div className="flex-1 px-6 py-3">ผู้ใช้</div>
            <div className="flex-1 px-6 py-3">รายการ</div>
            <div className="flex-1 px-6 py-3">จำนวน</div>
          </div>
          {Array.isArray(transactions) &&
            transactions.map((transaction, index) => (
              <div key={index} className="flex border-b text-center">
                <div className="flex-1 px-6 py-4 text-gray-800">
                  {formatDate(transaction.timestampz)}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-800">
                  {"นาย " + transaction.user_name}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-800">
                  นาย {transaction.borrower_name}{" "}
                  {transaction.transaction_type_id === 1
                    ? "ยืมเงิน"
                    : "คืนเงิน"}{" "}
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
