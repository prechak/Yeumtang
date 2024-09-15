import React from "react";

// Function to format the date as DD/MM/YY
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Intl.DateTimeFormat("th-TH", options).format(new Date(dateString));
};

const TransactionTable = ({ transactions }) => {
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
              <td className="px-6 py-4 border-b">{transaction.description}</td>
              <td
                className={`px-6 py-4 border-b text-right ${
                  transaction.transaction_type_id === 1
                    ? "text-red-500"
                    : "text-green-500"
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
