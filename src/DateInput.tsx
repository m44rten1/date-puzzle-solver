import { useState } from "react";
import "./DateInput.css";
import { MONTHS } from "./Board";
interface DateInput {
  notifyDateChange: (day: string, month: string) => void;
}

export default ({ notifyDateChange }: DateInput) => {
  const [month, setMonth] = useState(MONTHS[0]);
  const [day, setDay] = useState("1");

  const dayChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setDay(event.target.value);
    notifyDateChange(event.target.value, month);
  };

  const monthChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setMonth(event.target.value);
    notifyDateChange(day, event.target.value);
  };

  return (
    <div className="DateInput">
      <div>
        <select name="days" id="days" onChange={dayChanged}>
          {[...Array(31)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="months" id="months" onChange={monthChanged}>
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
