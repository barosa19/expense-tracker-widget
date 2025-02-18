import React from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Doughnut, Pie} from "react-chartjs-2"
import useGetPieChartData from '../hooks/useGetPieChartData'
import colors from '../data/colors'
import {GlobalContext} from "../contexts/GlobalContext"
import { Spinner } from "react-bootstrap";

function PieChart() {
  const { darkMode } = React.useContext(GlobalContext);
  const { data, error, isLoading } = useGetPieChartData();
  const [pieChartData, setPieChartData] = React.useState([]);
  
  React.useEffect(() => {
    if (data) {
      setPieChartData(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={`text-center ${darkMode ? "text-light" : "text-dark"}`}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        <p>Failed to load expenses: {error.message}</p>
      </div>
    );
  }

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
                    borderColor:"RGB(33, 37, 41)"
                    
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
