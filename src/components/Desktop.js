import React, { useState, useRef } from 'react';
import styled from 'styled-components';

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
`;

const Desktop = ({ children, background }) => {
const [activeWindow, setActiveWindow] = useState(null);

const handleWindowClick = (id) => {
setActiveWindow(id);
};

return (
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
);
};

export default Desktop;