import React from "react";
import IconImage from "../icons/PUNKBOCOP.png";
import styled from 'styled-components';

const Container = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  padding: 0;
  image-rendering: pixelated;
`;

const Image = styled.img`
  cursor: pointer;
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
`;

const RoboIcon = ({ onClick }) => (

<Container onClick={onClick}>
<Image src={IconImage} />
</Container>

);

export default RoboIcon;

