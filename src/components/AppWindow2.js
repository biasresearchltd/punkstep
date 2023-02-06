import React, { useState, useEffect } from 'react';
import create from 'zustand';

const useAppWindow = create((set, get) => ({
	title: 'Default Title',
	type: ['TextEdit', 'OKSH', 'Calendar', 'Poster'],
	content: 'Default Content',
	position: {
		x: 0,
		y: 0
	},
	isActive: false,
	size: {
		width: 666,
		height: 333
	},
	isMinimized: false,
	isClosed: false,
	setTitle: title => set({ title }),
	setType: type => set({ type }),
	setContent: content => set({ content }),
	setPosition: position => set({ position }),
	setIsActive: isActive => set({ isActive }),
	setSize: size => set({ size }),
	setIsMinimized: isMinimized => set({ isMinimized }),
	setIsClosed: isClosed => set({ isClosed })
}));

const AppWindow = () => {
  const {
	title,
	type,
	content,
	position,
	isActive,
	size,
	isMinimized,
	isClosed,
	setTitle,
	setType,
	setContent,
	setPosition,
	setIsActive,
	setSize,
	setIsMinimized,
	setIsClosed
  } = useAppWindow();

  const [mouseDown, setMouseDown] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);

	return () => {
	  document.removeEventListener('mousemove', handleMouseMove);
	  document.removeEventListener('mouseup', handleMouseUp);
	};
  }, [mouseDown]);
  
  const handleMouseDown = e => {
	setMouseDown(true);
	setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = e => {
	if (!mouseDown) return;

	setPosition({
	  x: position.x + (e.clientX - initialPosition.x),
	  y: position.y + (e.clientY - initialPosition.y)
	});
	setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
	setMouseDown(false);
  };

  return (
	<div
	  style={{
		width: size.width,
		height: size.height,
		left: position.x,
		top: position.y,
		backgroundColor: isActive ? 'lightblue' : 'lightgray',
		position: 'absolute'
	  }}
	>
	  <div
		style={{
		  width: '100%',
		  height: '20px',
		  backgroundColor: 'gray',
		  cursor: 'move'
		}}
		onMouseDown={handleMouseDown}
	  >
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
		  <div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ marginLeft: '10px' }}>{title}</div>
		  </div>
		  <div>
			{isMinimized ? (
			  <button onClick={() => setIsMinimized(false)}>
				Restore
			  </button>
			) : (
			  <button onClick={() => setIsMinimized(true)}>Minimize</button>
			)}
			<button onClick={() => setIsClosed(true)}>Close</button>
		  </div>
		</div>
	  </div>
	  {!isMinimized && (
		<div>
		  <p>{type}</p>
		  <p>{content}</p>
		</div>
	  )}
	  {isClosed && <p>Closed</p>}
	</div>
  );
  };
  
  export default AppWindow;
