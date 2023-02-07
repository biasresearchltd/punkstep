import React, { useRef, useEffect } from "react";
import ColorSelector from './BackgroundColor';

const TextArea = () => {
  const [selectedColor, setTextareaFocused] = ColorSelector();

  const handleFocus = () => {
	setTextareaFocused(true);
  };

  const handleBlur = () => {
	setTextareaFocused(false);
  };

  return (
	<textarea
	  style={{ backgroundColor: selectedColor }}
	  onFocus={handleFocus}
	  onBlur={handleBlur}
	/>
  );
};

export default TextArea;