import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import { OrderCreateSchema } from "@hermesq/shared";

declare module "fastify" { interface FastifyInstance { prisma: PrismaClient; } }

export const orderRoutes: FastifyPluginAsync = async (app) => {
  app.post("/", async (req, res) => {
    const parsed = OrderCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send({ error: parsed.error });
    const order = await app.prisma.order.create({
      data: { ...parsed.data, status: "PENDING" }
    });
    return { order };
  });

  app.get("/", async () => {
    const orders = await app.prisma.order.findMany({ orderBy: { createdAt: "desc" } });
    return { orders };
  });
};
