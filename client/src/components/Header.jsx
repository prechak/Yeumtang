import React from "react";

const Header = ({ onUserSelect }) => {
  return (
    <div className="flex justify-between items-center border-b pb-4 mb-6">
      <h1 className="text-2xl font-semibold">รายการยืม/คืนเงิน</h1>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onUserSelect(1)}
        >
          User 1
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => onUserSelect(2)}
        >
          User 2
        </button>
      </div>
    </div>
  );
};

export default Header;
