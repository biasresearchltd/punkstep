import React from "react";
import { Box, Image } from "@chakra-ui/react";
import IconImage from "../icons/PunkIcon-24.png";

const Icon = ({ onClick }) => (
  <Box onClick={onClick}>
	<Image src={IconImage} width="64px" height="64px"/>
  </Box>
);

export default Icon;