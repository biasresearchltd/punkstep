import React, { useRef, useEffect } from "react";
import ScrollButton from "./ScrollButton";
import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  textarea {
	width: calc(100% - 26px);
	height: 299px;
	position: absolute;
	left: 22px;
  }
`;

const ScrollbarContainer = styled.div`
  width: 22px;
  height: 304px;
  background-color: grey;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid black;

  .scrollContainer {
	position: absolute;
	left: 1px;
	top: 0;
	width: 100%;
  }
  
  .scrollbar {
	box-sizing: border-box;
	position: absolute;
	margin-left: 1px;
	margin-top: 2px;
	top: 0;
	width: 16px;
	background-color: #AAAAAA;
	box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000;
	image-rendering: pixelated;
  }
  
  .buttonContainer {
	position: absolute;
	left: -1px;
	width: 100%;
  }
  
  .scrollButton {
	position: absolute;
	padding: 0;
	margin: 0;
	image-rendering: pixelated;
  }
  
  .checkered3 {
	background-color: #0075FF;
	background-size: 2px 2px;
	background-position: 0 0, 1px 1px;
	background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85)),
					  linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85));
  }
`;


const TextArea = ({ text, handleTextChange }) => {
  const textareaRef = useRef(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
	const textarea = textareaRef.current;
	const scrollbar = scrollbarRef.current;
	const updateScrollbar = () => {
	  const barHeight = Math.min(textarea.offsetHeight * (textarea.offsetHeight / textarea.scrollHeight), textarea.offsetHeight);
	  scrollbar.style.height = `${barHeight-44}px`;
	  scrollbar.style.top = `${textarea.scrollTop * (textarea.offsetHeight / textarea.scrollHeight)}px`;
	};

	textarea.addEventListener("scroll", updateScrollbar);
	return () => {
	  textarea.removeEventListener("scroll", updateScrollbar);
	};
  }, []);

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
		<div ref={scrollbarRef} className="scrollbar"/></div>
		<div className="butttonContainer">
		<ScrollButton className="scrollButton" icon="up" onClick={handleUpClick} />
		<ScrollButton className="scrollButton" icon="down" onClick={handleDownClick} /></div>
	  </ScrollbarContainer>
	  <textarea
		ref={textareaRef}
		className="textedit-textarea"
		value={text}
		onChange={handleTextChange}
		style={{ fontFamily:'NeueBit', fontSize: '9px', outline: 'none', borderRadius: '0', zIndex: '0', resize: 'none'}}
	  />
	</Content>
  );
};

export default TextArea;

