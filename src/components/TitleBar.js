import React from 'react';
import WindowButton from "./WindowButton";
import PropTypes from 'prop-types';

const TitleBar = ({
  isMinimized,
  title,
  onMinimize,
  onClose,
  onTitleDoubleClick,
  isActive,
  editingTitle,
  setTitle,
  setEditingTitle
}) => (
  <div 
	className="titleBar"
	style={{
	  width: '100%',
	  height: isMinimized ? '11px' : '21px',
	  backgroundColor: isMinimized ? 'black' : (isActive ? '#AAAAAA' : '#000'),
	  color: isMinimized ? 'white' : (isActive ? 'white' : 'black'),
	  cursor: 'default',
	  display: 'flex',
	  justifyContent: isMinimized ? 'center' : 'space-between',
	  fontFamily: 'PunkSystemBold',
	  boxSizing: 'border-box',
	  boxShadow: 'inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000',
	  zIndex: '90'
	}}
  >
	{!isMinimized && (
	  <div style={{ display: 'flex', alignItems: 'center', spacing: '0', margin: '0', padding: '0' }}>
		<WindowButton icon="minimize" onClick={onMinimize} />
	  </div>
	)}
	<div style={{ display: 'flex', alignItems: 'center' }}>
	  {!editingTitle ? (
		<div
		  style={{
			marginLeft: 'auto', 
			fontSize: isMinimized ? '8px' : '10px', 
			textTransform: 'none', 
			fontFamily: isMinimized ? 'PunkSystemComp' : 'PunkSystemBold', 
			marginTop: isMinimized ? '1px' : '3px',
			color: isActive ? 'black' : 'white'
		  }}
		  onDoubleClick={onTitleDoubleClick}
		>
		  {title}
		</div>
	  ) : (
		<input
		  type="text"
		  value={title}
		  onChange={e => setTitle(e.target.value)}
		  onBlur={() => setEditingTitle(false)}
		  style={{
			fontFamily: 'PunkSystemBold',
			fontSize: '10px', // same as the div displaying the title
			textAlign: 'center',
			backgroundColor: "#CCCCCC",
			outline: '2px solid #222222',
			padding: "2px" // remove default border
		  }}
		  autoFocus
		/>

	  )}
	</div>
	{!isMinimized && (
	  <div style={{ display: 'flex', alignItems: 'center' }}>
		<WindowButton icon="close" onClick={onClose} />
	  </div>
	)}
  </div>
);

TitleBar.propTypes = {
  isMinimized: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onMinimize: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onTitleDoubleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  editingTitle: PropTypes.bool.isRequired,
  setTitle: PropTypes.func.isRequired,
  setEditingTitle: PropTypes.func.isRequired,
};

export default TitleBar;
