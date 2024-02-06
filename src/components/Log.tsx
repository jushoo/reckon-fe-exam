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
    <div className="justify-start flex-col w-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Log</h1>
        <button
          className="rounded bg-blue-500 px-4 py-2  m-2 text-white hover:cursor-pointer hover:bg-blue-700"
          onClick={handlePauseResume}
        >
          {isPolling ? `Pause Log` : `Resume Log`}
        </button>
      </div>

      {loading && <>Loading...</>}

      <div className="flex-1 bg-slate-50 rounded shadow-lg max-h-96 p-4 mt-4 text-slate-500 overflow-y-scroll">
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
