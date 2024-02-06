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
    <div className="flex flex-col">
      <div className="text-3xl font-bold">Summary</div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Starting</th>
            <th>Lowest</th>
            <th>Highest</th>
            <th>Current</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(tableData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value[0]}</td>
              <td>{min(value)}</td>
              <td>{max(value)}</td>
              <td>{value[value.length - 1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
