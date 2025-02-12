import React from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Doughnut} from "react-chartjs-2"
import useGetExpenseTypeTotal from '../hooks/useGetExpenseTypesTotal'
import colors from '../data/colors'

function PieChart() {
  const { data, error, isLoading } = useGetExpenseTypeTotal();
  const [pieChartData, setPieChartData] = React.useState([]);
  
  React.useEffect(() => {
    if (data) {
      setPieChartData(data);
      console.log(data)
      console.log(pieChartData)
    }
  }, [data]);

  return (
    <div className="w-25">
      <Doughnut
        data = {{
            labels: pieChartData.map((item) => item.category),
            datasets: [
                {
                    label: "Total",
                    data: pieChartData.map((item) => item.sum),
                    backgroundColor: colors.map((color) => color),
                    borderRadius: 5
                }]
        }}
        options={{
          plugins: {
              legend: {
                  display: false
              }
          }
      }}
        />
    </div>
  );
}

export default PieChart;
