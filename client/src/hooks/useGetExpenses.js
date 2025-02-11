import { useQuery } from '@tanstack/react-query';

function useGetExpenses() {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3002/expense');
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      return response.json();
    },
  });
}

export default useGetExpenses;
