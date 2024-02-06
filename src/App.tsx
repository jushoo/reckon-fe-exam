import { Log } from "./components/Log";
import { Summary } from "./components/Summary";
import useStockPriceData from "./hooks/useStockPriceData";

function App() {
  const { data, isPending, error } = useStockPriceData();

  return (
    <>
      <div className="flex justify-center w-full max-h-screen py-4">
        <div className="flex-1 max-h-full px-8">
          <Log data={data} loading={isPending} error={error} />
        </div>
        <div className="flex-1 px-8">
          {!data ? (
            <p>Loading...</p>
          ) : (
            <Summary data={data} loading={isPending} error={error} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
