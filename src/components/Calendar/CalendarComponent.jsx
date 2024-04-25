import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const CalendarComponent = ({ onDatePicked }) => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const onChange = (newDate) => {
    setDate(newDate);
    const localeDate = new Date(newDate);
    // console.log(newDate);
    localeDate.setDate(localeDate.getDate() + 1);
    onDatePicked();
    navigate(`/add-input?date=${localeDate.toISOString().split("T")[0]}`);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CalendarComponent;
