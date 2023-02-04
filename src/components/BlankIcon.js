import React from "react";
import { Box, Image } from "@chakra-ui/react";
import IconImage from "../icons/BlankIcon-24.png";

const BlankIcon = ({ onClick }) => (
  <Box onClick={onClick}>
	<Image src={IconImage} width="64px" height="64px"/>
  </Box>
);

export default BlankIcon;