import Tile from "./Tile";
import { BOARD } from "./Puzzle";

const rowCount = Math.max(...BOARD.map((field) => field.position.x)) + 1;
const columnCount = Math.max(...BOARD.map((field) => field.position.y)) + 1;

const tiles: (string | null)[][] = [];

for (let i = 0; i < rowCount; i++) {
  tiles.push([]);
  for (let j = 0; j < columnCount; j++) {
    const piece = BOARD.find(({ position: { x, y } }) => x === i && y === j);
    tiles[i].push(piece?.label || null);
  }
}

export default () => {
  return (
    <div>
      {tiles.map((row) => (
        <div>
          {row.map((label) => (
            <Tile label={label} />
          ))}
        </div>
      ))}
    </div>
  );
};
