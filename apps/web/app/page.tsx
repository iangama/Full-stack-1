"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState<any[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
    fetch(base + "/orders")
      .then(r => r.json())
      .then(d => setOrders(d.orders || []))
      .catch(() => {});
  }, [tick]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
    const es = new EventSource(base + "/events/stream");
    es.onmessage = () => setTick(t => t + 1);
    return () => es.close();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>HermesQ — Dashboard</h1>
      <p>Pedidos (atualiza via SSE)</p>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            <strong>{o.status}</strong> — R$ {(o.totalCents/100).toFixed(2)} — {o.id}
          </li>
        ))}
      </ul>
    </main>
  );
}
