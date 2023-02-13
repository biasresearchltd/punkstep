import { useState, useEffect } from 'react';
import PunkMotherMars from "./bgimages/Punk-Mother-Mars-Tile.png";

const bgc = {
  green: '#00FF46',
  blue: '#0075FF',
  orange: '#FF7F00',
  yellow: '#FFFF00',
  chartreuse: '#B5FF00',
  pink: '#FF00C4',
  darkback: '#192817',
  grey: '#AAAAAA',
  mars: PunkMotherMars
};


const colors = Object.values(bgc);

const ColorSelector = () => {
  const [selectedValue, setSelectedValue] = useState(colors[Math.floor(Math.random() * colors.length)]);

  useEffect(() => {
	const handleKeyPress = (event) => {
	  if (document.activeElement.tagName === 'TEXTAREA') return;
	  if (event.key === 'ArrowRight') {
		const currentIndex = colors.indexOf(selectedValue);
		const nextIndex = (currentIndex + 1) % colors.length;
		setSelectedValue(colors[nextIndex]);
	  } else if (event.key === 'ArrowLeft') {
		const currentIndex = colors.indexOf(selectedValue);
		const nextIndex = (currentIndex - 1 + colors.length) % colors.length;
		setSelectedValue(colors[nextIndex]);
	  }
	};
	window.addEventListener("keydown", handleKeyPress);
	return () => {
	  window.removeEventListener("keydown", handleKeyPress);
	};
  }, [selectedValue]);

  return selectedValue;
};

export default ColorSelector;
