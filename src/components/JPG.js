import React from "react";
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
  left: 28px;
  image-rendering: pixelated;
  user-drag: none;
  user-select: none;
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
  background-color: #AAA;
  border: solid 1px #000;
  width: auto;
`;

const Icon = ( {filename} ) => {
  return (
	<Draggable>
	<Container>
	<Image src={IconImage} alt="icon" />
	<Text>{filename}</Text>
	</Container>
	</Draggable>
  );
};

export default Icon;
