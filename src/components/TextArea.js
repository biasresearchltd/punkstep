import React, { useRef, useEffect } from "react";
import WindowButton from "./WindowButton";
import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  textarea {
	width: calc(100% - 25px);
	height: 299px;
	position: absolute;
	left: 21px;
  }
`;

const Scrollbar = styled.div`
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

  .scrollbar {
	box-sizing: border-box;
	position: absolute;
	margin-left: -1px;
	margin-top: 2px;
	top: 0;
	width: 15px;
	background-color: #AAAAAA;
	box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000;
  }
  
  .windowButton {
	  padding: 0;
	  margin: 0;
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
	  scrollbar.style.height = `${barHeight}px`;
	  scrollbar.style.top = `${textarea.scrollTop * (textarea.offsetHeight / textarea.scrollHeight)}px`;
	};

	textarea.addEventListener("scroll", updateScrollbar);
	return () => {
	  textarea.removeEventListener("scroll", updateScrollbar);
	};
  }, []);

  return (
	<Content className="content">
	  <Scrollbar>
		<div ref={scrollbarRef} className="scrollbar"/>
		<WindowButton className="up-button" icon="up" onClick="" />
		<WindowButton className="down-button" icon="down" onClick="" />
	  </Scrollbar>
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
