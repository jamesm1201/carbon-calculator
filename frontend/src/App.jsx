import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import CommutePage from "./pages/CommutePage";
import TotalPage from "./pages/TotalPage";
import FlightsPage from "./pages/FlightsPage";

export default function App() {
  const [results, setResults] = useState({
    commute: null,
    flights: null,
    energy: null,
  });
  // Reduce collapses Array, in this case sums items
  const totalCo2e = Object.values(results)
    .filter((r) => r !== null)
    .reduce((sum, r) => sum + r.co2e, 0);

  return (
    <Router>
      <nav>
        <span className="nav-brand">🌍 Carbon Calculator</span>
        <Link to="/commute">Commute</Link>
        <Link to="/flights">Flights</Link>
        <Link to="/total">Total</Link>
        <span className="nav-total">Total: {totalCo2e.toFixed(1)} kg CO₂e</span>
      </nav>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/commute" />} />
          <Route
            path="/commute"
            element={
              <CommutePage
                result={results.commute}
                //Spreads r which is current results state and only edits the commute
                onSubmit={(val) => setResults((r) => ({ ...r, commute: val }))}
              />
            }
          />
          <Route
            path="/flights"
            element={
              <FlightsPage
                result={results.flights}
                onSubmit={(val) => setResults((r) => ({ ...r, flights: val }))}
              />
            }
          />
          <Route path="/total" element={<TotalPage results={results} />} />
        </Routes>
      </div>
    </Router>
  );
}
