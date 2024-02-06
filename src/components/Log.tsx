import { StockPriceResponse } from "../schema/stock-price.schema";

interface Props {
  data: StockPriceResponse | undefined;
  loading: boolean;
  error: Error | null;
}

export function Log({ data, loading, error }: Props) {
  return (
    <div className="justify-start flex-col w-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Log</h1>
        <button className="rounded bg-blue-500 px-4 py-2  m-2 text-white hover:cursor-pointer hover:bg-blue-700">
          Pause Log
        </button>
      </div>

      {loading && <>Loading...</>}

      <div className="flex-1 bg-slate-50 rounded shadow-lg h-full p-4 mt-4 text-slate-500">
        Updates for: {new Date().toISOString()}
        {error && <p>Failed fetching data, retrying in 2s...</p>}
        {data &&
          data.map((stockPrice) => (
            <p key={stockPrice.code}>
              {stockPrice.code}: {stockPrice.price}{" "}
            </p>
          ))}
      </div>
    </div>
  );
}
