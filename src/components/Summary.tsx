import { useEffect, useState } from "react";
import { StockPriceResponse } from "../schema/stock-price.schema";
import { max, min } from "lodash";

interface Props {
  data: StockPriceResponse;
  loading: boolean;
  error: Error | null;
}

interface TableState {
  [key: string]: number[];
}

export function Summary({ data }: Props) {
  const [tableData, setTableData] = useState<TableState>({});

  useEffect(() => {
    const keys = data.map((stock) => stock.code);
    const values = data.map((stock) => stock.price);

    setTableData(Object.fromEntries(keys.map((key, i) => [key, [values[i]]])));
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    const keys = data.map((stock) => stock.code);
    const values = data.map((stock) => stock.price);

    setTableData((t) => {
      return Object.fromEntries(
        keys.map((key, i) => [key, [...t[key], values[i]]])
      );
    });
  }, [data]);

  return (
    <div className="flex flex-col w-full min-h-full mx-4">
      <div className="text-3xl font-bold">Summary</div>
      <table className="mt-8 text-left rounded table-auto bg-slate-200">
        <thead>
          <tr className="text-xl text-white bg-slate-500">
            <th className="p-4 border-b border-white">Stock</th>
            <th className="p-4 border-b border-white">Starting</th>
            <th className="p-4 border-b border-white">Lowest</th>
            <th className="p-4 border-b border-white">Highest</th>
            <th className="p-4 border-b border-white">Current</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(tableData).map(([key, value]) => (
            <tr key={key}>
              <td className="p-4 font-bold border-b border-white">{key}</td>
              <td className="p-4 border-b border-white">{value[0]}</td>
              <td className="p-4 border-b border-white">{min(value)}</td>
              <td className="p-4 border-b border-white">{max(value)}</td>
              <td className="p-4 border-b border-white">
                {value[value.length - 1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
