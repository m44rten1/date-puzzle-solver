export const PIECES = [];

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

export { BOARD };
