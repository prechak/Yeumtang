// hooks/useSummary.js
import { useState, useEffect } from "react";
import axios from "axios";

const useSummary = (userId) => {
  const [summary, setSummary] = useState({});

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/summary?userId=${userId}`
      );
      setSummary(response.data.message);
    } catch (error) {
      console.error(error);
      setSummary({});
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSummary();
    }
  }, [userId]);

  return { summary, fetchSummary };
};

export default useSummary;
