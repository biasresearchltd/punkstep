import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  height: 9px;
  width: 100%;
`;

const WindowFooterMid = styled.div`
  bottom: 0;
  z-index: 2;
  height: 9px;
  width: 100%;
  background: #AAA;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, .5px .5px #000000;
  box-sizing: border-box;
`;

const WindowFooterSide = styled.div`
  bottom: 0;
  z-index: 2;
  height: 9px;
  width: 42px;
  background: #AAA;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, .5px .5px #000000;
  box-sizing: border-box;
`;

const WindowFooter = () => (
  <FooterContainer
    className="windowFooter"
    style={{ cursor: 'default', userSelect: 'none' }}
    >
	<WindowFooterSide />
	<WindowFooterMid />
	<WindowFooterSide />
  </FooterContainer>
);

export default WindowFooter;
