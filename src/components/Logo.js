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
  z-index: 0;
`;

const Image = styled.img`
  user-drag: none;
  user-select: none;
  pointer-events: none;
  z-index: 0;
  
  @media only screen and (max-width: 500px) {
    transform: scale(.21);
  }
`;

const Logo = ({ onClick }) => (

<Container onClick={onClick}>
<Image src={Punk} 
     style={{
       zIndex: '0',
       position: "absolute",
       top: "50%",
       left: "50%",
       transform: "translate(-50%, -50%) scale(0.42)",
       display: 'flex',
     }}
 />
 </Container>

);

export default Logo;

