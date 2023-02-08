import React, { useState, useRef } from "react";
import TextEditor from "./TextEditor";
import PunkIcon from "./Icon";
import CalIcon from "./CalIcon";
import TextEditIcon from "./TextEditIcon";
import BlankIcon from "./BlankIcon";
import OKSHIcon from "./OKSHIcon";
import RoboIcon from "./RoboIcon";
import Window from './AppWindow';

const Dock = ({ addWindow }) => {
  const [textEditorCount, setTextEditorCount] = useState(0);
  const doubleClickRef = useRef(0);
  const handleTextEditClick = () => {
	const newClick = doubleClickRef.current + 1;
	doubleClickRef.current = newClick;
	setTimeout(() => {
	  if (doubleClickRef.current === newClick) {
		doubleClickRef.current = 0;
	  } else {
		const newCount = textEditorCount + 1;
		setTextEditorCount(newCount);
		const newClassName = `app-window-${newCount}`;
		addWindow(
		  <Window title={"Mindware.txt"} x={50 * newCount} y={50 * newCount} className={newClassName} />
		);
		doubleClickRef.current = 0;
	  }
	}, 500);
  };
  
  const handleClick = () => {
	window.open("https://www.twitter.com/ppuunnkkdotcom", "_blank");
  };
  
  const latestPoster = () => {
	window.open("https://zora.co/collections/0x8b50cb0efe5a278367499c0932e6627048473647", "_blank");
  };


  return (
	<>
	  <div style={{ zIndex: 12, position: "absolute", top: "1px", right: "3px", borderRight: "1px solid black", borderBottom: "1px solid black" }}>
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignSelf: 'flex-start' }}>
		  <PunkIcon />
		  <CalIcon />
		  <TextEditIcon onClick={handleTextEditClick} />
		  <OKSHIcon />
		  <RoboIcon onClick={latestPoster}/>
		  <BlankIcon />
		</div>
	  </div>
	</>
  );
};

export default Dock;
