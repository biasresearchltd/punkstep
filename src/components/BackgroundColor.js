import { useState, useEffect } from 'react';

const bgc = {
  green: '#00FF46',
  blue: '#0075FF',
  orange: '#FF7F00',
  yellow: '#FFFF00',
  chartreuse: '#B5FF00',
  pink: '#FF00C4',
  darkback: '#192817',
  grey: '#AAAAAA'
};

const colors = Object.values(bgc);

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

  useEffect(() => {
	const handleKeyPress = (event) => {
	  if (event.key === 'ArrowRight') {
		const currentIndex = colors.indexOf(selectedColor);
		const nextIndex = (currentIndex + 1) % colors.length;
		setSelectedColor(colors[nextIndex]);
	  } else if (event.key === 'ArrowLeft') {
		const currentIndex = colors.indexOf(selectedColor);
		const nextIndex = (currentIndex - 1 + colors.length) % colors.length;
		setSelectedColor(colors[nextIndex]);
	  }
	};
	window.addEventListener("keydown", handleKeyPress);
	return () => {
	  window.removeEventListener("keydown", handleKeyPress);
	};
  }, [selectedColor]);

  return selectedColor;
};

export default ColorSelector;