import { useQuery } from '@tanstack/react-query';

function useGetExpenseTypesTotal() {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3002/expense/category`);
      if (!response.ok) {
        throw new Error("Failed to fetch category total");
      }
      return response.json()
    },
  });
}

export default useGetExpenseTypesTotal;
