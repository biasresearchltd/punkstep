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
}) => {
  // Truncate the title based on whether the window is minimized
  const truncatedTitle = isMinimized ? title.substring(0, 12) : title.substring(0, 48);

  return (
	<div 
	  className="titleBar"
	  style={{
		width: '100%',
		height: isMinimized ? '11px' : '21px',
		backgroundColor: isMinimized ? 'black' : (isActive ? '#000' : '#AAA'),
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
			  marginTop: isMinimized ? '13px' : '3px',
			  marginLeft: isMinimized ? '3px' : '0px',
			  color: isActive ? 'white' : 'black'
			}}
			onDoubleClick={() => {
			  if (!isMinimized) {
				onTitleDoubleClick();
			  }
			}}
		  >
			{truncatedTitle} — ~
		  </div>
		) : (
		  <input
			type="text"
			value={title}
			onChange={e => setTitle(e.target.value)}
			onBlur={() => setEditingTitle(false)}
			style={{
			  fontFamily: 'PunkSystemBold',
			  fontSize: '10px',
			  textAlign: 'center',
			  backgroundColor: "#CCCCCC",
			  outline: '2px solid #222222',
			  padding: "2px"
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
};

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
