import React, { useRef } from "react";

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
  const modalRef = useRef(null);

  const handleBorrowerChange = (e) => {
    const newBorrowerId = e.target.value;
    setBorrowerId(newBorrowerId);

    if (newBorrowerId === "1") {
      setLenderId("2");
    } else if (newBorrowerId === "2") {
      setLenderId("1");
    }
  };

  const handleLenderChange = (e) => {
    const newLenderId = e.target.value;
    setLenderId(newLenderId);

    if (newLenderId === "1") {
      setBorrowerId("2");
    } else if (newLenderId === "2") {
      setBorrowerId("1");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ borrowerId, lenderId, amount });
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          เพิ่มรายการใหม่
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              {titles.borrowerTitle}
            </label>
            <select
              value={borrowerId}
              onChange={handleBorrowerChange}
              className="w-full px-4 py-2 border rounded-md bg-white text-black"
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="1">นาย A</option>
              <option value="2">นาย B</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{titles.lenderTitle}</label>
            <select
              value={lenderId}
              onChange={handleLenderChange}
              className="w-full px-4 py-2 border rounded-md bg-white text-black"
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="1">นาย A</option>
              <option value="2">นาย B</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{titles.amountTitle}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-white text-black"
              min="0"
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
