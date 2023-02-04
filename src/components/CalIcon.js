import React, {useState, useEffect } from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import IconImage from "../icons/CalIcon-24.png";


const CalIcon = ({ onClick }) => {
	const [time, setTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
  const [date, setDate] = useState(new Date());
  
	useEffect(() => {
	  const intervalId = setInterval(() => {
		setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
		setDate(new Date());
	  }, 1000);
	  return () => clearInterval(intervalId);
	}, []);

  const weekDay = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
	  <Box onClick={onClick} position="relative" spacing="0">
		<Image src={IconImage} width="64px" height="64px"/>
		
		<Box spacing="0" position="absolute" top="4px" left="46%" transform="translate(-50%, 0)">
		  <Text fontSize="10px" color="#64DD17" fontStyle="italic" textShadow="1px 1px 0px #333" paddingBottom="4px" >{time}</Text>
		  <Text textAlign="center" fontSize="5px" fontWeight="bold" textTransform="uppercase" transform={`scaleX(${1.9})`}marginBottom="-3px">{weekDay}</Text>
		  <Text textAlign="center" fontSize="17px" fontFamily="TimesNewRoman" transform={`scaleY(${1.666})`} fontWeight="bold" marginBottom="-4px">{day}</Text>
		  <Text textAlign="center" fontSize="5px" fontWeight="bold" fontStyle="italic" transform={`scaleX(${1.7})`}  textTransform="uppercase" marginBottom="-4px">{month}</Text></Box>
	  </Box>
	);
  };

export default CalIcon;
