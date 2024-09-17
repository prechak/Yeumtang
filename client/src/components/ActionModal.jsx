import React, { useEffect, useRef } from "react";

export default function ActionModal({ closeModal, openFormModal }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div ref={modalRef} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          เลือกประเภทการทำรายการ
        </h2>
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
