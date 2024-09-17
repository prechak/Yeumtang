import React from "react";

const Summary = ({ selectedUser, summary }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">สรุปการติดหนี้</h2>
      <div className="bg-gray-100 p-4 rounded">
        {selectedUser === "both" ? (
          <>
            <p className="text-gray-700">
              นาย A ยืมเงิน นาย B ทั้งหมด:{" "}
              <span className="text-red-500 font-bold">
                {summary.total_borrowed_A} บาท
              </span>
            </p>
            <p className="text-gray-700">
              นาย A คืนเงิน นาย B แล้วทั้งหมด:{" "}
              <span className="text-green-500 font-bold">
                {summary.total_repaid_A} บาท
              </span>
            </p>
            <p className="text-gray-700">
              นาย B ยืมเงิน นาย A ทั้งหมด:{" "}
              <span className="text-red-500 font-bold">
                {summary.total_borrowed_B} บาท
              </span>
            </p>
            <p className="text-gray-700">
              นาย B คืนเงิน นาย A แล้วทั้งหมด:{" "}
              <span className="text-green-500 font-bold">
                {summary.total_repaid_B} บาท
              </span>
            </p>
          </>
        ) : (
          <div>
            <p className="text-gray-700">
              นาย {selectedUser === "A" ? "A" : "B"} ยืมเงิน นาย{" "}
              {selectedUser === "A" ? "B" : "A"} ทั้งหมด:{" "}
              <span className="text-red-500 font-bold">
                {summary.total_borrowed} บาท
              </span>
            </p>
            <p className="text-gray-700">
              นาย {selectedUser === "A" ? "A" : "B"} คืนเงิน นาย{" "}
              {selectedUser === "A" ? "B" : "A"} แล้วทั้งหมด:{" "}
              <span className="text-green-500 font-bold">
                {summary.total_repaid} บาท
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
