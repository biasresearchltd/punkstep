import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Dock from './components/Dock';
import Menu from './components/Menu';
import Bottom from './components/Bottom';
import AppWindow from './components/AppWindow3';
// import MinimizedWindowBar from './components/MinimizedWindowBar';
import Recycle from './components/Recycle';
import Jpeg from './components/JPG';
import SVG from './components/SVG';
import ColorSelector from './components/ColorSelector';
import DrawCanvas from './components/DrawCanvas';
import './styles.css';

const DesktopContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.background};
  background-image: url(${props => props.backgroundImage});
  background-repeat: repeat;
  overflow: hidden;
  border: none;
  touch-action: none; 
`;

const MinimizedWindowBar = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Desktop = ({ children }) => {
  const selectedValue = ColorSelector();
  return (
    <DesktopContainer 
      background={selectedValue.type === "color" ? selectedValue.value : null}
      backgroundImage={selectedValue.type === "image" ? selectedValue.value : null}
    >
      {children}
    </DesktopContainer>
  );
};

const App = () => {
  const [windows, setWindows] = useState([
    { title: 'UNTITLED.txt', content: '', isMinimized: false }
  ]);

  const [activeWindowIndex, setActiveWindowIndex] = useState(0);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [untitledCount, setUntitledCount] = useState(2);
  const [highestZIndex, setHighestZIndex] = useState(10000);
  const [freedUntitledNumbers, setFreedUntitledNumbers] = useState([]);
  const [nextMinimizedPosition, setNextMinimizedPosition] = useState(0);
  
  const addWindow = () => {
    let newTitle;
    if (freedUntitledNumbers.length > 0) {
      // Use the smallest available number from freedUntitledNumbers
      const smallestFreedNumber = freedUntitledNumbers[0];
      newTitle = `UNTITLED${smallestFreedNumber}.txt`;
      // Remove the used number from freedUntitledNumbers
      setFreedUntitledNumbers(freedUntitledNumbers.slice(1));
    } else if (untitledCount === 0) {
      newTitle = "UNTITLED.txt";
      setUntitledCount(untitledCount + 1);
    } else {
      newTitle = `UNTITLED${untitledCount - 1}.txt`;
      setUntitledCount(untitledCount + 1);
    }
    const newWindow = { id: uuidv4(), title: newTitle, content: '', isMinimized: false };
    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  };


  const closeWindow = (id) => {
    setWindows(windows.filter(window => window.id !== id));
    
    // If the closed window was an "UNTITLED" window, add its number to the freed numbers
    const closedWindow = windows.find(window => window.id === id);
    if (closedWindow && closedWindow.title.startsWith("UNTITLED")) {
      const number = parseInt(closedWindow.title.replace("UNTITLED", "").replace(".txt", ""), 10);
      setFreedUntitledNumbers([...freedUntitledNumbers, number].sort((a, b) => a - b));
    }
  };
  
  const renameWindow = (index, newTitle) => {
    const renamedWindow = windows[index];
    const oldTitle = renamedWindow.title;
    
    // Check if the old title starts with "UNTITLED" and the new title does not
    if (oldTitle.startsWith("UNTITLED") && !newTitle.startsWith("UNTITLED")) {
      const number = parseInt(oldTitle.replace("UNTITLED", "").replace(".txt", ""), 10);
      setFreedUntitledNumbers([...freedUntitledNumbers, number].sort((a, b) => a - b));
    }
    
    renamedWindow.title = newTitle;
    setWindows([...windows]);
  };


  const handleWindowClick = (id) => {
    setActiveWindowId(id);
    setHighestZIndex(highestZIndex + 1);  // Increment the highestZIndex
  };

  const minimizeWindow = (index) => {
    const newWindows = [...windows];
    newWindows[index].isMinimized = true;
    setWindows(newWindows);
    setNextMinimizedPosition(nextMinimizedPosition + 64); // Update next position
  };

  const restoreWindow = (index) => {
    const newWindows = [...windows];
    newWindows[index].isMinimized = false;
    setWindows(newWindows);
  };

  return (
    <Desktop>
      <DrawCanvas />
      <Menu />
      <Dock addWindow={addWindow} />
      {/* Render normal (non-minimized) windows */}
      {windows.map((window, index) => {
        if (!window.isMinimized) {
          return (
            <div key={window.id} style={{ zIndex: window.id === activeWindowId ? highestZIndex : 0 }}>
              <AppWindow
                id={window.id}
                initialTitle={window.title}
                initialType="TextEdit"
                initialContent={window.content}
                isActive={window.id === activeWindowId}
                onClick={() => {
                  setActiveWindowId(window.id);
                  setHighestZIndex(highestZIndex + 1);
                }}
                onMinimize={() => minimizeWindow(index)}
                closeWindow={() => closeWindow(window.id)}
                index={index}
                highestZIndex={highestZIndex}
              />
            </div>
          );
        }
        return null;
      })}
      {/* Render minimized windows */}
      <MinimizedWindowBar>
        {windows.map((window, index) => {
          if (window.isMinimized) {
            return (
              <AppWindow
                key={window.id}
                id={window.id}
                initialTitle={window.title}
                initialType="TextEdit"
                initialContent={window.content}
                isActive={window.id === activeWindowId}
                initialIsMinimized={window.isMinimized}
                onClick={() => {
                  setActiveWindowId(window.id);
                  setHighestZIndex(highestZIndex + 1);
                }}
                onMinimize={() => minimizeWindow(index)}
                closeWindow={() => closeWindow(window.id)}
                index={index}
                highestZIndex={highestZIndex}
              />
            );
          }
          return null;
        })}
      </MinimizedWindowBar>
      <Recycle />
      <SVG filename="Pink" />
      <SVG filename="Green" />
      <Jpeg filename="monkey" />
      <Jpeg filename="something how far does this go" />
      <Bottom />
    </Desktop>
  );

};

export default App;
