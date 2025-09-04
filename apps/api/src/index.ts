import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import jwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import { orderRoutes } from "./routes/orders.js";
import { eventRoutes } from "./routes/events.js";

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.register(cors, { origin: true });
app.register(rateLimit, { max: 200, timeWindow: "1 minute" });
app.register(jwt, { secret: process.env.JWT_SECRET || "devsupersecret" });

app.decorate("prisma", prisma);

app.get("/health", async () => ({ ok: true }));

app.register(orderRoutes, { prefix: "/orders" });
app.register(eventRoutes, { prefix: "/events" });

const port = Number(process.env.API_PORT || 4000);
app.listen({ port, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
