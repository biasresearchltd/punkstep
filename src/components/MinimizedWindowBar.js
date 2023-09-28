import React from 'react';
import './MinimizedWindowBar.css';

const MinimizedWindowBar = ({ children }) => {
  return (
	<div className="minimized-window-bar">
	  {children}
	</div>
  );
};

export default MinimizedWindowBar;
