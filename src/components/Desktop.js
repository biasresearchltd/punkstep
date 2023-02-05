import React, { useState, useRef } from 'react';

const Desktop = ({ children, background }) => {
const [activeWindow, setActiveWindow] = useState(null);

const handleWindowClick = (id) => {
setActiveWindow(id);
};

return (
<div style={{
height: '500vh',
width: '500vw',
background: background,
overflow: 'hidden',
border: 'none'
}}>
<div style={{
display: 'flex',
justifyContent: 'center',
alignItems: 'center'
}}>
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
</div>
);
};

export default Desktop;