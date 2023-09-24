import React, { useState } from "react";
import styled from 'styled-components';
import { create } from "zustand";
import Dock from './components/Dock';
import Menu from './components/Menu';
import Bottom from './components/Bottom';
import AppWindow from './components/AppWindow3';
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
  display: flex; 
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

const useApp = create((set) => ({
  windows: [<AppWindow title="Mindware.txt" />],
  backgroundPosition: { x: 0, y: 0 },
  activeWindowIndex: 0,
  text: "",
  activeEditorId: null,
  minimizedWindows: [],
  windowsClassName: [],

  addWindow: (newWindow) => set((state) => {
    const newClassName = `app-window-${state.windows.length}`;
    const windowsClassName = [...state.windowsClassName, newClassName];
    return {
      windows: [...state.windows, newWindow],
      activeWindowIndex: state.windows.length,
      windowsClassName,
    };
  }),

  handleWindowClick: (index) => set((state) => {
    let newActiveWindowIndex = state.activeWindowIndex;
    if (index !== state.activeWindowIndex) {
      newActiveWindowIndex = index;
    }
    return { activeWindowIndex: newActiveWindowIndex };
  }),

  minimizeWindow: (index, coordinates) => set((state) => {
    const minimizedWindow = (
      <AppWindow
        title={state.windows[index].props.title}
        position={coordinates}
      />
    );
    const minimizedWindows = [...state.minimizedWindows, minimizedWindow];
    const windows = state.windows.filter((_, i) => i !== index);
    return { windows, minimizedWindows };
  }),

  restoreWindow: (index) => set((state) => {
    const restoredWindow = state.minimizedWindows[index];
    const minimizedWindows = state.minimizedWindows.filter((_, i) => i !== index);
    const windows = [...state.windows, restoredWindow];
    return { windows, minimizedWindows };
  }),

  handleEditorClick: (id) => set((state) => ({
    activeEditorId: id,
  })),
    
}));


const App = () => {
  const { background, windows, addWindow, activeWindowIndex, handleWindowClick, minimizedWindows, minimizeWindow, restoreWindow, windowsClassName } = useApp();

return (
      <Desktop background={background}>
      <DrawCanvas />
      <Menu />
            <Dock addWindow={addWindow} />
            {windows.map((window, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  zIndex: index === activeWindowIndex ? 10 : 0,
                }}
              >
                <AppWindow
                  initialTitle={window.props.title}
                  initialType="TextEdit"
                  initialContent={window.props.content}
                  isActive={index === activeWindowIndex}
                  onClick={() => handleWindowClick(index)}
                  onMinimize={() => minimizeWindow(index)}
                />
              </div>
            ))}
            <Recycle />
            <SVG filename="Pink"/>
            <SVG filename="Green"/>
            <Jpeg filename="monkey" />
            <Jpeg filename="something how far does this go" />
            <Bottom
              minimizedWindows={minimizedWindows}
              restoreWindow={restoreWindow}
            />
      </Desktop>
  );


 };
 
 export default App;
