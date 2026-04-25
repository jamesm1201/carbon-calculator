import rawAirports from "./airports.json";

export const AIRPORTS = Object.values(rawAirports)
  .filter(a => a.iata && a.iata !== "") // remove entries with no IATA code
  .map(a => ({
    value: a.iata,
    label: `${a.city} (${a.iata}) — ${a.country}`,
  }));

//   [
//   { value: "LHR", label: "London (LHR) — United Kingdom" },
//   { value: "MAD", label: "Madrid (MAD) — Spain" },
//   ...
// ] sort of result produced 
// Backend only needs the value to send to climatiq