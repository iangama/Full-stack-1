import { z } from "zod";

/** payload para criação de pedido */
export const OrderCreateSchema = z.object({
  userId: z.string().min(1),
  totalCents: z.number().int().nonnegative(),
});
export type OrderCreate = z.infer<typeof OrderCreateSchema>;

/** (opcional) outros exemplos de payloads/eventos */
export const OrderEventSchema = z.object({
  orderId: z.string().min(1),
  type: z.enum(["CREATED", "APPROVED", "REJECTED"]),
  at: z.date().or(z.string()),
});
export type OrderEvent = z.infer<typeof OrderEventSchema>;
