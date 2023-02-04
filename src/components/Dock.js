import React from "react";
import { Box, Image, VStack } from "@chakra-ui/react";
import PunkIcon from "./Icon";
import CalIcon from "./CalIcon";
import BlankIcon from "./BlankIcon";

const Dock = ({ onClick }) => (
<Box position="fixed" top="0" right="0">
<VStack spacing="0">
<PunkIcon onClick={onClick} />
<CalIcon onClick={onClick} />
<BlankIcon onClick={onClick} />
<BlankIcon onClick={onClick} />
<BlankIcon onClick={onClick} />
<BlankIcon onClick={onClick} />
</VStack>
</Box>
);

export default Dock;