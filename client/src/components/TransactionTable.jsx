import React from "react";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Intl.DateTimeFormat("th-TH", options).format(new Date(dateString));
};

const userMap = {
  1: "User 1",
  2: "User 2",
};

const TransactionTable = ({ transactions }) => {
  const getDescription = (transaction) => {
    const lenderName = userMap[transaction.lender_id] || "Unknown Lender";
    const borrowerName = userMap[transaction.borrower_id] || "Unknown Borrower";

    if (transaction.transaction_type_id === 1) {
      return `${lenderName} ยืมเงิน ${borrowerName}`;
    } else if (transaction.transaction_type_id === 2) {
      return `${lenderName} คืนเงิน ${borrowerName}`;
    }
    return "Unknown Transaction";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">รายการยืม/คืนเงิน</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b text-left text-gray-800">
              วันที่
            </th>
            <th className="px-6 py-3 border-b text-left text-gray-800">
              รายการ
            </th>
            <th className="px-6 py-3 border-b text-right text-gray-800">
              จำนวน
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.timestamp}>
              <td className="text-black px-6 py-4 border-b">
                {formatDate(transaction.timestamp)}
              </td>
              <td className="px-6 py-4 border-b text-gray-800">
                {getDescription(transaction)}
              </td>
              <td
                className={`px-6 py-4 border-b text-right ${
                  transaction.transaction_type_id === 1
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.amount} บาท
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
