import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import { OrderEventSchema } from "@hermesq/shared";

declare module "fastify" { interface FastifyInstance { prisma: PrismaClient; } }

export const eventRoutes: FastifyPluginAsync = async (app) => {
  app.post("/", async (req, res) => {
    const parsed = OrderEventSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send({ error: parsed.error });
    const { orderId, type, payload } = parsed.data;

    const event = await app.prisma.event.create({ data: { orderId, type, payload } });
    if (type === "PAID") {
      await app.prisma.order.update({ where: { id: orderId }, data: { status: "PAID" } });
    }
    return { event };
  });

  // SSE simples
  app.get("/stream", async (_req, res) => {
    res.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*"
    });
    res.raw.write(`event: ping\ndata: "connected"\n\n`);
  });
};
