import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import ExpenseTable from "./components/ExpenseTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <PieChart></PieChart>
        <ExpenseTable></ExpenseTable>
      </QueryClientProvider>
    </div>
  );
}

export default App;
