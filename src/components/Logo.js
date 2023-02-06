import React from "react";
import Punk from "../PUNK.gif";
import styled from 'styled-components';


const Container = styled.div`
  width: 64px;
  height: 64px;
  cursor: default;
  display: inline-block;
  margin: 0;
  padding: 0;
  image-rendering: pixelated;
  user-drag: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -ms-user-drag: none;
  pointer-events: none;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
  pointer-events: none;
  z-index: 0;
`;

const Logo = ({ onClick }) => (

<Container onClick={onClick}>
<img src={Punk} 
     style={{
       position: "absolute",
       top: "50%",
       left: "50%",
       transform: "translate(-50%, -50%) scale(0.333)",
       display: 'flex',
     }}
 /></Container>

);

export default Logo;

