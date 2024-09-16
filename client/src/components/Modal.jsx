import React, { useState, useRef, useEffect } from "react";
import { addTransaction } from "../services/api";

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    lenderId: "",
    borrowerId: "",
    amount: "",
  });

  const modalRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the user selects a new borrower or lender, check for the swap condition
    if (name === "borrowerId") {
      // If borrower and lender are the same, update lender to be different
      if (value === formData.lenderId) {
        setFormData({
          ...formData,
          [name]: value,
          lenderId: value === "value1" ? "value2" : "value1",
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "lenderId") {
      // If borrower and lender are the same, update borrower to be different
      if (value === formData.borrowerId) {
        setFormData({
          ...formData,
          [name]: value,
          borrowerId: value === "value1" ? "value2" : "value1",
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      // Handle amount change
      if (name === "amount" && (value < 0 || isNaN(value))) {
        return; // Do nothing if the value is negative or not a number
      }
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(formData).then(() => {
      onClose();
      setFormData({ lenderId: "", borrowerId: "", amount: "" });
    });
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-6 w-[25rem] rounded shadow-lg">
        <h2 className="text-xl mb-4 text-black">เพิ่มรายการใหม่</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-black">ผู้ยืม</label>
            <select
              name="borrowerId"
              value={formData.borrowerId}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-black"
            >
              <option value="" disabled>
                เลือกผู้ยืม
              </option>
              <option value="value1">นาย A</option>
              <option value="value2">นาย B</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-black">ผู้ให้ยืม</label>
            <select
              name="lenderId"
              value={formData.lenderId}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-black"
            >
              <option value="" disabled>
                เลือกผู้ให้ยืม
              </option>
              <option value="value1">นาย A</option>
              <option value="value2">นาย B</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-black">จำนวน(บาท)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0" // This ensures that negative values are not allowed
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            เพิ่ม
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            ยกเลิก
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
