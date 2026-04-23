import { useState } from "react";
import CommuteForm from "../components/CommuteForm";
import CommuteResult from "../components/CommuteResult";

export default function CommutePage() {
  const [result, setResult] = useState(null);

  return (
    <>
      <CommuteForm onSubmit={setResult} />
      {result && <CommuteResult result={result} />}
    </>
  );
}
