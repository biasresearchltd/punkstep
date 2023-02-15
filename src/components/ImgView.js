import React, { useState, useRef, useEffect } from "react";
import ScrollButton from "./ScrollButton";
import ScrollBar from "../icons/ScrollBar.png";
import Monkey from "../icons/JPEG2000.png";
import styled from 'styled-components';

const Content = styled.div`
  z-index: 0;
  position: relative;
  textarea {
	width: calc(100% - 28px);
	height: 524px;
	position: absolute;
	left: 0;
  }
`;

const ScrollbarContainer = styled.div`
  z-index: 1;
  width: 100%;
  height: 538px;
  background-color: #AAA;
  position: absolute;
  top: 1px;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-right: 0.5px solid black;
  border-bottom: 1px solid black;
`;

const MonkeyImg = styled.img`
  z-index: 9;
  position: absolute;
  padding: 0;
  margin: 0;
  image-rendering: pixelated;
  width: 646px;
  height: 520px;
  border: none !important;
  box-shadow: -1px -1px #000000, -2px -2px #565656, 1.2px 1.2px #FFFFFF;
  display: flex;
  left: 10px;
  top: 10px;
  user-drag: none;
  user-select: none;
`;


const TextArea = ({ text, handleTextChange, isMinimized }) => {
  const textareaRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [showScrollbar, setShowScrollbar] = useState(true);

  useEffect(() => {
	const textarea = textareaRef.current;
	const scrollbar = scrollbarRef.current;
  
	const updateScrollbar = () => {
	  const barHeight = Math.min(
		textarea.offsetHeight * (textarea.offsetHeight / textarea.scrollHeight),
		textarea.offsetHeight
	  );
	  
	  if (isMinimized) {
	  setShowScrollbar(false);
	  return;};
	  
  
	  const minimumBarHeight = 10;
  
	  scrollbar.style.height = `${Math.max(barHeight - 42, minimumBarHeight)}px`;
  
	  scrollbar.style.top = `${textarea.scrollTop * (textarea.offsetHeight / textarea.scrollHeight)}px`;
	};
  
	const handleRestore = () => {
	  if (textareaRef.current.scrollHeight > textareaRef.current.offsetHeight) {
		scrollbarRef.current.style.display = 'flex';
	  }
	};
  
	const handleMinimize = () => {
	  scrollbarRef.current.style.display = 'none';
	};
  
	textarea.addEventListener('scroll', updateScrollbar);
  
	if (isMinimized) {
	  handleMinimize();
	} else {
	  handleRestore();
	}
  
	return () => {
	  textarea.removeEventListener('scroll', updateScrollbar);
	};
  }, [isMinimized]);


  const handleUpClick = () => {
	textareaRef.current.scrollTop -= 50;
  };

  const handleDownClick = () => {
	textareaRef.current.scrollTop += 50;
  };

  return (
	<Content className="content">
	  <ScrollbarContainer>
		<div className="scrollContainer">
		<div ref={scrollbarRef} className="scrollbar">
		

		</div>
		</div>
	  </ScrollbarContainer>
	  <textarea
		ref={textareaRef}
		className="textedit-textarea"
		value={text}
		onChange={handleTextChange}
		isMinimized={isMinimized}
		style={{ fontFamily:'NeueBit', fontSize: '9px', outline: 'none', borderRadius: '0', zIndex: '0', resize: 'none', borderBottom: '1.2px solid #AAAAAA'}}
	  />
	  <MonkeyImg src={Monkey} />
	</Content>
  );
};

export default TextArea;