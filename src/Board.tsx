import Tile from "./Tile";
import "./Board.css";
import { FixedPiece } from "./Piece";

export interface Field {
  position: { x: number; y: number };
  label: string;
}

const BOARD: Field[] = [
  { position: { x: 0, y: 0 }, label: "JAN" },
  { position: { x: 0, y: 1 }, label: "FEB" },
  { position: { x: 0, y: 2 }, label: "MAR" },
  { position: { x: 0, y: 3 }, label: "APR" },
  { position: { x: 0, y: 4 }, label: "MAY" },
  { position: { x: 0, y: 5 }, label: "JUN" },
  { position: { x: 1, y: 0 }, label: "JUL" },
  { position: { x: 1, y: 1 }, label: "AUG" },
  { position: { x: 1, y: 2 }, label: "SEP" },
  { position: { x: 1, y: 3 }, label: "OCT" },
  { position: { x: 1, y: 4 }, label: "NOV" },
  { position: { x: 1, y: 5 }, label: "DEC" },
];

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
