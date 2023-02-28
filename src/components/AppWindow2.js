import React, { useState, useEffect } from 'react';
import create from 'zustand';
import Draggable from 'react-draggable';
import WindowButton from "./WindowButton";
import TextArea from "./TextArea";
import ImgArea from "./ImgView";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const useAppWindow = create((set, get) => ({
  title: 'Mindware.txt',
  type: 'TextEdit',
  content:
	"The first 𝙿𝚄𝙽𝙺 thing one can do is change one's mind. Then, try changing this text.",
  position: {
	x: 0,
	y: 0,
  },
  isActive: false,
  size: {
	width: 666,
	height: 333,
  },
  isMinimized: false,
  setIsMinimized: (isMinimized) => {
	const { position, id } = get();
	const isMinimizedList = [...get().isMinimizedList];
	const isActive = !isMinimized;
	const found = isMinimizedList.findIndex((minimizedWindow) => minimizedWindow.id === id);

	if (isMinimized) {
	  isMinimizedList.push({ id, position, isActive });
	} else {
	  isMinimizedList.splice(found, 1);
	}

	set({ isMinimized, isActive, isMinimizedList });
  },
  isClosed: false,
  setTitle: (title) => set({ title }),
  setType: (type) => set({ type }),
  setContent: (content) => set({ content }),
  setPosition: (position) => set({ position }),
  setIsActive: (isActive) => set({ isActive }),
  setSize: (size) => set({ size }),
  setIsClosed: (isClosed) => set({ isClosed }),
  id: uuidv4(),
  isMinimizedList: [],
}));

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  height: 9px;
  width: 100%;
`;

const WindowFooterMid = styled.div`
  bottom: 0;
  z-index: 2;
  height: 9px;
  width: 100%;
  background: #AAA;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, .5px .5px #000000;
  box-size: border-box;
`;

const WindowFooterSide = styled.div`
  bottom: 0;
  z-index: 2;
  height: 9px;
  width: 42px;
  background: #AAA;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, .5px .5px #000000;
  box-size: border-box;
`;

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
	setIsMinimized,
	setTitle,
	setType,
	setContent,
	setPosition,
	setIsActive,
	setSize,
	setIsClosed,
	id,
	isMinimizedList,
  } = useAppWindow();

  const [mouseDown, setMouseDown] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  
  
  useEffect(() => {
	  setContent(content);
	}, [content, setContent]);
  
  
  const handleTextChange = (event) => {
  setContent(event.target.value);
  };
  
  const [editingTitle, setEditingTitle] = useState(false);
  
  function renderContent() {
	switch (type) {
	  case 'TextEdit':
		return <TextArea text={content} handleTextChange={handleTextChange} />;
	  case 'Image':
		return <ImgArea content={content} />;
	  case 'type3':
		return <TextArea content={content} />;
	}};
	
	const handleRestore = () => {
	  setIsMinimized(false);
	};

  
return (
	<>
	  {!isClosed && (
		<Draggable handle=".titleBar, .windowFooter">
		<div
		  style={{
			width: isMinimized ? '64px' : size.width,
			height: isMinimized ? '64px' : size.height,
			left: position.x,
			top: position.y,
			backgroundColor: isActive ? 'black' : 'lightgray',
			position: 'absolute',
			border: '1px solid black'
		  }}
		>
		  <div className="titleBar"
			style={{
			  width: '100%',
			  height: isMinimized ? '11px' : '21px',
			  backgroundColor: isActive ? '#AAAAAA' : '#000',
			  backgroundColor: isMinimized ? 'black' : '#AAAAAA',
			  color: isActive ? 'white' : 'black',
			  color: isMinimized ? 'white' : 'black',
			  cursor: 'default',
			  display: 'flex',
			  justifyContent: isMinimized ? 'center' : 'space-between',
			  fontFamily: 'PunkSystemBold',
			  boxSize: 'border-box',
			  boxShadow: 'inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000',
			  zIndex: '9'
			}}
			onDoubleClick={() => setIsMinimized(!isMinimized)}
		  >
			{!isMinimized && (
			  <div style={{ display: 'flex', alignItems: 'center', spacing: '0', margin: '0', padding: '0' }}>
				<WindowButton icon="minimize" onClick={() => setIsMinimized(true)} />
			  </div>
			)}
			<div style={{ display: 'flex', alignItems: 'center' }}>
			  {!editingTitle ? (
				<div
				  style={{ marginLeft: 'auto', fontSize: isMinimized ? '8px' : '10px', textTransform: isMinimized ? 'none' : 'none', fontFamily: isMinimized ? 'PunkSystemComp' : 'PunkSystemBold', marginTop: isMinimized ? '1px' : '3px', fontWeight: 'bold'}}
				  onDoubleClick={() => {
					  if (!editingTitle) {
						setIsMinimized(!isMinimized);
						setEditingTitle(true);
					  }
					}}
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
				
				<FooterContainer className="windowFooter">
				  <WindowFooterSide />
					<WindowFooterMid />
				  <WindowFooterSide />
				</FooterContainer>
			  </>
			)}
		  </div>
		</div>
		</Draggable>
	  )}
	</>
  );

  };
  
  export default AppWindow;