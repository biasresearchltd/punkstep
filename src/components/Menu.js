import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
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
  height: auto;
  width: 108px;
  background: ${props => props.background};
  font-family: "PunkSystemReg";
  font-smoothing: never;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 1px solid black;
  z-index: 99999999;
  image-rendering: pixelated;
`;

const MenuHead = styled.div`
  background-color: #000;
  color: #FFF;
  height: 14px;
  font-size: 10px;
  border-right: 1px solid #000;
  box-size: border-box;
  box-shadow: inset 1.2px 1.2px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000;
  user-drag: none;
  user-select: none;
  padding: 4px;
  z-index: 99999999;
`;

const MenuTitle = styled.span`
  position: absolute;
  font-family: "PunkSystemBold";
  margin-top: 2px;
`;

const ItemTitle = styled.span`
  display: inline-block;
  margin-top: 2px;
`;

const MenuItem = styled.div`
  background-color: #AAAAAA;
  height: 12px;
  font-size: 10px;
  border-right: 1px solid #000;
  box-size: border-box;
  box-shadow: inset 1.2px 1.2px #FCFCFE, inset -1.5px -1.5px #565656, -1px -1px #000000;
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
  padding-right: 2px;
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
    <Draggable handle=".menuHead" bounds="parent">
	<MenuWrapper>
	  <div>
		<MenuHead className="menuHead">
    <MenuTitle>
    {header}
    </MenuTitle>
    </MenuHead>
		{menuTitles.map((title, index) => (
		  <MenuItem key={index}><ItemTitle>{title}</ItemTitle><RArrow src={Arrow} /></MenuItem>
		))}
	  </div>
	</MenuWrapper>
	  </Draggable>
  );
};

export default Menu;

