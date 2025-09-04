import { z } from "zod";

export const OrderCreateSchema = z.object({
  userId: z.string().min(1),
  totalCents: z.number().int().nonnegative()
});

export const OrderEventSchema = z.object({
  orderId: z.string().min(1),
  type: z.string().min(1),
  payload: z.record(z.any())
});
