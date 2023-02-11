import React, { useState, useEffect } from 'react';
import create from 'zustand';
import WindowButton from "./WindowButton";
import TextArea from "./TextArea";
import Minimize from "../icons/Minimize.png";
import Close from "../icons/Close.png";

const useAppWindow = create((set, get) => ({
	title: 'Default Title',
	type: 'TextEdit',
	content: "The first 𝙿𝚄𝙽𝙺 thing one can do is change one's mind. Then, try changing this text.",
	position: {
		x: 0,
		y: 0
	},
	isActive: false,
	size: {
		width: 666,
		height: 333
	},
	isMinimized: false,
	isClosed: false,
	setTitle: title => set({ title }),
	setType: type => set({ type }),
	setContent: content => set({ content }),
	setPosition: position => set({ position }),
	setIsActive: isActive => set({ isActive }),
	setSize: size => set({ size }),
	setIsMinimized: isMinimized => set({ isMinimized }),
	setIsClosed: isClosed => set({ isClosed })
}));

const AppWindow = ({}) => {
  const {
	title,
	type,
	content,
	position,
	isActive,
	size,
	isMinimized,
	isClosed,
	setTitle,
	setType,
	setContent,
	setPosition,
	setIsActive,
	setSize,
	setIsMinimized,
	setIsClosed
  } = useAppWindow();

  const [mouseDown, setMouseDown] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);

	return () => {
	  document.removeEventListener('mousemove', handleMouseMove);
	  document.removeEventListener('mouseup', handleMouseUp);
	};
  }, [mouseDown]);
  
  useEffect(() => {
	  setContent(content);
	}, [content, setContent]);
  
  const handleMouseDown = e => {
	setMouseDown(true);
	setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = e => {
	if (!mouseDown) return;

	setPosition({
	  x: position.x + (e.clientX - initialPosition.x),
	  y: position.y + (e.clientY - initialPosition.y)
	});
	setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
	setMouseDown(false);
  };
  
  const handleTextChange = (event) => {
  setContent(event.target.value);
  };
  
  const [editingTitle, setEditingTitle] = useState(false);
  
  function renderContent() {
	switch (type) {
	  case 'TextEdit':
		return <TextArea text={content} handleTextChange={handleTextChange} />;
	  case 'type2':
		return <TextArea content={content} />;
	  case 'type3':
		return <TextArea content={content} />;
	}};
  
return (
	<>
	  {!isClosed && (
		<div
		  style={{
			width: isMinimized ? '50px' : size.width,
			height: isMinimized ? '50px' : size.height,
			left: position.x,
			top: position.y,
			backgroundColor: isActive ? 'black' : 'lightgray',
			position: 'absolute',
			border: '1px solid black'
		  }}
		>
		  <div
			style={{
			  width: '100%',
			  height: '21px',
			  backgroundColor: isActive ? 'black' : '#AAAAAA',
			  color: isActive ? 'white' : 'black',
			  cursor: 'default',
			  display: 'flex',
			  justifyContent: 'space-between',
			  fontFamily: 'NeueBitBold',
			  boxShadow: 'inset 1px 1px #FCFCFE, inset -1px -1px #565656, 0 1px #000000',
			}}
			onMouseDown={handleMouseDown}
			onDoubleClick={() => !editingTitle && setIsMinimized(!isMinimized)}
		  >
			{!isMinimized && (
			  <div style={{ display: 'flex', alignItems: 'center' }}>
				<WindowButton icon="minimize" onClick={() => setIsMinimized(true)} />
			  </div>
			)}
			<div style={{ display: 'flex', alignItems: 'center' }}>
			  {!editingTitle ? (
				<div
				  style={{ marginLeft: 'auto', fontSize: isMinimized ? '9px' : '9px' }}
				  onDoubleClick={() => setEditingTitle(true)}
				>
				  {title}
				</div>
			  ) : (
				<input
				  type="text"
				  value={title}
				  onChange={e => setTitle(e.target.value)}
				  onBlur={() => setEditingTitle(false)}
				  autoFocus
				/>
			  )}
			</div>
			{!isMinimized && (
			  <div style={{ display: 'flex', alignItems: 'center' }}>
				<WindowButton icon="close" onClick={() => setIsClosed(true)} />
			  </div>
			)}
		  </div>
		  <div>
			{!isMinimized && (
			  <>
				{renderContent()}
			  </>
			)}
		  </div>
		</div>
	  )}
	</>
  );




  };
  
  export default AppWindow;
