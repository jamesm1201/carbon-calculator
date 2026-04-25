import { useState, useEffect } from "react";
import FlightEntry from "./FlightEntry.jsx";

export default function FlightsForm({onSubmit}) {
  const [airports, setAirports] = useState([]);
  // Trips array to send to climatiq
  const [trips, setTrips] = useState([
    { from: null, to: null, cabin_class: "economy", is_return: true },
  ]);

  // Runs on component mount - automatically gets data
  // Lazy load since it doesn't import at top, only gets sent to browser on page load
  useEffect(() => {
    import("../constants/airports.js").then((module) => {
      setAirports(module.AIRPORTS);
    });
  }, []);

  // Appends new trip to array
  const addTrip = () => {
    setTrips((t) => [
      ...t,
      { from: null, to: null, cabin_class: "economy", is_return: true },
    ]);
  };

  // Updates a single field on trip by index
  const updateTrip = (index, field, value) => {
    setTrips(trips.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
  };

  const handleSubmit = async () => {
    // Basic validation - check every trip has from and to filled in
    const allValid = trips.every((t) => t.from && t.to);
    if (!allValid) {
      alert("Please fill in all airport fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trips }),
      });

      const data = await response.json();
      // Bubbles up to flights page
      onSubmit(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form">
      <h1>Flight Emissions</h1>

      {trips.map((trip, index) => (
        // Key is used so React can track which entry is which
        <FlightEntry
          key={index}
          trip={trip}
          index={index}
          onChange={updateTrip}
          airports={airports}
        />
      ))}

      <button type="button" onClick={addTrip}>
        + Add Flight
      </button>
      <button type="button" onClick={handleSubmit}>
        Calculate
      </button>
    </div>
  );
}
