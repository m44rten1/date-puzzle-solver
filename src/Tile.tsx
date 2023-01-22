import { FixedPiece, squaresToSvg } from "./Piece";
import "./Tile.css";

interface Tile {
  label?: string;
  piece?: FixedPiece;
}

export default ({ label, piece }: Tile) => {
  return (
    <div className="tile-wrapper">
      {piece && <div className="piece">{squaresToSvg(piece)}</div>}
      <div className="Tile" style={{ opacity: label ? 100 : 0 }}>
        {label || "_"}
      </div>
    </div>
  );
};
