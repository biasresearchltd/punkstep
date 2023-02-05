import React from "react";
import Draggable from "react-draggable";
import IconImage from "../icons/TextEditIcon2-24.png";
import styled from 'styled-components';

const Container = styled.div`
  width: 64px;
  height: 64px;
  border: 1px solid #000000;
  cursor: default;
  display: inline-block;
  margin: 0;
  padding: 0;
  image-rendering: pixelated;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
`;

const TextEditIcon = ({ onClick }) => (
<Draggable>
<Container onClick={onClick}>
<Image src={IconImage} />
</Container>
</Draggable>
);

export default TextEditIcon;