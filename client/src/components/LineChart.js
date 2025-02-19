import React from "react";
import { Line } from "react-chartjs-2";
import useGetLineChartData from "../hooks/useGetLineChartData"
import {GlobalContext} from "../contexts/GlobalContext"
import { Spinner } from "react-bootstrap";
import categories from "../data/categories";
import colors from '../data/colors'

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { darkMode } = React.useContext(GlobalContext);
  const [lineChartData, setLineChartData] = React.useState([]);
  const { data, error, isLoading } = useGetLineChartData()
  React.useEffect(() => {
    if (data) {
      setLineChartData(data);
    }
  }, [data]);

  const months = ["Jan","Feb","Mar","Apr","May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const chartData = {
    labels: months,
    datasets: categories.map((cat)=> {
      const filterData = lineChartData.filter((data) => data.category == cat)
      return { 
        label: cat,
        data: filterData.map((item) => item.sum),
        pointRadius: 0,
        backgroundColor: colors.map((color) => color),
        borderColor: colors.map((color) => color)}
    }),
    
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Spending by Category(in 2025" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Amount Spent ($)" },
      },
      x: { title: { display: true, text: "Months" } },
    },
  };

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

  return <Line data={chartData} options={options} />;
};

export default LineChart;
