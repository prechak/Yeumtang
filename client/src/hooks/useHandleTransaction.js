import axios from "axios";

const useHandleTransaction = ({
  selectedUser,
  modalAction,
  setIsFormModalOpen,
  fetchTransactions,
  fetchSummary,
}) => {
  const handleAddTransaction = async (formData) => {
    try {
      const payload = {
        lenderId: parseInt(formData.lenderId),
        borrowerId: parseInt(formData.borrowerId),
        amount: parseFloat(formData.amount),
      };
      const endpoint = modalAction === "borrow" ? "/api/borrow" : "/api/repay";

      await axios.post(`http://localhost:8080${endpoint}`, payload);
      setIsFormModalOpen(false);

      const refreshId =
        selectedUser === "both" ? null : selectedUser === "A" ? 1 : 2;

      fetchTransactions(refreshId);
      fetchSummary();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAddTransaction };
};

export default useHandleTransaction;
