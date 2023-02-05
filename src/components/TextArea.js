import React, { useRef, useEffect } from "react";

const TextArea = ({ text, handleTextChange }) => {
  const textareaRef = useRef(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
	const textarea = textareaRef.current;
	const scrollbar = scrollbarRef.current;
	const updateScrollbar = () => {
	  scrollbar.style.height = `${textarea.offsetHeight * (textarea.offsetHeight / textarea.scrollHeight)}px`;
	  scrollbar.style.top = `${textarea.scrollTop * (textarea.offsetHeight / textarea.scrollHeight)}px`;
	};

	textarea.addEventListener("scroll", updateScrollbar);
	return () => {
	  textarea.removeEventListener("scroll", updateScrollbar);
	};
  }, []);

  return (
	<div className="content">
	  <div style={{ width: "18px", height: "100%", backgroundColor: "grey", position: "absolute", left: "0" }}>
		<div
		  ref={scrollbarRef}
		  style={{
			position: "absolute",
			right: "2px",
			top: "0",
			width: "16px",
			backgroundColor: "#AAAAAA",
		  }}
		/>
	  </div>
	  <textarea
		ref={textareaRef}
		className="textedit-textarea"
		value={text}
		onChange={handleTextChange}
		style={{ width: "calc(100% - 18px)", height: "100%", position: "relative", left: "18px" }}
	  />
	</div>
  );
};

export default TextArea;
