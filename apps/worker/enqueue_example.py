import os
import redis
from rq import Queue

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
conn = redis.from_url(REDIS_URL)
q = Queue("default", connection=conn)

if __name__ == "__main__":
  payload = {"orderId": "demo", "totalCents": 19900}
  job = q.enqueue("worker.antifraude", payload)
  print("Job enfileirado:", job.get_id())
