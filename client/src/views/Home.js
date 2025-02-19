import Header from "../components/Header";
import PieChart from "../components/PieChart";
import ExpenseTable from "../components/ExpenseTable";
import Legend from "../components/Legend";
import AddExpenseBtn from "../components/AddExpenseBtn";
import LineChart from "../components/LineChart";

function Home() {
  return (
    <div>
      <Header></Header>
      <PieChart></PieChart>
      <div className="my-3">
        <AddExpenseBtn></AddExpenseBtn>
        <Legend></Legend>
      </div>
      <ExpenseTable></ExpenseTable>
      <LineChart></LineChart>
    </div>
  );
}

export default Home;
