import React from "react";

export default function ActionModal({ closeModal, openFormModal }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">เลือกประเภทการทำรายการ</h2>
        <div className="flex flex-col gap-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => openFormModal("borrow")}
          >
            ยืมเงิน
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => openFormModal("repay")}
          >
            คืนเงิน
          </button>
        </div>
        <button
          onClick={closeModal}
          className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
}
