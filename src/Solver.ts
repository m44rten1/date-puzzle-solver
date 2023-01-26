import { TILES } from "./Board";
import { FixedPiece, Piece, PIECES, Square, getPieceSymmetry } from "./Piece";

export default (day: string, month: string): FixedPiece[] => {
  const getDatePositions = (): { day: Square; month: Square } => {
    let monthPosition: Square | null = null;
    let dayPosition: Square | null = null;

    for (let i = 0; i < TILES.length; i++) {
      for (let j = 0; j < TILES[i].length; j++) {
        if (TILES[i][j] === month) monthPosition = { x: j, y: i };
        if (TILES[i][j] === day) dayPosition = { x: j, y: i };
      }
    }
    if (monthPosition && dayPosition)
      return { day: dayPosition, month: monthPosition };
    throw new Error("Month not found");
  };

  const datePositions = getDatePositions();

  const getAllSymmetries = (piece: Piece): FixedPiece[] => {
    const fixedPieces: FixedPiece[] = [];

    for (let i = 0; i < piece.symmetries.rotations; i++) {
      fixedPieces.push(getPieceSymmetry(piece, { rotation: i, mirror: false }));
      if (piece.symmetries.mirrorable)
        fixedPieces.push(
          getPieceSymmetry(piece, { rotation: i, mirror: true })
        );
    }

    return fixedPieces;
  };

  const placementPossible = (
    fixedPiece: FixedPiece,
    placedFixedPieces: FixedPiece[]
  ): boolean => {
    const placedSquares = new Set<string>();

    const getKey = (position: Square, square: Square): string => {
      return `${position.x + square.x},${position.y + square.y}`;
    };

    placedFixedPieces.forEach((fixedPiece) => {
      fixedPiece.squares.forEach((square) => {
        placedSquares.add(getKey(fixedPiece.position, square));
      });
    });
    let possible = true;

    fixedPiece.squares.forEach((square) => {
      const x = square.x + fixedPiece.position.x;
      const y = square.y + fixedPiece.position.y;

      if (
        placedSquares.has(getKey(fixedPiece.position, square)) ||
        (x === datePositions.day.x && y === datePositions.day.y) ||
        (x === datePositions.month.x && y === datePositions.month.y) ||
        !TILES[y] ||
        !TILES[y][x]
      )
        possible = false;
    });

    return possible;
  };

  const canSkipPosition = (
    placedFixedPieces: FixedPiece[],
    position: Square
  ): boolean => {
    if (!TILES[position.y]) return true;
    if (TILES[position.y]) {
      const tileValue = TILES[position.y][position.x];
      if (tileValue === month || tileValue === day || tileValue === undefined)
        return true;
    }

    let result = false;

    placedFixedPieces.forEach((fixedPiece) => {
      fixedPiece.squares.forEach((square) => {
        if (
          square.x + fixedPiece.position.x === position.x &&
          square.y + fixedPiece.position.y === position.y
        )
          result = true;
      });
    });

    return result;
  };

  const getNextPosition = (
    placedFixedPieces: FixedPiece[],
    position: Square
  ): Square | null => {
    const getNext = (position: Square) => {
      if (TILES[position.y][position.x + 1]) {
        return { ...position, x: position.x + 1 };
      }

      if (TILES[position.y + 1]) {
        return { x: 0, y: position.y + 1 };
      }
      return null;
    };

    let next = getNext(position);

    while (next && canSkipPosition(placedFixedPieces, next)) {
      next = getNext(next);
    }

    return next;
  };

  let result: FixedPiece[] = [];

  let found = false;

  const solve = (
    piecesToPlace: Piece[],
    placedFixedPieces: FixedPiece[],
    startPosition: Square
  ): void => {
    if (!found) {
      let currentPosition: Square | null = startPosition;

      piecesToPlace.forEach((piece, i) => {
        const symmetries = getAllSymmetries(piece);

        symmetries.forEach((fixedPiece) => {
          if (currentPosition) {
            // Check if placement is possible and special day/month is not covered
            fixedPiece.position = currentPosition;

            if (placementPossible(fixedPiece, placedFixedPieces)) {
              if (placedFixedPieces.length + 1 === PIECES.length) {
                result = [
                  ...placedFixedPieces,
                  {
                    position: { x: currentPosition.x, y: currentPosition.y },
                    squares: fixedPiece.squares.map((s) => ({
                      x: s.x,
                      y: s.y,
                    })),
                  },
                ];
                found = true;
              }

              const nextPosition = getNextPosition(
                [
                  ...placedFixedPieces,
                  {
                    position: { x: currentPosition.x, y: currentPosition.y },
                    squares: fixedPiece.squares.map((s) => ({
                      x: s.x,
                      y: s.y,
                    })),
                  },
                ],
                currentPosition
              );

              if (nextPosition) {
                solve(
                  piecesToPlace.filter((_, index) => index !== i),
                  [
                    ...placedFixedPieces,
                    {
                      position: { x: currentPosition.x, y: currentPosition.y },
                      squares: fixedPiece.squares.map((s) => ({
                        x: s.x,
                        y: s.y,
                      })),
                    },
                  ],
                  nextPosition
                );
              }
            }
          }
        });
      });
    }
  };

  solve(PIECES, [], { x: 0, y: 0 });

  return result;
};
