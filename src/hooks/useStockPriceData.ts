import { useQuery } from "@tanstack/react-query";
import { StockPriceResponseSchema } from "../schema/stock-price.schema";

export default function useStockPriceData() {
  const { isPending, error, data } = useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      const response = await (
        await fetch("https://join.reckon.com/stock-pricing")
      ).json();

      return StockPriceResponseSchema.parse(response);
    },
    refetchInterval: 2000,
  });

  return { isPending, error, data };
}
