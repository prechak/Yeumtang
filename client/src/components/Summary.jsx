import React from "react";

const Summary = ({ summary }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">สรุปการติดหนี้</h2>
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-gray-700">
          ยืมเงินคงเหลือ:{" "}
          <span className="text-red-500 font-bold">
            {summary.total_borrowed} บาท
          </span>
        </p>
        <p className="text-gray-700">
          คืนเงินแล้ว:{" "}
          <span className="text-green-500 font-bold">
            {summary.total_repaid} บาท
          </span>
        </p>
      </div>
    </div>
  );
};

export default Summary;
