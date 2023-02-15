import { useRef, useEffect, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
	const canvas = canvasRef.current;
	const ctx = canvas.getContext('2d');
	let lastX, lastY;
	let hue = 0;
	let direction = true;
	const colors = ['#00FF46', '#0075FF', '#FF00C4', '#FF7F00', '#FFFF00', '#B5FF00', '#0075FF'];
	const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
	colors.forEach((color, index) => {
	  gradient.addColorStop(index / (colors.length - 1), color);
	});

	function handleMouseDown(e) {
	  setIsDrawing(true);
	  lastX = e.offsetX;
	  lastY = e.offsetY;
	}

	function handleMouseMove(e) {
	  if (!isDrawing) return;
	  ctx.lineWidth = 2;
	  ctx.strokeStyle = gradient;
	  ctx.beginPath();
	  ctx.moveTo(lastX, lastY);
	  ctx.lineTo(e.offsetX, e.offsetY);
	  ctx.stroke();
	  lastX = e.offsetX;
	  lastY = e.offsetY;
	  
	  
	  
	}

	function handleMouseUp() {
	  setIsDrawing(false);
	}
	
	function handleMouseOut() {
		setIsDrawing(false);
	}
	
	function handleContextMenu(e) {
	  e.preventDefault();
	  ctx.clearRect(0, 0, canvas.width, canvas.height); // erase the canvas
	}


	canvas.addEventListener('mousedown', handleMouseDown);
	canvas.addEventListener('mousemove', handleMouseMove);
	canvas.addEventListener('mouseup', handleMouseUp);
	canvas.addEventListener('contextmenu', handleContextMenu);

	return () => {
	  canvas.removeEventListener('mousedown', handleMouseDown);
	  canvas.removeEventListener('mousemove', handleMouseMove);
	  canvas.removeEventListener('mouseup', handleMouseUp);
	  canvas.removeEventListener('contextmenu', handleContextMenu);
	};
  }, [isDrawing]);

  return <canvas ref={canvasRef} id="canvas" width={window.innerWidth} height={window.innerHeight} />;
};

export default Canvas;
