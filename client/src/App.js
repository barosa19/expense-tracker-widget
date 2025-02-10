import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import PieChart from './components/PieChart'
import ExpenseTable from './components/ExpenseTable'
import AddExpenseForm from './components/AddExpenseForm'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <Header></Header>
      <PieChart></PieChart>
      <ExpenseTable></ExpenseTable>
    </div>
  );
}

export default App;
