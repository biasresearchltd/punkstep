import React from "react";
import IconImage from "../icons/TextEditIcon2-24.png";
import styled from 'styled-components';

const Container = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  padding: 0;
  image-rendering: pixelated;
  transition: transform 1s ease-in-out;
  &:hover {
    position: relative;
    box-shadow: inset 24px 24px #FCFCFE, inset -24px -24px #565656, 2px 2px #000000;
    cursor: pointer;
    right: 2px;
    transform: scale(1.03);
    animation: all 0.33s ease-in-out;
  }
  &:active {
    cursor: pointer;
    box-shadow: inset 0 0 10px #333;
  }
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
  cursor: pointer;
  transition: transform 1s ease-in-out;
  &:hover {
    box-shadow: inset 24px 24px #FCFCFE, inset -24px -24px #565656, 2px 2px #000000;
    animation: all 0.33s ease-in-out;
  }
  &:active {
    cursor: pointer;
    box-shadow: inset 0 0 10px #333;
`;

const TextEditIcon = ({ onClick }) => (

<Container onClick={onClick}>
<Image src={IconImage} />
</Container>

);

export default TextEditIcon;

