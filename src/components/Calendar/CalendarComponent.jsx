import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const onChange = (newDate) => {
    setDate(newDate);
    const localeDate = new Date(newDate);
    // console.log(newDate);
    localeDate.setDate(localeDate.getDate() + 1);
    console.log(localeDate.toISOString().split("T")[0]);
    navigate(`/add-input?date=${localeDate.toISOString().split("T")[0]}`);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CalendarComponent;
