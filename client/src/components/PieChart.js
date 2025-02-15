import React from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Doughnut, Pie} from "react-chartjs-2"
import useGetPieChartData from '../hooks/useGetPieChartData'
import colors from '../data/colors'

function PieChart() {
  const { data, error, isLoading } = useGetPieChartData();
  const [pieChartData, setPieChartData] = React.useState([]);
  
  React.useEffect(() => {
    if (data) {
      setPieChartData(data);
      console.log(data)
      console.log(pieChartData)
    }
  }, [data]);

  return (
    <div className="container">
      <Doughnut className="mx-auto w-50 h-50"
        data = {{
            labels: pieChartData.map((item) => item.category),
            datasets: [
                {
                    label: "Total",
                    data: pieChartData.map((item) => item.sum),
                    backgroundColor: colors.map((color) => color),
                    borderWidth: 3,
                    borderColor:"RGB( 168, 213, 186)"
                    
                }]
        }}
        options={{
          plugins: {
              legend: {
                  position: 'right',
                  display: true
              }
          }
      }}
        />
    </div>
  );
}

export default PieChart;
