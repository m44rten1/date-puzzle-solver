import "./Tile.css";

interface Tile {
  label: string | null;
}

export default ({ label }: Tile) => {
  return (
    <div className="tile-wrapper">
      <div className="Tile" style={{ opacity: label ? 100 : 0 }}>
        {label || "_"}
      </div>
    </div>
  );
};
