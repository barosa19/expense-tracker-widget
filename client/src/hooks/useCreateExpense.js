import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newExpense) => {
      const response = await fetch("http://localhost:3002/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });
      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      return response.json(); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
    onError: (error) => {
      console.error("Error adding expense:", error);
      alert("Failed to add expense");
    },
  });
};

export default useCreateExpense;
