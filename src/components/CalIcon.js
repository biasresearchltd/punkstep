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
  top: 5px;
  left: 46%;
  transform: translate(-50%, 0);
  display: inline-block;
  margin: 0;
  padding: 0;
`;

const Time = styled.p`
  font-size: 9px;
  color: #64DD17;
  font-family: "PunkClockType";
  text-shadow: 0 0 8px #00FF46, 0 0 4px #00FF46;
  margin-top: 0px;
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
  text-align: center;
  font-size: 10px;
  font-family: "PunkDayType";
  font-weight: none;
  font-smooth: never;
  text-transform: uppercase;
  margin-top: -6px;
  margin-bottom: 0;
  padding: 0;
  user-select: none;
`;

const Day = styled.p`
  text-align: center;
  font-size: 10px;
  font-family: "TimesNewDay";
  font-smooth: never;
  margin-top: -6px;
  padding: 0;
  user-select: none;
  
  @media only screen and (max-width: 500px) {
    margin-top: -6px;
  }
`;

const Month = styled.p`
  text-align: center;
  font-size: 9px;
  font-family: "PunkMonthType";
  font-smooth: never;
  text-transform: uppercase;
  margin-top: -12.5px;
  user-select: none;
  padding: 0;
  
  @media only screen and (max-width: 767px) {
    margin-top: 0px;
  }
  @media only screen and (max-width: 500px) {
    margin-top: -13px;
  }
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