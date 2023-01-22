import "./App.css";
import Board from "./Board";
import { FixedPiece } from "./Piece";

const examplePiece: FixedPiece = {
  squares: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ],
  position: { x: 4, y: 4 },
};
const examplePiece2: FixedPiece = {
  squares: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
    { x: 1, y: 4 },
  ],
  position: { x: 0, y: 0 },
};

export default () => {
  return (
    <div className="App">
      <Board fixedPieces={[examplePiece, examplePiece2]} />
    </div>
  );
};
