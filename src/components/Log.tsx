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
    <div className="flex flex-col w-full min-h-full mx-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Log</h1>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handlePauseResume}
        >
          {isPolling ? `Pause Log` : `Resume Log`}
        </button>
      </div>

      {loading && <>Loading...</>}

      <div className="max-h-full p-4 mt-8 overflow-y-scroll font-mono rounded bg-slate-200">
        {updates &&
          updates.map((data) => (
            <>
              {error && <p>Failed fetching data, retrying in 2s...</p>}
              {data.updates?.length && (
                <p className="font-semibold">Updates for: {data.date}</p>
              )}
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
