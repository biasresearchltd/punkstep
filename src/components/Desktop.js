import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import './Desktop.css';

const StyledDesktop = styled.div`
height: 100vh;
width: 100vw;
background: ${props => props.background};
overflow: hidden;
border: none;

.container {
display: flex;
justify-content: center;
align-items: center;
}

.checkered3 {
  background-color: #0075FF;
  background-size: 2px 2px;
  background-position: 0 0, 1px 1px;
  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85)),
					linear-gradient(45deg, rgba(0, 0, 0, 0.85) 15%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.85) 66%, rgba(0, 0, 0, 0.85));
}

`;

const Desktop = ({ children, background }) => {
const [activeWindow, setActiveWindow] = useState(null);

const handleWindowClick = (id) => {
setActiveWindow(id);
};

return (
  <div className="checkered3">
	<StyledDesktop background={background}>
	  <div className="container">
		{
		  React.Children.map(children, (child, index) => {
			return React.cloneElement(child, {
			  id: index,
			  onClick: handleWindowClick,
			  isActive: index === activeWindow
			});
		  })
		}
	  </div>
	</StyledDesktop>
  </div>
);
};

export default Desktop;
