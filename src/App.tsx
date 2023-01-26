import { useState } from "react";
import "./App.css";
import Board from "./Board";
import DateInput from "./DateInput";
import { FixedPiece } from "./Piece";
import solver from "./Solver";

export default () => {
  const [fixedPieces, setFixedPieces] = useState([] as FixedPiece[]);

  const notifyDateChange = (day: string, month: string) => {
    const solutions = solver(day, month);
    setFixedPieces(solutions || []);
  };

  return (
    <div className="App">
      <DateInput notifyDateChange={notifyDateChange} />
      <Board fixedPieces={fixedPieces} />
    </div>
  );
};
