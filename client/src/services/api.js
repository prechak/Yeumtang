import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchDebtSummary = async () => {
  const response = await api.get(`/transactions`);
  return response.data;
};

export const fetchTransactions = async (userId) => {
  const response = await api.get(`/transactions`, { params: { userId } });
  return response.data;
};

export const fetchSummary = async (userId) => {
  const response = await api.get(`/summary`, { params: { userId } });
  return response.data.message;
};
