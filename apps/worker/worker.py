import os, time
import redis
from rq import Queue, Worker, Connection

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
conn = redis.from_url(REDIS_URL)
q = Queue("default", connection=conn)

def antifraude(job_payload: dict) -> dict:
  total = job_payload.get("totalCents", 0)
  status = "REPROVADO" if total > 500000 else "APROVADO"
  time.sleep(1.5)
  return {"status": status}

if __name__ == "__main__":
  print("Worker conectado no Redis:", REDIS_URL)
  with Connection(conn):
    Worker([q]).work(with_scheduler=True)
