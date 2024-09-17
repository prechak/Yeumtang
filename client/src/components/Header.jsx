import React from "react";

const Header = ({ selectedUser, setSelectedUser, setIsActionModalOpen }) => {
  return (
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
          onClick={() => setIsActionModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          เพิ่มรายการใหม่
        </button>
      </div>
    </div>
  );
};

export default Header;
