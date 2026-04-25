import Select from "react-select";

export default function FlightEntry({ trip, index, onChange, airports }) {
  return (
    <div className="flight-entry">
      <Select
        options={airports}
        value={airports.find((a) => a.value === trip.from) || null}
        onChange={(selected) => onChange(index, "from", selected.value)}
        placeholder="From airport..."
      />
      <Select
        options={airports}
        value={airports.find(a => a.value === trip.to) || null}
        onChange={(selected) => onChange(index, "to", selected.value)}
        placeholder="To airport..."
      />
      <select
        value={trip.cabin_class}
        onChange={(e) => onChange(index, "cabin_class", e.target.value)}
      >
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={trip.is_return}
          onChange={(e) => onChange(index, "is_return", e.target.checked)}
        />
        Return trip
      </label>
    </div>
  );
}
