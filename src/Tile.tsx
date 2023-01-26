import React, { useLayoutEffect, useState } from "react";
import { FixedPiece, squaresToSvg } from "./Piece";
import "./Tile.css";

interface Tile {
  label?: string;
  piece?: FixedPiece;
}

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default ({ label, piece }: Tile) => {
  const [width, height] = useWindowSize();

  const getSide = () =>
    Math.max(
      Math.min(
        width,
        height,
        700 // Max value
      ),
      300
    ) / 10;

  const getMargin = () => getSide() / 6;
  const getRadius = () => getSide() / 3.5;
  const getTileStyles = () => ({
    width: getSide(),
    height: getSide(),
    borderRadius: getRadius(),
    opacity: label ? 100 : 0,
    fontSize: getSide() / 3,
  });
  const getWrapperStyles = () => ({
    width: getSide() + getMargin(),
    height: getSide() + getMargin(),
  });

  return (
    <div className="tile-wrapper" style={getWrapperStyles()}>
      {piece && (
        <div className="piece">
          {squaresToSvg(piece, getSide(), getMargin(), getRadius())}
        </div>
      )}
      <div className="Tile" style={getTileStyles()}>
        {label || "_"}
      </div>
    </div>
  );
};
