import Tile from "./Tile";
import { fields } from "./Puzzle";

const rowCount = Math.max(...fields.map((field) => field.position.x)) + 1;
const columnCount = Math.max(...fields.map((field) => field.position.y)) + 1;

console.log({ rowCount, columnCount });

export default () => {
  return (
    <div>
      <Tile label={"test"} />
    </div>
  );
};
