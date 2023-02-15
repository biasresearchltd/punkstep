import React from 'react';
import Draggable from 'react-draggable';
import MySVG from './PunkHead.svg';

const DraggableSVG = () => {
  const handleDrag = (e, ui) => {
	const { x, y } = ui;
	// Do something with the x and y positions of the SVG as it's dragged
  };

  return (
	<Draggable onDrag={handleDrag}>
	  <div>
		<img src={MySVG} alt="PunkHeadv000666" />
	  </div>
	</Draggable>
  );
};

export default DraggableSVG;
