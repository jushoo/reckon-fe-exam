import { Log } from "./components/Log";
import { Summary } from "./components/Summary";
import useStockPriceData from "./hooks/useStockPriceData";

function App() {
  const { data, isPending, error } = useStockPriceData();

  return (
    <>
      <main className="flex flex-row justify-between h-screen p-24">
        {!data ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-3xl font-bold">Loading...</p>
          </div>
        ) : (
          <>
            <Log data={data} loading={isPending} error={error} />
            <Summary data={data} loading={isPending} error={error} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
