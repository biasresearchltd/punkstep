import React, { useState } from "react";
import IconImage from "../icons/NeXTIconPunkEnergy.png";
import styled from 'styled-components';

const Container = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  padding: 0;
  image-rendering: pixelated;
  transition: all 1 ease-in-out;
  &:hover {
    position: relative;
    cursor: pointer;
    box-shadow: inset 11px 11px #FCFCFE, inset -11px -11px #565656, 2px 2px #000000;
    right: 4px;
    transform: scale(1.03);
  }
  &:active {
    cursor: pointer;
    box-shadow: inset 0 0 10px #333;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
  &:hover {
    box-shadow: inset 24px 24px #FCFCFE, inset -24px -24px #565656, 2px 2px #000000;
    animation: all 0.33s ease-in-out;
  }
  &:active {
    cursor: pointer;
    box-shadow: inset 0 0 10px #333;
`;

const PEIcon = ({ onClick }) => (

<Container onClick={onClick}>
<Image src={IconImage} />
</Container>

);

export default PEIcon;
