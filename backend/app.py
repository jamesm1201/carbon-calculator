from urllib import response

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)


API_KEY = os.getenv("CLIMATIQ_API_KEY", "")
CLIMATIQ_URL = "https://api.climatiq.io/data/v1/estimate"

FUEL_ACTIVITY_IDS = {
    "diesel": "passenger_vehicle-vehicle_type_car-fuel_source_diesel-engine_size_na-vehicle_age_na-vehicle_weight_na",
    "petrol": "passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na",
}


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/commute", methods=["POST"])
def commute():
    data = request.get_json()
    distance = float(data["distance"])
    unit=data['unit']
    trips_per_week = int(data["trips_per_week"])
    fuel_type = data["fuel_type"]
    annual_distance = distance * trips_per_week * 52
    activity_id = FUEL_ACTIVITY_IDS[fuel_type]
    payload = {
        "emission_factor": {
            "activity_id": activity_id,
            "data_version": "^6"
        },
        "parameters": {
            "distance": annual_distance,
            "distance_unit": unit
        }
    }

    response = requests.post(
        CLIMATIQ_URL,
        headers={"Authorization": f"Bearer {API_KEY}"},
        json=payload
    )
    
    result = response.json()
    if response.status_code != 200:
        return jsonify({"error": result}), response.status_code
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)