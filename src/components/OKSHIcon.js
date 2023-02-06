import React from "react";
import IconImage from "../icons/OKSHIcon-24.png";
import styled from 'styled-components';

const Container = styled.div`
  width: 64px;
  height: 64px;
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

<Container onClick={onClick}>
<Image src={IconImage} />
</Container>

);

export default TextEditIcon;

