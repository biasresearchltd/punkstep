import React from "react";
import IconImage from "../icons/BlankIcon-24.png";
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

const BlankIcon = ({ onClick }) => (
  <Container onClick={onClick}>
  <Image src={IconImage} width="64px" height="64px"/>
  </Container>
);

export default BlankIcon;