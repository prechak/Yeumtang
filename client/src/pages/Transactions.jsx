import React, { useEffect, useState } from "react";
import { fetchTransactions, fetchSummary } from "../services/api";
import Header from "../components/Header";
import Summary from "../components/Summary";
import TransactionTable from "../components/TransactionTable";

const Transactions = () => {
  const [userId, setUserId] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total_borrowed: 0,
    total_repaid: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const fetchedTransactions = await fetchTransactions(userId);
      setTransactions(fetchedTransactions);

      const fetchedSummary = await fetchSummary(userId);
      setSummary(fetchedSummary);
    };

    loadData();
  }, [userId]);

  const handleUserSelect = (id) => {
    setUserId(id);
  };

  return (
    <div className="container w-[100vw] mx-auto p-6">
      <Header onUserSelect={handleUserSelect} />
      <Summary summary={summary} />
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Transactions;
