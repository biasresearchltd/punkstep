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
  font-size: 12px;
  color: #64DD17;
  font-style: italic;
  font-family: sans-serif;
  text-shadow: 0 0 8px #00FF46, 0 0 4px #00FF46, 0 0 1px #00FF46;
  margin: 0;
  padding: 0;
  user-select: none;
`;

const WeekDay = styled.p`
  text-align: center;
  font-size: 6px;
  font-family: sans-serif;
  font-weight: none;
  text-transform: uppercase;
  transform: scaleX(1.666);
  margin-top: 5px;
  margin-bottom: 1px;
  padding: 0;
  user-select: none;
`;

const Day = styled.p`
  text-align: center;
  font-size: 14.666px;
  font-family: TimesNewRoman;
  transform: scale(1.42, 1.666);
  margin: 0;
  padding: 0;
  user-select: none;
  
  @media only screen and (max-width: 500px) {
    margin-top: -1px;
    transform: scale(1.666, 1.42);
  }
`;

const Month = styled.p`
  text-align: center;
  font-size: 6px;
  font-family: sans-serif;
  font-style: italic;
  transform: scale(1.666, 1.1);
  text-transform: uppercase;
  margin-top: 0.5px;
  user-select: none;
  padding: 0;
  
  @media only screen and (max-width: 767px) {
    margin-top: 0px;
  }
  @media only screen and (max-width: 500px) {
    margin-top: -3px;
    transform: scale(1.666, 1);
  }
`;

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
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
    <Container onClick={onClick}>
      <Icon src={IconImage} />
      <TextContainer>
        <Time>{time}</Time>
        <WeekDay>{weekDay}</WeekDay>
        <Day>{day}</Day>
        <Month>{month}</Month>
      </TextContainer>
    </Container>
  );
};


export default CalIcon;