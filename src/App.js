import React, { useState } from "react";
import styled from 'styled-components';
import { create } from "zustand";
import Dock from './components/Dock';
import Bottom from './components/Bottom';
import AppWindow from './components/AppWindow';
import './styles.css';

const DesktopContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.background};
  overflow: hidden;
  border: none;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Desktop = ({ children, background }) => {
  return (
    <DesktopContainer background={background}>
      {children}
    </DesktopContainer>
  );
};

const myTheme = ({
  config: {
    useSystemColorMode: false,
    
  },
  colors: {
      green: '#00FF46',
      blue: '#0075FF',
      orange: '#FF7F00',
      yellow: '#FFFF00',
      chartreuse: '#B5FF00',
      pink: '#FF00C4',
      darkback: '#192817'
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'darkback',
        backgroundImage: 'linear-gradient(45deg, #0075FF 25%, transparent 25%), linear-gradient(-45deg, #0075FF 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0075FF 75%), linear-gradient(-45deg, transparent 75%, #0075FF 75%)linear-gradient(45deg, #B5FF00 25%, transparent 25%), linear-gradient(-45deg, #B5FF00 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #B5FF00 75%), linear-gradient(-45deg, transparent 75%, #B5FF00 75%)',
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
      }
    })
  }
});


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
  const { windows, addWindow, activeWindowIndex, handleWindowClick, minimizedWindows, minimizeWindow, restoreWindow, windowsClassName } = useApp();

 return (
     <Desktop background="#0075FF">
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
             className={`app-window-${index}`}
             title={window.props.title}
             isActive={index === activeWindowIndex}
             onClick={() => handleWindowClick(index)}
             onMinimize={() => minimizeWindow(index)}
           />
         </div>
       ))}
       <Bottom
         minimizedWindows={minimizedWindows}
         restoreWindow={restoreWindow}
       />
     </Desktop>
   );
 };
 
 export default App;
