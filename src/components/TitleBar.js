import React, { useState } from "react";
import WindowButton from "./WindowButton";
import styled from "styled-components";

const Container = styled.div`
  height: 21px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #FCFCFE;
  border-left: 1px solid #FCFCFE;
  border-bottom: 1px solid #565656;
  border-right: 1px solid #565656;
  font-size: 9px;
  font-family: NeueBitBold;
  background: #AAAAAA;

  &.active {
	background: #000;
	color: #FFF;
  }
`;

const Title = styled.div`
  cursor: default;
  color: ${(props) => (props.isActive ? "white" : "black")};
  width: 100%;
  font-size: 9px;
  font-weight: bold;
  font-family: "'NeueBitBold'";
  display: flex;
  align-items: center;
`;


const TitleBar = ({ title, handleMinimize, handleClose }) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleTitlebarClick = () => setIsActive(true);
  
  const handleClick = () => {
	setIsActive(true);
  };

  return (
	  <Container className={isActive ? "windowtitle active" : "windowtitle "} onClick={handleClick}>
		<WindowButton icon="minimize" onClick={handleMinimize} />
		<Title isActive={isActive}>{title}</Title>
		<WindowButton icon="close" onClick={handleClose} />
	  </Container>
	);
  };

export default TitleBar;
