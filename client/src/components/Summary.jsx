import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton"; // Import Skeleton

const Summary = ({ selectedUser, summary }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [summary]);

  const isLoading = loading || !summary;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">สรุปการติดหนี้</h2>
      <div className="bg-gray-100 p-4 rounded">
        {isLoading ? (
          <div>
            <p className="text-gray-700">
              <Skeleton width={300} height={20} />
            </p>
            <p className="text-gray-700">
              <Skeleton width={350} height={20} />
            </p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
