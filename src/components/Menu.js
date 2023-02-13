import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Arrow from "../icons/PunkStep-RArrow.png";

const menuItems = [
  { header: 'Workspace', items: [
	{ id: 1, title: 'Info', action: () => console.log('Item 1') },
	{ id: 2, title: 'File', action: () => console.log('Item 2') },
	{ id: 3, title: 'Edit', action: () => console.log('Item 3') },
	{ id: 4, title: 'Disk', action: () => console.log('Item 4') },
	{ id: 5, title: 'View', action: () => console.log('Item 5') },
	{ id: 6, title: 'Tools', action: () => console.log('Item 6') },
	{ id: 7, title: 'Windows', action: () => console.log('Item 7') },
	{ id: 8, title: 'Services', action: () => console.log('Item 8') },
	{ id: 9, title: 'Hide', action: () => console.log('Item 9') },
	{ id: 10, title: 'Log Out', action: () => console.log('Log Out') },
  ]},
]
const menuItems2 = [
  { header: 'Header 2', items: [
	{ id: 10, title: 'Item 10', action: () => console.log('Item 10') },
	{ id: 11, title: 'Item 11', action: () => console.log('Item 11') },
	{ id: 12, title: 'Item 12', action: () => console.log('Item 12') },
	{ id: 13, title: 'Item 13', action: () => console.log('Item 13') },
	{ id: 14, title: 'Item 14', action: () => console.log('Item 14') },
	{ id: 15, title: 'Item 15', action: () => console.log('Item 15') },
	{ id: 16, title: 'Item 16', action: () => console.log('Item 16') },
	{ id: 17, title: 'Item 17', action: () => console.log('Item 17') },
	{ id: 18, title: 'Item 18', action: () => console.log('Item 18') },
	{ id: 19, title: 'Item 19', action: () => console.log('Item 19') },
	{ id: 20, title: 'Item 20', action: () => console.log('Item 20') },
  ]},
]
const menuItems3 = [
  { header: 'Header 3', items: [
	{ id: 21, title: 'Item 21', action: () => console.log('Item 21') },
	{ id: 22, title: 'Item 22', action: () => console.log('Item 22') },
	{ id: 23, title: 'Item 23', action: () => console.log('Item 23') },
	{ id: 24, title: 'Item 24', action: () => console.log('Item 24') },
	{ id: 25, title: 'Item 25', action: () => console.log('Item 25') },
	{ id: 26, title: 'Item 26', action: () => console.log('Item 26') },
  ]},
]
  
const subMenuItems = [
  { header: 'Info', items: [
  { id: 1, title: 'Info', action: () => console.log('Item 1') },
  { id: 2, title: 'File', action: () => console.log('Item 2') },
  { id: 3, title: 'Edit', action: () => console.log('Item 3') },
  { id: 4, title: 'Disk', action: () => console.log('Item 4') },
  { id: 5, title: 'View', action: () => console.log('Item 5') },
  { id: 6, title: 'Tools', action: () => console.log('Item 6') },
  { id: 7, title: 'Windows', action: () => console.log('Item 7') },
  { id: 8, title: 'Services', action: () => console.log('Item 8') },
  { id: 9, title: 'Hide', action: () => console.log('Item 9') },
  { id: 10, title: 'Log Out', action: () => console.log('Log Out') },
  ]},
]
  
const MenuWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: 3px;
  height: 252px;
  width: 108px;
  background: ${props => props.background};
  overflow: hidden;
  border: none;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  z-index: 99999999;
  image-rendering: pixelated;
`;

const MenuHead = styled.div`
  background-color: #000;
  color: #FFF;
  height: 14px;
  margin-bottom: 1px;
  font-family: NeueBitBold;
  font-size: 9px;
  border-right: 1px solid #000;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000;
  user-drag: none;
  user-select: none;
  padding: 4px;
  z-index: 99999999;
`;

const MenuItem = styled.div`
  background-color: #AAAAAA;
  height: 14px;
  margin-bottom: 1px;
  font-family: NeueBit;
  font-size: 9px;
  font-weight: 555;
  border-right: 1px solid #000;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000;
  user-drag: none;
  user-select: none;
  padding: 4px;
  z-index: 99999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RArrow = styled.img`
  height: 7px;
  width: 7px;
  user-drag: none;
  user-select: none;
`;

const Menu = () => {
  const [activeAppWindow, setActiveAppWindow] = useState({});
  const [menuLayout, setMenuLayout] = useState(menuItems);

  useEffect(() => {
	if (activeAppWindow.type === 'TextEdit') {
	  setMenuLayout(menuItems2);
	} else if (activeAppWindow.type === 'GraphicsEditor') {
	  setMenuLayout(menuItems3);
	} else {
	  setMenuLayout(menuItems);
	}
  }, [activeAppWindow]);

  const header = menuLayout[0].header;
  const menuTitles = menuLayout[0].items.map(item => item.title);

  return (
	<MenuWrapper>
	  <div>
		<MenuHead>{header}</MenuHead>
		{menuTitles.map((title, index) => (
		  <MenuItem key={index}>{title}<RArrow src={Arrow} /></MenuItem>
		))}
	  </div>
	  
	</MenuWrapper>
  );
};

export default Menu;

