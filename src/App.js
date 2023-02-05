import React, { useState } from "react";
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Bottom from './components/Bottom';
import Window from './components/Window';

function App() {
const [windows, setWindows] = useState([<Window title="Mindware.txt" />]);
const [backgroundPosition, setBackgroundPosition] = useState({x: 0, y: 0});
const [activeWindowIndex, setActiveWindowIndex] = useState(null);
const [text, setText] = useState("");

const handleMouseDown = (event) => {
const initialX = event.clientX;
const initialY = event.clientY;
const handleMouseMove = (event) => {
const deltaX = event.clientX - initialX;
const deltaY = event.clientY - initialY;
setBackgroundPosition({x: deltaX, y: deltaY});
};
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', () => {
document.removeEventListener('mousemove', handleMouseMove);
});
};

const addWindow = (newWindow) => {
setWindows(prevWindows => [...prevWindows, newWindow]);
};

const handleTitlebarClick = (index) => {
  setActiveWindowIndex(activeWindowIndex === index ? null : index);
};

return (
<Desktop 
     background="grey"
     backgroundPosition={backgroundPosition}
     onMouseDown={handleMouseDown}
     style={{
      overflow: 'hidden',
      touchAction: 'none'
     }}
   >
<Dock addWindow={addWindow} />
{windows.map((window, index) => (
  <div key={index}>
    <Window 
      title={window.props.title} 
      isActive={activeWindowIndex === index} 
      onTitlebarClick={() => handleTitlebarClick(index)} 
    />
  </div>
))}
<Bottom />
</Desktop>
);
}

export default App;
