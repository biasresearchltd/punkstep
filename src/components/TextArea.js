import React, { useState, useRef, useEffect } from "react";
import ScrollButton from "./ScrollButton";
import ScrollBar from "../icons/ScrollBar.png";
import styled from 'styled-components';

const Content = styled.div`
  z-index: 0;
  position: relative;
  textarea {
	position: absolute;
	width: calc(100% - 20px);
	height: 635.5px;
	left: 21px;
	top: 0.5px;
	padding: 4px;
  }
`;

const ScrollbarContainer = styled.div`
  z-index: 1;
  width: 22px;
  height: 634.5px;
  background-color: #AAA;
  position: absolute;
  top: 1.5px;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  user-select: none;
  cursor: default;

  .scrollContainer {
	flex-grow: 1;
	width: 17px;
	background-size: 2px 2px;
	background-position: 0 0, 1px 1px;
	background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85)),
					  linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85));
	margin-top: 1.5px;
	overflow: hidden;
	margin-bottom: ${props => props.hasScrollbar ? '39px' : '2px'};
  }
  
  .scrollbar {
	box-sizing: border-box;
	position: absolute;
	width: 17px;
	right: 2.5px;
	background-color: #AAAAAA;
	box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, .5px .5px #000000;
	image-rendering: pixelated;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
  }
  
  .buttonContainer {
	position: absolute;
	left: .5px;
	bottom: 1px;
	width: 100%;
	spacing: 0;
	padding: 0;
	margin: 0;
	user-select: none;
  }
  .hide {
	display: none;
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
  user-select: none;
  draggable: false;
`;

const TextArea = ({ text, onChange, isMinimized }) => {
  const textareaRef = useRef(null);
  const scrollbarRef = useRef(null);
  const scrollbarContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  let debounceTimer;
  const updateScrollbar = () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
	  const textarea = textareaRef.current;
	  const needsScrollbar = textarea.scrollHeight > textarea.offsetHeight;
	  setHasScrollbar(needsScrollbar);

	  if (!needsScrollbar) return;

	  const barHeight = Math.min(
		textarea.offsetHeight * (textarea.offsetHeight / textarea.scrollHeight),
		textarea.offsetHeight
	  );

	  const minimumBarHeight = 10;
	  if (scrollbarRef.current) {
		scrollbarRef.current.style.height = `${Math.max(barHeight - 43, minimumBarHeight)}px`;
	  }

	  const maxScrollTop = textarea.scrollHeight - textarea.offsetHeight;
	  const scrollbarMaxTop = scrollbarContainerRef.current.offsetHeight - (scrollbarRef.current ? scrollbarRef.current.offsetHeight : 0) - 41;

	  const calculatedTop = ((textarea.scrollTop / maxScrollTop) * scrollbarMaxTop) + 1;
	  if (scrollbarRef.current) {
		scrollbarRef.current.style.top = `${Math.min(Math.max(calculatedTop, 1), scrollbarMaxTop + 1)}px`;
	  }
	}, 10); // adjust the delay as needed
  };

  useEffect(() => {
	const handleDocumentMouseMove = (e) => {
	  if (isDragging) handleDragMove(e);
	};

	const handleDocumentMouseUp = () => {
	  if (isDragging) handleDragEnd();
	};

	document.addEventListener('mousemove', handleDocumentMouseMove);
	document.addEventListener('mouseup', handleDocumentMouseUp);

	return () => {
	  document.removeEventListener('mousemove', handleDocumentMouseMove);
	  document.removeEventListener('mouseup', handleDocumentMouseUp);
	};
  }, [isDragging, startY, startScrollTop]);

  useEffect(() => {
	const textarea = textareaRef.current;
	textarea.addEventListener('scroll', updateScrollbar);
	textarea.addEventListener('input', updateScrollbar);

	return () => {
	  textarea.removeEventListener('scroll', updateScrollbar);
	  textarea.removeEventListener('input', updateScrollbar);
	};
  }, [text, isMinimized]);

  const handleDragStart = (e) => {
	e.preventDefault();
	setIsDragging(true);
	setStartY(e.clientY);
	setStartScrollTop(textareaRef.current.scrollTop);
  };

  const handleDragMove = (e) => {
	if (!isDragging) return;

	const deltaY = e.clientY - startY;
	const maxScrollTop = textareaRef.current.scrollHeight - textareaRef.current.offsetHeight;
	const scrollbarMaxTop = scrollbarContainerRef.current.offsetHeight - scrollbarRef.current.offsetHeight - 36;

	// Scale the deltaY value
	const scaledDeltaY = deltaY * (maxScrollTop / scrollbarMaxTop);

	textareaRef.current.scrollTop = startScrollTop + scaledDeltaY;
  };

  const handleDragEnd = () => {
	setIsDragging(false);
  };

  return (
	<Content className="content">
	  <ScrollbarContainer ref={scrollbarContainerRef} hasScrollbar={hasScrollbar}>
		<div className="scrollContainer">
		  {hasScrollbar && (
			<div 
			  ref={scrollbarRef} 
			  className="scrollbar" 
			  onMouseDown={handleDragStart}
			  onMouseMove={handleDragMove}
			  onMouseUp={handleDragEnd}
			>
			  <ScrollIcon src={ScrollBar} draggable="false"/>
			</div>
		  )}
		</div>
		{hasScrollbar && (
		  <div className="buttonContainer">
			<ScrollButton className="scrollButton" icon="up" onClick={() => textareaRef.current.scrollTop -= 50} />
			<ScrollButton className="scrollButton" icon="down" onClick={() => textareaRef.current.scrollTop += 50} />
		  </div>
		)}
	  </ScrollbarContainer>
	  <textarea
		ref={textareaRef}
		className="textedit-textarea"
		value={text}
		onChange={onChange}
		autoCorrect="off" 
		spellCheck="false" 
		autoComplete="off" 
		autoCapitalize="off"
		style={{ fontFamily:'PunkSystemReg', fontSize: '10px', outline: 'none', borderRadius: '0', zIndex: '0', resize: 'none', borderBottom: '1.2px solid #666', caretColor: 'black'}}
	  />
	</Content>
  );
};

export default TextArea;
