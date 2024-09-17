import React from "react";
import PropTypes from "prop-types";

const TransactionTable = ({ transactions, selectedUser, formatDate }) => {
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
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  selectedUser: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default TransactionTable;
