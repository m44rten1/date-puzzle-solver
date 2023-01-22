import Tile from "./Tile";
import { BOARD } from "./Puzzle";
import "./Board.css";
import { FixedPiece } from "./Piece";

interface Board {
  fixedPieces: FixedPiece[];
}

const rowCount = Math.max(...BOARD.map((field) => field.position.x)) + 1;
const columnCount = Math.max(...BOARD.map((field) => field.position.y)) + 1;

const tiles: (string | undefined)[][] = [];

for (let i = 0; i < rowCount; i++) {
  tiles.push([]);
  for (let j = 0; j < columnCount; j++) {
    const piece = BOARD.find(({ position: { x, y } }) => x === i && y === j);
    tiles[i].push(piece?.label);
  }
}

export default ({ fixedPieces }: Board) => {
  return (
    <div className="Board">
      {tiles.map((row, i) => (
        <div>
          {row.map((label, j) => (
            <Tile
              label={label}
              piece={fixedPieces.find(
                ({ position: { x, y } }) => x === j && y === i
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
