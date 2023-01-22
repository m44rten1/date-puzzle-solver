import "./App.css";
import Board from "./Board";
import { FixedPiece, PIECES } from "./Piece";

const positions = [
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 0, y: 1 },
  { x: 2, y: 1 },
  { x: 5, y: 2 },
  { x: 1, y: 3 },
  { x: 0, y: 5 },
  { x: 3, y: 4 },
];

const examplePieces: FixedPiece[] = PIECES.map((piece, i) => {
  return { squares: piece.squares, position: positions[i] };
});

export default () => {
  return (
    <div className="App">
      <Board fixedPieces={examplePieces} />
    </div>
  );
};
