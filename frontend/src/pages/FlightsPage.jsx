import FlightsForm from "../components/FlightsForm";

export default function FlightsPage({result, onSubmit}) {

  return (
    <>
      <FlightsForm onSubmit={onSubmit} />
      {/* {result && <FlightsResult result={result} />} */}
    </>
  );
}