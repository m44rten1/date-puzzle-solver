import Tile from "./Tile";

const months = [
  ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
  ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
];

export default () => {
  return (
    <div>
      {months.map((row) => {
        return (
          <div>
            {row.map((month) => {
              return <Tile label={month} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
