import { useQuery } from '@tanstack/react-query';

function useGetLineChartData() {
  return useQuery({
    queryKey: ['lineChartData'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3002/expense/date/`);
      if (!response.ok) {
        throw new Error("Failed to fetch Line Chart Data");
      }
      return response.json()
    },
  });
}

export default useGetLineChartData;
