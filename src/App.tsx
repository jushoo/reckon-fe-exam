import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Log } from "./components/Log";
import { Summary } from "./components/Summary";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full justify-center min-h-screen py-24">
        <div className="flex-1 px-8">
          <Log />
        </div>
        <div className="flex-1 px-8">
          <Summary />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
