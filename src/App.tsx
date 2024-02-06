import { Log } from "./components/Log";
import { Summary } from "./components/Summary";
import useStockPriceData from "./hooks/useStockPriceData";

function App() {
  const { data, isPending, error } = useStockPriceData();

  console.log(data);

  return (
    <>
      <div className="flex w-full justify-center min-h-screen py-24">
        <div className="flex-1 px-8">
          <Log data={data} loading={isPending} error={error} />
        </div>
        <div className="flex-1 px-8">
          <Summary />
        </div>
      </div>
    </>
  );
}

export default App;
