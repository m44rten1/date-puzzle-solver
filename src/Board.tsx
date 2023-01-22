import Tile from "./Tile";

interface Field {
  position: { x: number; y: number };
  label: string;
}

const fields: Field[] = [
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
