import { useEffect, useState } from "react";
import "./App.css";
import Board from "./Board";
import DateInput from "./DateInput";
import Loader from "./Loader";
import { FixedPiece } from "./Piece";
import solver from "./Solver";

export default () => {
  const [fixedPieces, setFixedPieces] = useState([] as FixedPiece[]);
  const [loading, setLoading] = useState(false);

  const notifyDateChange = (day: string, month: string) => {
    setLoading(true);
    setTimeout(() => {
      const solutions = solver(day, month);
      setFixedPieces(solutions || []);
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    notifyDateChange("1", "JAN");
  }, []);

  return (
    <div className="App">
      <Board fixedPieces={fixedPieces} />
      {loading && <Loader />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <DateInput notifyDateChange={notifyDateChange} />
      </div>
    </div>
  );
};
