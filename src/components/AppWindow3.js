import React, { useState } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import WindowFooter from './WindowFooter';
import TextArea from "./TextArea";
import ImgArea from "./ImgView";

const AppWindow = ({ initialTitle, initialType, initialContent, isActive, onClick, onMinimize }) => {
  const [title, setTitle] = useState(initialTitle);
  const [type, setType] = useState(initialType);
  const [content, setContent] = useState(initialContent);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [size, setSize] = useState({ width: 666, height: 333 });
  const [position, setPosition] = useState({ x: -1200, y: 442 });

  const handleContentChange = (e) => {
	setContent(e.target.value);
  };

  const renderContent = () => {
	switch (type) {
	  case 'TextEdit':
		return <TextArea text={content} onChange={handleContentChange} />;
	  case 'Image':
		return <ImgArea content={content} />;
	  default:
		return <TextArea text={content} onChange={handleContentChange} />;
	}
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
			onClick={onClick}
		  >
			<TitleBar
			  isMinimized={isMinimized}
			  title={title}
			  onMinimize={onMinimize}
			  onClose={() => setIsClosed(true)}
			  onTitleDoubleClick={() => {
				if (!editingTitle) {
				  setEditingTitle(true);
				}
			  }}
			  isActive={isActive}
			  editingTitle={editingTitle}
			  setTitle={setTitle}
			  setEditingTitle={setEditingTitle}
			/>
			{!isMinimized && renderContent()}
			{!isMinimized && <WindowFooter />}
		  </div>
		</Draggable>
	  )}
	</>
  );
};

AppWindow.propTypes = {
  initialTitle: PropTypes.string,
  initialType: PropTypes.string,
  initialContent: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onMinimize: PropTypes.func
};

AppWindow.defaultProps = {
  initialTitle: 'Mindware.txt',
  initialType: 'TextEdit',
  initialContent: "The first 𝙿𝚄𝙽𝙺 thing one can do is change one's mind. Then, try changing this text.",
  isActive: false,
  onClick: () => {},
  onMinimize: () => {}
};

export default AppWindow;
