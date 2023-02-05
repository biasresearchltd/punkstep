import React, { useState } from "react";
import Draggable from "react-draggable";
import TextEditIcon from "./TextEditIcon";
import TitleBar from "./TitleBar";
import './WindowStyle.css';

const TextEditor = ({ title }) => {
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [text, setText] = useState("The most Punk thing one can do is change one's mind.");
  const handleMinimize = () => setMinimized(!minimized);
  const handleClose = () => setClosed(!closed);
  const handleTextChange = (event) => setText(event.target.value);
  const handleDoubleClick = () => setMinimized(false);
  const handleTextEditIconDrag = (e, data) => {
	let { x, y } = data;
	let windowEl = document.querySelector('.root');
	windowEl.style.left = x + 'px';
	windowEl.style.top = y + 'px';
  };

  return closed ?
	  null :
	  ( 
		<Draggable handle=".windowtitle, .windowfooter">
		  <div style={{
			width: minimized ? '64px' : '500px',
			height: minimized ? '64px' : '300px',
			background: 'none',
			border: minimized ? '0px solid #000000' : '1px solid #000000',
			transition: 'height 0.3s ease-in-out, width 0.3s ease-in-out, border 0.3s ease-in-out',
			display: 'flex',
			flexDirection: 'column',
		  }}>
			{
			  !minimized ? (
				<div className="root">
				  <TitleBar title={title} handleMinimize={handleMinimize} handleClose={handleClose} />
				  
				  <div className="content">
					<textarea className="textedit-textarea" value={text} onChange={handleTextChange} />
				  </div>
				  
				  <div className="windowfooter" />
				</div>
			  ) : (
				<Draggable handle=".TextEditIcon" onStop={handleTextEditIconDrag}>
				  <div onDoubleClick={handleDoubleClick} style={{ position: 'absolute', right: '0', bottom: '0' }}>
					<TextEditIcon />
				  </div>
				</Draggable>
			  )
			}
		  </div>
		</Draggable>
	  );
  };
export default TextEditor;
