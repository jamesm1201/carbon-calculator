import { useState } from "react";


export default function CommuteForm({onSubmit}) {
  const [distance, setDistance] = useState("");
  const [trips_per_week, setTripsPerWeek] = useState("");
  const [fuel_type, setFuelType] = useState("petrol");
  const [unit, setUnit] = useState("km");

  async function handleSubmit() {
    const response = await fetch("http://localhost:5000/api/commute", {
      method: "POST",
      // Informs that JSON is arriving
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        distance: distance,
        trips_per_week: trips_per_week,
        fuel_type: fuel_type,
        unit: unit,
      }),
    });
    const result = await response.json();
    onSubmit(result)
  }

  return (
    <div className="form">
      <h1>Commute Emissions</h1>
      <label>Distance</label>
      <input
        type="number"
        placeholder="Total distance driven in a day"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <label>Unit</label>
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="km">Kilometers</option>
        <option value="mi">Miles</option>
      </select>
      <label>Trips Per Week</label>
      <input
        type="number"
        value={trips_per_week}
        placeholder="Amount of days you are in office"
        onChange={(e) => setTripsPerWeek(e.target.value)}
      />
      <label>Fuel Type</label>
      <select value={fuel_type} onChange={(e) => setFuelType(e.target.value)}>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
      </select>
      <button onClick={handleSubmit}>Calculate</button>
    </div>
  );
}
