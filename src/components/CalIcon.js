import React, { useState, useEffect } from "react";
import IconImage from "../icons/CalIcon-24.png";
import styled from "styled-components";

const Container = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0;
  cursor: default;
  image-rendering: pixelated;
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
`;

const TextContainer = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  top: 0;
  right: 2px;
`;

const Time = styled.p`
  position: absolute;
  line-height: 1;
  font-size: 10px;
  color: #64DD17;
  font-family: "PunkClockType";
  text-shadow: 0 0 8px #00FF46, 0 0 4px #00FF46;
  top: 6px;
  text-align: center;
  padding: 0;
  user-select: none;
  font-smooth: never;
  span {
    opacity: 1;
    transition: opacity 1s linear;
    &.hidden {
      opacity: 0;
    }
  }
`;


const WeekDay = styled.p`
  position: absolute;
  text-align: center;
  line-height: 1;
  font-size: 10px;
  font-family: "PunkDayType";
  font-weight: none;
  font-smooth: never;
  text-transform: uppercase;
  top: 22px;
  text-align: center;
  margin: 0;
  user-select: none;
`;

const Day = styled.p`
  position: absolute;
  line-height: 1;
  text-align: center;
  font-size: 10px;
  font-family: "TimesNewDay";
  font-smooth: never;
  margin: 0;
  padding: 0;
  user-select: none;
  top: 33px;
  text-align: center;
`;

const Month = styled.p`
  position:absolute;
  line-height: 1;
  text-align: center;
  font-size: 9px;
  font-family: "PunkMonthType";
  font-smooth: never;
  text-transform: uppercase;
  top: 47px;
  user-select: none;
  padding: 0;
`;

const CalIcon = ({ onClick }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
  const [date, setDate] = useState(new Date());
  const [colonOpacity, setColonOpacity] = useState(1);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
      setTime(newTime);
      setColonOpacity((prevOpacity) => (prevOpacity ? 0 : 1));
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const weekDay = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
    <Container onClick={onClick}>
      <Icon src={IconImage} />
      <TextContainer>
        <Time>
          {time.slice(0, 2)}
          <span className={colonOpacity ? "" : "hidden"}>:</span>
          {time.slice(3)}
        </Time>

        <WeekDay>{weekDay}</WeekDay>
        <Day>{day}</Day>
        <Month>{month}</Month>
      </TextContainer>
    </Container>
  );
};


export default CalIcon;