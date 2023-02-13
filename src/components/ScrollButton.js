import React from "react";
import Up from "../icons/PuNKStep-Up@2x.png"
import Down from "../icons/PuNKStep-Down@2x.png"
import styled from "styled-components";

const IconImg = styled.img`
  width: 9px;
  height: 9px;
  user-drag: none;
  user-select: none;
  image-rendering: pixelated;
`;

const IconContainer = styled.div`
  width: ${props => props.iconSize};
  height: ${props => props.iconSize};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWindowButton = styled.div`
  width: 16px;
  height: 16px;
  background-color: #AAA;
  border: none;
  outline: none;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, .5px .5px #000000;
  user-drag: none;
  user-select: none;

  margin: 1px;
  &:hover {
    background-color: #ddd;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const WindowButton = ({ onClick, icon, iconSize = "10px" }) => (
  <StyledWindowButton onClick={onClick}>
    <IconContainer iconSize={iconSize}>
      {icon === "up" ? (
        <IconImg src={Up} alt="Minimize icon" />
      ) : icon === "down" ? (
        <IconImg src={Down} alt="Close icon" />
      ) : null }
    </IconContainer>
  </StyledWindowButton>
);
export default WindowButton;
