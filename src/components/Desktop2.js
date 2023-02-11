import React from 'react';
import styled from 'styled-components';
import ColorSelector from './ColorSelector';

const DesktopContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${(props) =>
	props.background.type === 'color'
	  ? props.background.value
	  : `url(${props.background.value}) repeat`};
  overflow: hidden;
  border: none;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const selectedValue = ColorSelector();

  return (
	<DesktopContainer background={selectedValue}>
	  {/* your content here */}
	</DesktopContainer>
  );
}

export default App;
