import React, { useState, useEffect } from "react";
import IconImage from "../icons/types/JPG.ico";
import styled from 'styled-components';
import Draggable from "react-draggable";

const Container = styled.div`
  position: fixed;
  width: 64px;
  height: 64px;
  cursor: default;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  bottom: 50%;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  image-rendering: pixelated;
  user-drag: none;
  user-select: none;
  filter: ${props => props.isInverted ? 'invert(100%)' : 'invert(0%)'};
  min-width: 64px;
  min-height: 64px;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
`;

const Text = styled.p`
  text-align: center;
  font-size: 9px;
  font-family: 'NeueBitBold';
  margin-top: 0px;
  background-color:  ${props => props.isInverted ? '#00FF00' : '#AAA'};
  padding: 2px;
  width: auto;
  color: ${props => props.isInverted ? '#AAA' : '#000'};
`;

const getRandomPosition = () => {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const iconWidth = 64;
  const iconHeight = 64;
  const randomLeft = Math.floor(Math.random() * (containerWidth - iconWidth));
  const randomTop = Math.floor(Math.random() * (containerHeight - iconHeight));
  return { left: randomLeft, top: randomTop };
};

const Icon = ( {filename, onClick} ) => {
  const [isInverted, setIsInverted] = useState(false);
  const [position, setPosition] = useState(getRandomPosition());

  useEffect(() => {
    setPosition(getRandomPosition());
  }, []);

  const handleClick = () => {
    setIsInverted(!isInverted);
    onClick();
  };

  const { left, top } = position;

  return (
    <Draggable>
      <Container isInverted={isInverted} left={left} top={top} onClick={handleClick}>
        <Image src={IconImage} alt="icon" />
        <Text isInverted={isInverted}>{filename}</Text>
      </Container>
    </Draggable>
  );
};

export default Icon;
