import { useState } from "react";

import Header from "../components/Header";
import Summary from "../components/Summary";
import TransactionTable from "../components/TransactionTable";
import Modal from "../components/Modal";
import ActionModal from "../components/ActionModal";

import useTransactions from "../hooks/useTransactions";
import useSummary from "../hooks/useSummary";
import useHandleTransaction from "../hooks/useHandleTransaction"; // Import the new hook

import formatDate from "../utils/dateFormat";

export default function TransactionPage() {
  const [selectedUser, setSelectedUser] = useState("A");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [borrowerId, setBorrowerId] = useState("");
  const [lenderId, setLenderId] = useState("");
  const [amount, setAmount] = useState("");

  const { transactions, fetchTransactions } = useTransactions(
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

  const { handleAddTransaction } = useHandleTransaction({
    selectedUser,
    modalAction,
    setIsFormModalOpen,
    fetchTransactions,
  });

  return (
    <div className="container w-[100vw] mx-auto p-6">
      {/* Header */}
      <Header
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setIsActionModalOpen={setIsActionModalOpen}
      />

      {/* Summary Section */}
      <Summary selectedUser={selectedUser} summary={summary} />

      {/* Transaction List */}
      <TransactionTable
        transactions={transactions}
        selectedUser={selectedUser}
        formatDate={formatDate}
      />

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
