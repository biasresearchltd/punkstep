import React, { useState } from "react";
import Draggable from "react-draggable";
import { Box, Heading, Flex, VStack, Text, IconButton, Textarea } from "@chakra-ui/react";
import Icon from "./Icon";
import WindowButton from "./WindowButton";
import Minimize from "../icons/Minimize.png";
import Close from "../icons/Close.png";

const TextEditor = ({ title }) => {
  const [minimized, setMinimized] = useState(false)
  const [closed, setClosed] = useState(false)
  const [text, setText] = useState("The most Punk thing one can do is change one's mind.");
  const handleMinimize = () => setMinimized(!minimized)
  const handleClose = () => setClosed(!closed)
  const handleTextChange = (event) => setText(event.target.value);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  return closed ?
	  null
		: (
		<Draggable
	  	  handle=".windowtitle, .windowfooter"
		>
		<Box
			style={{
			width: minimized ? '64px' : '500px',
			height: minimized ? '64px' : '300px',
			background: 'white',
			border: '1px solid black',
			transition: 'height 0.3s ease-in-out, width 0.3s ease-in-out'
			}}
		>
		{!minimized ? (
		  <VStack spacing="0">
			<Box
			  className="windowtitle"
			  height="23px"
			  width="100%"
			  bg="#AAAAAA"
			  display="flex"
			  padding="2px"
			  justifyContent="space-between"
			  style={{
				  borderTop: "1px solid #FCFCFE",
				  borderLeft: "1px solid #FCFCFE",
				  borderBottom: "1px solid #565656",
				  borderRight: "1px solid #565656"
			  }}
			  >
			  <WindowButton
			    icon="minimize"
				onClick={handleMinimize}
				>
			  </WindowButton>
			  <Flex height="100%" alignItems="center">
				<Heading cursor="default" fontFamily="NeueBitBold" color="black" width="100%" fontSize="9px" fontWeight="bold" >{title}</Heading>
			  </Flex>
			  <WindowButton
			  	icon="close"
			  	onClick={handleClose}
				>
			  </WindowButton>
			</Box>
			<Box
			  height="100%"
			  width="100%"
			  style={{
				  borderTop: "1px solid #000000",
				  borderBottom: "1px solid #565656"
				}}
			>
				<Textarea
				  className="textedit-textarea"
				  minHeight="265px"
				  width="100%"
				  resize="none"
				  border="none"
				  fontSize="9px"
				  outline="none"
				  borderRadius="none"
				  fontFamily="NeueBit"
				  cursor="text"
				  value={text}
				  onChange={(e) => setText(e.target.value)}
				/>
			</Box>
			  <Flex height="100%" alignItems="center">
				  
				</Flex>
			  <Box
			    className="windowfooter"
			    bg="#AAAAAA"
				width="100%"
				height="8px"
				boxShadow="inset 1px 1px #FCFCFE, inset -1px -1px #565656"
				position="absolute"
				bottom="0"
			  >
			  </Box>
		  </VStack>
		) : (
		  <Icon position="bottom-left" onClick={() => setMinimized(false)} />
		)}
	  </Box>
	</Draggable>
  )
}

export default TextEditor
