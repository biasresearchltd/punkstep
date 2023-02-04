import React from "react";
import { Box } from "@chakra-ui/react";
import Minimize from "../icons/Minimize.png";
import Close from "../icons/Close.png";
import "../styles.css";

const WindowButton = ({ onClick, icon, iconSize = "10px" }) => (
  <Box className="window-button" onClick={onClick} display="flex" justifyContent="center" alignItems="center">
	<Box className="icon" style={{ width: iconSize, height: iconSize }}>
	  {icon === "minimize" ? (
		<img src={Minimize} alt="Minimize icon" />
	  ) : icon === "close" ? (
		<img src={Close} alt="Close icon" />
	  ) : null}
	</Box>
  </Box>
);

export default WindowButton;