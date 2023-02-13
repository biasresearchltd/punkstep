import React, { useRef, useEffect } from "react";
import ScrollButton from "./ScrollButton";
import ScrollBar from "../icons/ScrollBar.png"
import styled from 'styled-components';

const Content = styled.div`
  z-index: 0;
  position: relative;
  textarea {
	width: calc(100% - 25px);
	height: 297px;
	position: absolute;
	left: 20px;
  }
`;

const ScrollbarContainer = styled.div`
  z-index: 1;
  width: 21px;
  height: 302px;
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

  .scrollContainer {
	  position: absolute;
	  left: 2px;
	  top: 2px;
	  height: 261px;
	  width: 16px;
	  background-size: 2px 2px;
	  background-position: 0 0, 1px 1px;
	  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85)),
						linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85));
	}
  
  .scrollbar {
	  box-sizing: border-box;
	  position: absolute;
	  margin-left: 0px;
	  margin-top: 0;
	  width: 16px;
	  background-color: #AAAAAA;
	  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, .5px .5px #000000;
	  image-rendering: pixelated;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  padding: 0;
	  margin: 0;
	}
	
	.buttonContainer {
		position: absolute;
		left: 1px;
		bottom: 1.2px;
		width: 100%;
		spacing: 0;
		padding: 0;
		margin: 0;
	  }
`;

const ScrollIcon = styled.img`
  position: absolute;
  padding: 0;
  margin: 0;
  image-rendering: pixelated;
  width: 6px;
  height: 6px;
  border: none !important;
  box-shadow: none !important;
  display: flex;
`;


const TextArea = ({ text, handleTextChange }) => {
  const textareaRef = useRef(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
	const textarea = textareaRef.current;
	const scrollbar = scrollbarRef.current;
	const updateScrollbar = () => {
	  const barHeight = Math.min(textarea.offsetHeight * (textarea.offsetHeight / textarea.scrollHeight), textarea.offsetHeight);
	  scrollbar.style.height = `${barHeight-42}px`;
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
		<div ref={scrollbarRef} className="scrollbar">
		{textareaRef.current.scrollHeight > textareaRef.current.offsetHeight && (
		  <ScrollIcon src={ScrollBar} />
		)}
		</div>
		</div>
		<div className="buttonContainer">
		<ScrollButton className="scrollButton" icon="up" onClick={handleUpClick} />
		<ScrollButton className="scrollButton" icon="down" onClick={handleDownClick} /></div>
	  </ScrollbarContainer>
	  <textarea
		ref={textareaRef}
		className="textedit-textarea"
		value={text}
		onChange={handleTextChange}
		style={{ fontFamily:'NeueBit', fontSize: '9px', outline: 'none', borderRadius: '0', zIndex: '0', resize: 'none', borderBottom: "1.2px solid #AAAAAA"}}
	  />
	</Content>
  );
};

export default TextArea;

