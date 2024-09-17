import React from "react";

export default function Modal({
  borrowerId,
  lenderId,
  amount,
  setBorrowerId,
  setLenderId,
  setAmount,
  closeModal,
  handleSubmit,
  titles,
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ borrowerId, lenderId, amount });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">เพิ่มรายการใหม่</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              {titles.borrowerTitle}
            </label>
            <input
              type="number"
              value={borrowerId}
              onChange={(e) => setBorrowerId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="ID ผู้ยืม"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{titles.lenderTitle}</label>
            <input
              type="number"
              value={lenderId}
              onChange={(e) => setLenderId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="ID ผู้ให้ยืม"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{titles.amountTitle}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="จำนวนเงิน"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
