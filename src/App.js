import React, { mode, useState, useRef } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  extendTheme
} from '@chakra-ui/react';
import Draggable from "react-draggable";
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import './styles.css';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Bottom from './components/Bottom';
import Window from './components/Window';

const myTheme = extendTheme({
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
        bg: mode('darkback', 'darkback')(props),
        backgroundImage: mode('linear-gradient(45deg, #0075FF 25%, transparent 25%), linear-gradient(-45deg, #0075FF 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0075FF 75%), linear-gradient(-45deg, transparent 75%, #0075FF 75%)','linear-gradient(45deg, #B5FF00 25%, transparent 25%), linear-gradient(-45deg, #B5FF00 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #B5FF00 75%), linear-gradient(-45deg, transparent 75%, #B5FF00 75%)'),
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
      }
    })
  }
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Desktop background="grey">
      <Dock>
      </Dock>
        
        <Window title="Mindware.txt">
        </Window>
        <Bottom />
      </Desktop>
    </ChakraProvider>
  );
}

export default App;
