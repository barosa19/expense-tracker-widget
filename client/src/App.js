import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./views/Home";
import GlobalContextProvider from "./contexts/GlobalContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <QueryClientProvider client={queryClient}>
          <Home></Home>
        </QueryClientProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
