import React, { useState } from "react";
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Bottom from './components/Bottom';
import AppWindow from './components/AppWindow';

function App() {
  const [windows, setWindows] = useState([<AppWindow title="Mindware.txt" />]);
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
    setWindows(prevWindows => prevWindows.map((window, i) => {
      return (
        <AppWindow 
          title={window.props.title} 
          isActive={activeWindowIndex === index && i === index} 
          onTitlebarClick={() => handleTitlebarClick(i)} 
        />
      );
    }));
  };
  
  const [activeEditorId, setActiveEditorId] = useState(null);
  
  const handleEditorClick = (id) => {
    setActiveEditorId(id);
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
          {window}
        </div>
      ))}
      <Bottom />
    </Desktop>
  );
}

export default App;
