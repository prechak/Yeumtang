import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../index.css";

const TransactionTable = ({ transactions, selectedUser, formatDate }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [transactions]);

  const isLoading = loading || !Array.isArray(transactions);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">รายการยืม/คืนเงิน</h2>
      <div className="flex flex-col bg-white">
        <div className="flex border-b text-gray-800 text-center bg-gray-100">
          <div className="flex-1 px-6 py-3">วันที่</div>
          <div className="flex-1 px-6 py-3">ผู้ใช้</div>
          <div className="flex-1 px-6 py-3">รายการ</div>
          <div className="flex-1 px-6 py-3">จำนวน</div>
        </div>
        {isLoading ? (
          <>
            {/* Loading Text with Animation */}
            <div className="text-center py-4">
              <span className="loading-text">Loading...</span>
            </div>

            {/* Skeleton Rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex border-b text-center">
                <div className="flex-1 px-6 py-4">
                  <Skeleton height={20} />
                </div>
                <div className="flex-1 px-6 py-4">
                  <Skeleton height={20} />
                </div>
                <div className="flex-1 px-6 py-4">
                  <Skeleton height={20} />
                </div>
                <div className="flex-1 px-6 py-4">
                  <Skeleton height={20} />
                </div>
              </div>
            ))}
          </>
        ) : (
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
                {transaction.transaction_type_id === 1 ? "ยืมเงิน" : "คืนเงิน"}{" "}
                นาย {transaction.lender_name}
              </div>
              <div
                className={`flex-1 px-6 py-4 ${
                  selectedUser === "both"
                    ? "text-black"
                    : (transaction.user_id === 1 &&
                        transaction.user_role === "borrower" &&
                        transaction.transaction_type_name === "borrow") ||
                      (transaction.user_id === 1 &&
                        transaction.user_role === "lender" &&
                        transaction.transaction_type_name === "repay")
                    ? "text-green-500"
                    : (transaction.user_id === 2 &&
                        transaction.user_role === "borrower" &&
                        transaction.transaction_type_name === "borrow") ||
                      (transaction.user_id === 2 &&
                        transaction.user_role === "lender" &&
                        transaction.transaction_type_name === "repay")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.amount} บาท
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectedUser: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default TransactionTable;
