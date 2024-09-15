import React, { useState } from "react";
import { fetchDebtSummary } from "../services/api";

const Header = ({ onUserSelect }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleButtonClick = (userId) => {
    setSelectedUser(userId);
    onUserSelect(userId);
  };

  return (
    <div className="flex justify-between items-center border-b pb-4 mb-6">
      <h1 className="text-2xl font-semibold">รายการยืม/คืนเงิน</h1>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            selectedUser === 1
              ? "bg-green-700 text-white"
              : "bg-green-500 text-white"
          }`}
          onClick={() => handleButtonClick(1)}
        >
          User 1
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedUser === 2
              ? "bg-green-700 text-white"
              : "bg-green-500 text-white"
          }`}
          onClick={() => handleButtonClick(2)}
        >
          User 2
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={fetchDebtSummary}
        >
          สรุปการติดหนี้
        </button>
      </div>
    </div>
  );
};

export default Header;
