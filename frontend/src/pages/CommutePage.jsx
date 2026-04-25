import CommuteForm from "../components/CommuteForm";
import CommuteResult from "../components/CommuteResult";

export default function CommutePage({result, onSubmit}) {

  return (
    <>
      <CommuteForm onSubmit={onSubmit} />
      {result && <CommuteResult result={result} />}
    </>
  );
}
