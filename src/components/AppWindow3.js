import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import WindowFooter from './WindowFooter';
import TextArea from "./TextArea";
import ImgArea from "./ImgView";
import IconImage from "../icons/TextEdit.png";
import './AppWindow.css';

const AppWindow = ({ initialTitle, initialType, initialContent, isActive, initialIsMinimized, onClick, onMinimize, minimizedPos, index, renameWindow, closeWindow, highestZIndex }) => {
  const [title, setTitle] = useState(initialTitle);
  const [type, setType] = useState(initialType);
  const [content, setContent] = useState(initialContent);
  const [isMinimized, setIsMinimized] = useState(initialIsMinimized);
  const [editingTitle, setEditingTitle] = useState(false);
  const [size, setSize] = useState({ width: 666, height: 666 });
  const [position, setPosition] = useState({ x: 'calc(50vw - 333px)', y: 'calc(50vh - 333px)' });
  const [originalPosition, setOriginalPosition] = useState(null);
  const [animationStage, setAnimationStage] = useState(null);
  const [showOutline, setShowOutline] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const [minimizedPosition, setMinimizedPosition] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState(isActive ? 'lightgray' : 'black');
  
  useEffect(() => {
	if (animationStep === 1) {
	  setTimeout(() => {
		if (isRestoring) {
		  setIsMinimized(false);
		  setIsRestoring(false);
		  setAnimationStep(0);
		  setPosition(originalPosition);
		} else {
		  setIsMinimized(true);
		  setAnimationStep(2);
		  setPosition({ x: `${minimizedPos.x}`, y: 'calc(100vh - 64px)' });
		}
	  }, 500);
	} else if (animationStep === 2) {
	  setTimeout(() => {
		setAnimationStep(3);
	  }, 500);
	}
  }, [animationStep, isRestoring, minimizedPos]);
  
  useEffect(() => {
	  if (animationStep === 1) {
		setBgColor('transparent');
	  }
	}, [animationStep]);
  
  useEffect(() => {
	if (animationStep === 1 || animationStep === 2) {
	  setBgColor('transparent');
	} else if (isMinimized) {
	  setBgColor('lightgray');
	} else {
	  setBgColor(isActive ? 'lightgray' : 'black');
	}
  }, [isMinimized, isActive, animationStep]);
  
  const handleMinimize = () => {
	  setOriginalPosition(position); // Save the original position
	  setIsRestoring(false);
	  setAnimationStep(1);
	  setMinimizedPosition({ x: minimizedPosition, y: 'calc(100vh - 64px)' });
	};
  
  const handleRestore = () => {
  	setIsRestoring(true);
  	setAnimationStep(1);
  };
  
  const handleContentChange = (e) => {
	setContent(e.target.value);
  };
  
  const handleMouseDown = () => {
	onClick(); 
	};
  
  const handleTitleChange = (newTitle) => {
	setTitle(newTitle);
	renameWindow(index, newTitle); // Assuming 'index' is the index of this window in the array
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

  const animationVariants = {
	initial: { opacity: 1, x: 0, y: 0, width: 666, height: 666, backgroundColor: 'transparent' },
	step1: { opacity: 0, x: 0, y: 0, width: 666, height: 666, backgroundColor: 'transparent' },
	step2: { opacity: 0, x: minimizedPosition.x, y: minimizedPosition.y, width: 64, height: 64, backgroundColor: 'transparent' },
	step3: { opacity: 1, x: minimizedPosition.x, y: minimizedPosition.y, width: 64, height: 64, backgroundColor: 'transparent' },
  };


  return (
	<AnimatePresence>
		<Draggable handle=".titleBar, .windowFooter" onStart={handleMouseDown}>
		  <motion.div
			  className={`app-window ${showOutline ? 'black-outline' : ''}`}
			  initial={false}
			  animate={{ backgroundColor: bgColor, left: position.x, top: position.y }}
			  transition={{ type: "tween", ease: "linear", duration: 0.1, opacity: { duration: 0.01 } }}
			  onMouseDown={handleMouseDown}
			  style={{
				left: position.x,
				top: position.y,
				position: 'absolute',
				cursor: 'default',
				userSelect: 'none',
				border: animationStep === 1 ? '2px solid black' : '1.5px solid black',
				zIndex: isActive ? highestZIndex : 999,
				backgroundImage: isMinimized && animationStep === 3 ? `url(${IconImage})` : 'none',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				opacity: isMinimized ? 1 : 1
			  }}
			  onClick={() => {
				  onClick();  // This should set the active window and update highestZIndex
				}}
			>
			  <motion.div
				initial="initial"
				animate={animationStep === 0 ? "initial" : `step${animationStep}`}
				variants={animationVariants}
				transition={{ type: "tween", ease: "linear", duration: 0.1666, opacity: { duration: 0.1 } }}  // Set your desired duration here
				onDoubleClick={isMinimized ? handleRestore : null}
			  >
			<TitleBar
			  isMinimized={isMinimized}
			  title={title}
			  onMinimize={handleMinimize}
			  onClose={closeWindow}
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
			{!isMinimized && <WindowFooter/>}
		  </motion.div>
		  </motion.div>
		</Draggable>
	</AnimatePresence>
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
  initialContent: "The first 𝙿𝚄𝙽𝙺 thing one can do is change one's mind.",
  isActive: false,
  onClick: () => {},
  onMinimize: () => {}
};

export default AppWindow;
