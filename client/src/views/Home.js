import Header from "../components/Header";
import PieChart from "../components/PieChart";
import ExpenseTable from "../components/ExpenseTable";
import Legend from "../components/Legend";
import AddExpenseBtn from "../components/AddExpenseBtn";
import LineChart from "../components/LineChart";
import Carousel from 'react-bootstrap/Carousel';
import "../style.css"

function Home() {
  return (
    <div>
      <Header></Header>
      <Carousel slide={false} interval={null} controls={true}>
        <Carousel.Item >
          <PieChart></PieChart>
        </Carousel.Item>
        <Carousel.Item>
          <LineChart></LineChart>
        </Carousel.Item>
      </Carousel>
      <div className="my-3">
        <AddExpenseBtn></AddExpenseBtn>
        <Legend></Legend>
      </div>
      <ExpenseTable></ExpenseTable>
    </div>
  );
}

export default Home;
