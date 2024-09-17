import { useState, useEffect } from "react";
import axios from "axios";

const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const endpoint = userId
          ? `/api/transactions?userId=${userId}`
          : "/api/transactions";
        const response = await axios.get(`http://localhost:8080${endpoint}`);
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [userId]);

  return transactions;
};

export default useTransactions;
