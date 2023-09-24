import React, { useState, useEffect } from "react";
import IconImage from "./GreenPunkHead.svg";
import styled from 'styled-components';
import Draggable from "react-draggable";

const Container = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  image-rendering: pixelated;
  user-drag: none;
  user-select: none;
  filter: ${props => props.isInverted ? 'invert(100%)' : 'invert(0%)'};
  min-width: 128px;
  min-height: 128px;
`;

const SvgWrapper = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  user-drag: none;
  user-select: none;
  transform: skew(0deg, 0deg);
`;

const Text = styled.p`
  text-align: center;
  font-size: 9px;
  font-family: 'PunkSystemComp';
  margin-top: 4px;
  background-color: ${props => props.isInverted ? '#00FF00' : '#AAA'};
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

const SVG = ({ filename, onClick }) => {
  const [isInverted, setIsInverted] = useState(false);
  const [position, setPosition] = useState(getRandomPosition());
  const [isRightClicking, setIsRightClicking] = useState(false);
  const [width, setWidth] = useState(64);
  const [height, setHeight] = useState(64);

  useEffect(() => {
    setPosition(getRandomPosition());
  }, []);

  const handleClick = () => {
    setIsInverted(!isInverted);
    onClick();
  };

  const handleMouseDown = (event) => {
    if (event.button === 2) {
      setIsRightClicking(true);
      event.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsRightClicking(false);
  };

  const handleMouseLeave = () => {
    setIsRightClicking(false);
  };

  const handleMouseMove = (event) => {
    if (isRightClicking) {
      const deltaX = event.movementX;
      const deltaY = event.movementY;
      setWidth(width + deltaX);
      setHeight(height + deltaY);
      const skewXValue = (height) / 64;
      const skewYValue = (width) / 64;
      const transformValue = `skew(${skewYValue}deg, ${skewXValue}deg)`;
      Image.style.transform = transformValue;
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  const { left, top } = position;

  return (
    <Draggable bounds="parent">
      <Container
        isInverted={isInverted}
        left={left}
        top={top}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <SvgWrapper width={width} height={height}>
          <Image src={IconImage} alt="PunkHead" style={{ width: '100%', height: '100%' }} onContextMenu={handleContextMenu} onMouseDown={handleMouseDown} />
        </SvgWrapper>
        <Text isInverted={isInverted}>{filename}</Text>
      </Container>
    </Draggable>
  );
};

export default SVG;
