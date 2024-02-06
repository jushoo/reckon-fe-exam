import { z } from "zod";

export const StockPriceSchema = z.object({
  code: z.string(),
  price: z.number(),
});

export const StockPriceResponseSchema = StockPriceSchema.array();

export type StockPrice = z.infer<typeof StockPriceSchema>;
export type StockPriceResponse = z.infer<typeof StockPriceResponseSchema>;
