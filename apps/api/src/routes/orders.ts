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

app.post(":id/approve", async (req, res) => {
  const { id } = req.params as { id: string };

  try {
    const order = await app.prisma.order.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    return { order };
  } catch {
    return res.status(404).send({ error: "Order not found" });
  }
});
  app.get("/", async () => {
    const orders = await app.prisma.order.findMany({ orderBy: { createdAt: "desc" } });
    return { orders };
  });
  app.post("/:id/confirm", async (req, res) => {
    const id = (req.params as any).id;
    const { approved } = req.body as { approved: boolean };
    const status = approved ? "APPROVED" : "REJECTED";
    const order = await app.prisma.order.update({ where: { id }, data: { status } });
    return res.send({ order });
  });
};
