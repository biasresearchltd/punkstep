import React from "react";
import IconImage from "../icons/PUNKBOCOP.png";
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 64px;
  height: 64px;
  cursor: default;
  display: inline-block;
  margin: 0;
  padding: 0;
  bottom: 2px;
  right: 2px;
  image-rendering: pixelated;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  user-drag: none;
  user-select: none;
`;

const Recycle = ({ onClick }) => (

<Container onClick={onClick}>
<Image src={IconImage} />
</Container>

);

export default Recycle;
