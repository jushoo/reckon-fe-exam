import { useQuery } from "@tanstack/react-query";

export function Log() {
  const { isPending, error, data } = useQuery({
    queryKey: ["stocksData"],
    queryFn: () =>
      fetch("https://join.reckon.com/stock-pricing").then((res) => res.json()),
  });

  return (
    <div className="justify-start flex-col w-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Log</h1>
        <button className="rounded bg-blue-500 px-4 py-2  m-2 text-white hover:cursor-pointer hover:bg-blue-700">
          Pause Log
        </button>
      </div>

      {isPending && <>Loading...</>}

      {console.log(data)}

      {data && (
        <div className="flex-1 bg-slate-50 rounded shadow-lg h-full p-4 mt-4">
          Updates for: {new Date().toISOString()}
          {data.map((stockPrice) => (
            <p>
              {stockPrice.code}: {stockPrice.price}{" "}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
