import { useEffect, useState } from "react";
import { StockPriceResponse } from "../schema/stock-price.schema";
import { v4 } from "uuid";

interface Props {
  data: StockPriceResponse | undefined;
  loading: boolean;
  error: Error | null;
}

interface UpdatesState {
  date: string;
  updates: StockPriceResponse | undefined;
}

export function Log({ data, loading, error }: Props) {
  const [updates, setUpdates] = useState<UpdatesState[]>([
    {
      date: new Date().toISOString(),
      updates: data,
    },
  ]);

  const [isPolling, setIsPolling] = useState<boolean>(true);

  useEffect(() => {
    if (!isPolling) {
      return;
    }

    setUpdates((u) => [
      {
        date: new Date().toISOString(),
        updates: data,
      },
      ...u,
    ]);
  }, [data, isPolling]);

  function handlePauseResume() {
    setIsPolling(!isPolling);
  }

  return (
    <div className="justify-start w-full h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Log</h1>
        <button
          className="px-4 py-2 m-2 text-white bg-blue-500 rounded hover:cursor-pointer hover:bg-blue-700"
          onClick={handlePauseResume}
        >
          {isPolling ? `Pause Log` : `Resume Log`}
        </button>
      </div>

      {loading && <>Loading...</>}

      <div className="max-h-full p-4 overflow-y-scroll rounded shadow-lg bg-slate-50 text-slate-500">
        {updates &&
          updates.map((data) => (
            <>
              {error && <p>Failed fetching data, retrying in 2s...</p>}
              {data.updates?.length && <p>Updates for: {data.date}</p>}
              {data.updates?.map((stockPrice) => (
                <p key={`${stockPrice.code}-${v4()}`}>
                  {stockPrice.code}: {stockPrice.price}{" "}
                </p>
              ))}
              <br />
              <br />
            </>
          ))}
      </div>
    </div>
  );
}
