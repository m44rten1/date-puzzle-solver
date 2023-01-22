import "./Tile.css";

interface Tile {
  label: string | null;
}

export default ({ label }: Tile) => {
  return label ? (
    <div className="Tile">{label}</div>
  ) : (
    <div className="EmptyTile"></div>
  );
};
