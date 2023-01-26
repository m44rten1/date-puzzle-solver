import Tile from "./Tile";
import "./Board.css";
import { FixedPiece } from "./Piece";

export interface Field {
  position: { x: number; y: number };
  label: string;
}

export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const BOARD: Field[] = [];

for (let i = 0; i < 12; i++) {
  BOARD.push({
    position: { x: Math.floor(i / 6), y: i % 6 },
    label: MONTHS[i],
  });
}

const DAYS_IN_A_MONTH = 31;
for (let i = 0; i < DAYS_IN_A_MONTH; i++) {
  BOARD.push({
    position: {
      x: 2 + Math.floor(i / 7),
      y: i % 7,
    },
    label: String(i + 1),
  });
}

interface Board {
  fixedPieces: FixedPiece[];
}

const rowCount = Math.max(...BOARD.map((field) => field.position.x)) + 1;
const columnCount = Math.max(...BOARD.map((field) => field.position.y)) + 1;

export const TILES: (string | undefined)[][] = [];

for (let i = 0; i < rowCount; i++) {
  TILES.push([]);
  for (let j = 0; j < columnCount; j++) {
    const piece = BOARD.find(({ position: { x, y } }) => x === i && y === j);
    TILES[i].push(piece?.label);
  }
}

export default ({ fixedPieces }: Board) => {
  return (
    <div className="Board">
      {TILES.map((row, i) => (
        <div key={i}>
          {row.map((label, j) => (
            <Tile
              key={`${i},${j}`}
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
