import React, {useState, useEffect } from "react";
import IconImage from "../icons/CalIcon-24.png";

const CalIcon = ({ onClick }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
  const [date, setDate] = useState(new Date());

  useEffect(() => {
	const intervalId = setInterval(() => {
	  setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
	  setDate(new Date());
	}, 1000);
	return () => clearInterval(intervalId);
  }, []);

  const weekDay = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
	<div onClick={onClick} style={{ position: "relative", display: "inline-block", margin: 0, padding: 0 }}>
	  <img src={IconImage} width="64px" height="64px"/>

	  <div style={{ position: "absolute", top: "4px", left: "46%", transform: "translate(-50%, 0)", display: "inline-block", margin: 0, padding: 0 }}>
		<p style={{ fontSize: "10px", color: "#64DD17", fontStyle: "italic", textShadow: "0 0 6px #00FF46", textShadow: "0 0 3px #00FF46", paddingBottom: "4px", margin: 0, padding: 0 }}>{time}</p>
		<p style={{ textAlign: "center", fontSize: "6px", fontWeight: "bold", textTransform: "uppercase", transform: `scaleX(${1.666})`, marginBottom: "-4px", margin: 0, padding: 0 }}>{weekDay}</p>
		<p style={{ textAlign: "center", fontSize: "17px", fontFamily: "TimesNewRoman", transform: `scaleY(${1.666})`, marginBottom: "-4px", margin: 0, padding: 0 }}>{day}</p>
		<p style={{ textAlign: "center", fontSize: "5px", fontWeight: "bold", fontStyle: "italic", transform: `scaleY(${1.222}), scaleX(${1.999})`, textTransform: "uppercase", marginBottom: "-4px", margin: 0, padding: 0 }}>{month}</p>
	  </div>
	</div>
  );
};

export default CalIcon;
