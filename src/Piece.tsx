export interface Square {
  x: number;
  y: number;
}

export interface Piece {
  squares: Square[];
  symmetries: { rotations: number; mirrorable: boolean };
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
    symmetries: { rotations: 4, mirrorable: true },
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ],
    symmetries: { rotations: 4, mirrorable: true },
  },
  {
    squares: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    symmetries: { rotations: 4, mirrorable: true },
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    symmetries: { rotations: 4, mirrorable: true },
  },
  {
    squares: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ],
    symmetries: { rotations: 4, mirrorable: true },
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],
    symmetries: { rotations: 4, mirrorable: false },
  },
  {
    squares: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    symmetries: { rotations: 4, mirrorable: false },
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
    symmetries: { rotations: 2, mirrorable: false },
  },
];

export const getPieceSymmetry = (
  piece: Piece,
  symmetry: { rotation: number; mirror: boolean }
): FixedPiece => {
  if (
    symmetry.rotation >= piece.symmetries.rotations ||
    (symmetry.mirror && !piece.symmetries.mirrorable)
  )
    throw new Error("Symmetry not available");

  const result = {
    squares: piece.squares.map((square) => ({ ...square })),
    position: { x: 0, y: 0 },
  };

  if (symmetry.mirror) {
    result.squares = result.squares.map((square) => ({
      ...square,
      x: -square.x,
    }));
  }

  if (symmetry.rotation === 1) {
    result.squares = result.squares.map((square) => ({
      x: square.y,
      y: -square.x,
    }));
  }

  if (symmetry.rotation === 2) {
    result.squares = result.squares.map((square) => ({
      x: -square.x,
      y: -square.y,
    }));
  }

  if (symmetry.rotation === 3) {
    result.squares = result.squares.map((square) => ({
      x: -square.y,
      y: square.x,
    }));
  }

  // Ground
  const xMin = Math.min(...result.squares.map((square) => square.x));
  const yMin = Math.min(...result.squares.map((square) => square.y));

  result.squares = result.squares.map((square) => ({
    x: square.x - xMin,
    y: square.y - yMin,
  }));

  return result;
};

export const squaresToSvg = (
  fixedPiece: FixedPiece,
  side: number = 50,
  margin: number = 5,
  radius: number = 8
) => {
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

  const maxX = Math.max(...fixedPiece.squares.map((square) => square.x));
  const maxY = Math.max(...fixedPiece.squares.map((square) => square.y));

  const minX = Math.min(...fixedPiece.squares.map((square) => square.x));
  const minY = Math.min(...fixedPiece.squares.map((square) => square.y));

  const d = side + margin;

  const width = d * (maxX - minX + 1) - margin;
  const height = d * (maxY - minY + 1) - margin;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {horizontalRectangles.map((rect) => (
        <rect
          x={d * rect.x}
          y={d * rect.y}
          width={2 * side + margin}
          height={side}
          rx={radius}
        />
      ))}
      {verticalRectangles.map((rect) => (
        <rect
          x={d * rect.x}
          y={d * rect.y}
          width={side}
          height={2 * side + margin}
          rx={radius}
        />
      ))}
    </svg>
  );
};
