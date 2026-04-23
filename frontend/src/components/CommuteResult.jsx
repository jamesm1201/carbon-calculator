import ResultsBarChart from "./ResultsBarChart";
import { UK_AVERAGES } from "../constants/ukAverages";

export default function CommuteResult({ result }) {
  const comparisons = [
    { name: "UK Petrol Avg", value: UK_AVERAGES.petrol },
    { name: "UK Diesel Avg", value: UK_AVERAGES.diesel },
  ];
  return (
    <div className="result">
      <h2>Your Annual Commute Emissions</h2>
      <p>
        {result.co2e.toFixed(2)} {result.co2e_unit} CO₂e
      </p>
      <ResultsBarChart userResult={result.co2e} comparisons={comparisons} />
    </div>
  );
}
