import ResultsBarChart from "./ResultsBarChart";

export default function CommuteResult({ result }) {
  return (
    <div className="result">
      <h2>Your Annual Commute Emissions</h2>
      <p>
        {result.co2e.toFixed(2)} {result.co2e_unit} CO₂e
      </p>
      <ResultsBarChart userResult={result.co2e} />
    </div>
  );
}
