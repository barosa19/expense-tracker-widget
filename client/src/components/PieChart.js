import React from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Doughnut, Pie} from "react-chartjs-2"
import useGetPieChartData from '../hooks/useGetPieChartData'
import colors from '../data/colors'
import {GlobalContext} from "../contexts/GlobalContext"

function PieChart() {
  const { darkMode } = React.useContext(GlobalContext);
  const { data, error, isLoading } = useGetPieChartData();
  const [pieChartData, setPieChartData] = React.useState([]);
  
  React.useEffect(() => {
    if (data) {
      setPieChartData(data);
    }
  }, [data]);

  return (
    <div className="container" data-bs-theme={darkMode ? "dark" : "light"}> 
      <Doughnut className="mx-auto my-3" 
        data = {{
            labels: pieChartData.map((item) => item.category),
            datasets: [
                {
                    label: "Total",
                    data: pieChartData.map((item) => item.sum),
                    backgroundColor: colors.map((color) => color),
                    borderWidth: 3,
                    borderColor:"RGB(2, 17, 36)"
                    
                }]
        }}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  let value = tooltipItem.raw;
                  return `Total: NOK ${value}`; 
                },
              },
            },
              legend: {
                  display: false,
              }
          }}}
        />
    </div>
  );
}

export default PieChart;
