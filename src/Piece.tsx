export interface Square {
  x: number;
  y: number;
}

export interface Piece {
  squares: Square[];
  symmetries: { rotations: number; mirror: boolean }[];
}

export interface FixedPiece {
  squares: Square[];
  position: { x: number; y: number };
}

export const PIECES: Piece[] = [
  {
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 1 },
    ],
    symmetries: [{ rotations: 4, mirror: false }],
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ],
    symmetries: [{ rotations: 4, mirror: false }],
  },
  {
    squares: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    symmetries: [{ rotations: 4, mirror: false }],
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    symmetries: [{ rotations: 4, mirror: false }],
  },
  {
    squares: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ],
    symmetries: [{ rotations: 4, mirror: false }],
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],
    symmetries: [{ rotations: 4, mirror: false }],
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    symmetries: [{ rotations: 4, mirror: false }],
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    symmetries: [{ rotations: 2, mirror: false }],
  },
];

export const squaresToSvg = (fixedPiece: FixedPiece) => {
  const verticalRectangles = fixedPiece.squares.reduce((acc, current) => {
    const vertical = fixedPiece.squares.find(
      ({ x, y }) => x === current.x && y === current.y + 1
    );
    if (vertical) acc.push(current);

    return acc;
  }, [] as Square[]);

  const horizontalRectangles = fixedPiece.squares.reduce((acc, current) => {
    const horizontal = fixedPiece.squares.find(
      ({ x, y }) => x === current.x + 1 && y === current.y
    );

    if (horizontal) acc.push(current);

    return acc;
  }, [] as Square[]);

  console.log({ verticalRectangles, horizontalRectangles });

  const maxX = Math.max(...fixedPiece.squares.map((square) => square.x));
  const maxY = Math.max(...fixedPiece.squares.map((square) => square.y));

  const minX = Math.min(...fixedPiece.squares.map((square) => square.x));
  const minY = Math.min(...fixedPiece.squares.map((square) => square.y));

  const width = 55 * (maxX - minX + 1) - 5;
  const height = 55 * (maxY - minY + 1) - 5;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {horizontalRectangles.map((rect) => (
        <rect x={55 * rect.x} y={55 * rect.y} width="105" height="50" rx="8" />
      ))}
      {verticalRectangles.map((rect) => (
        <rect x={55 * rect.x} y={55 * rect.y} width="50" height="105" rx="8" />
      ))}
    </svg>
  );
};
