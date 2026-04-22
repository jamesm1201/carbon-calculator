import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("CLIMATIQ_API_KEY")

response = requests.get(
    "https://api.climatiq.io/data/v1/search",
    headers={"Authorization": f"Bearer {API_KEY}"},
    params={"query": "passenger vehicle petrol", "data_version": "^6"}
)

results = response.json()
for r in results["results"]:
    print(r["activity_id"])
    print(r["name"])
    print()