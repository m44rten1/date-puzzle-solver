import "./Tile.css";

interface Tile {
  label: string;
}

export default ({ label }: Tile) => {
  return <div className="Tile">{label}</div>;
};
