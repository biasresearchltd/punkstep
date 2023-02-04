import React from "react";
import { Box, Image, HStack } from "@chakra-ui/react";
import PunkIcon from "./Icon";
import CalIcon from "./CalIcon";
import BlankIcon from "./BlankIcon";

const Bottom = ({ onClick, minimizeTextEditor }) => (
	<Box position="fixed" bottom="0" left="0">
		<HStack spacing="0">
			<PunkIcon onClick={onClick} link="https://punk.energy/"/>
			<BlankIcon onClick={onClick} />
			<BlankIcon onClick={onClick} />
			<BlankIcon onClick={onClick} />
			<BlankIcon onClick={onClick} />
			<BlankIcon onClick={onClick} />
		</HStack>
	</Box>
	);

export default Bottom;