import React, { useState } from "react";
import Draggable from "react-draggable";
import TextEditIcon from "./TextEditIcon";
import TitleBar from "./TitleBar-Old";
import TextArea from "./TextArea";

const AppWindow = ({ title, isActive, onClick }) => {
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [text, setText] = useState("The first 𝙿𝚄𝙽𝙺 thing one can do is change one's mind. Then, try changing this text.");
  const handleMinimize = () => setMinimized(!minimized);
  const handleClose = () => setClosed(!closed);
  const handleDoubleClick = () => setMinimized(false);
  const handleTextChange = (e) => setText(e.target.value);
  const handleTextEditIconDrag = (e, data) => {
	let { x, y } = data;
	let windowEl = document.querySelector(".root");
	windowEl.style.left = x + "px";
	windowEl.style.top = y + "px";
  };

  return closed ? null : (
	  <Draggable
	    handle=".windowtitle, .windowfooter"
		
		>
		<div
		  onClick={onClick}
		  style={{
			width: minimized ? "64px" : "666px",
			height: minimized ? "64px" : "333px",
			background: "none",
			border: minimized ? "0px solid #000000" : "1px solid #000000",
			transition: "height 0.3s ease-in-out, width 0.3s ease-in-out, border 0.3s ease-in-out",
			display: "flex",
			flexDirection: "column",
			zIndex: isActive ? 2 : 1,
		  }}
		>
		  {
			!minimized ? (
			  <div className="root">
				<TitleBar
				  title={title}
				  handleMinimize={handleMinimize}
				  handleClose={handleClose}
				  isActive={isActive}
				  handleTitlebarClick={onClick}
				/>
  
				<TextArea text={text} handleTextChange={handleTextChange} />
				<div className="windowfooter" />
			  </div>
			) : (
			  <Draggable handle=".TextEditIcon" onStop={handleTextEditIconDrag}>
				<div
				  onDoubleClick={handleDoubleClick}
				>
				  <TextEditIcon />
				</div>
			  </Draggable>
			)
		  }
		</div>
	  </Draggable>
	);
  };
export default AppWindow;
