import React from "react";
import Minimize from "../icons/Minimize.png";
import Close from "../icons/Close.png";
import Up from "../icons/Close.png"
import Down from "../icons/Close.png"
import styled from "styled-components";

const IconImg = styled.img`
  user-drag: none;
  user-select: none;
`;

const IconContainer = styled.div`
  width: ${props => props.iconSize};
  height: ${props => props.iconSize};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWindowButton = styled.div`
  width: 15px;
  height: 15px;
  background-color: #AAA;
  border: none;
  outline: none;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000;
  user-drag: none;
  user-select: none;

  margin: 3px;
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
      {icon === "minimize" ? (
        <IconImg src={Minimize} alt="Minimize icon" />
      ) : icon === "close" ? (
        <IconImg src={Close} alt="Close icon" />
      ) : icon === "up" ? (
      <IconImg src={Close} alt="Close icon" />
      ) : icon === "down" ? (
        <IconImg src={Close} alt="Close icon" />
      ) : null }
    </IconContainer>
  </StyledWindowButton>
);
export default WindowButton;

