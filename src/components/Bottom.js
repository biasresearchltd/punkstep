import React, { useState } from "react";
import PunkIcon from "./Icon";
import CalIcon from "./CalIcon";
import BlankIcon from "./BlankIcon";
import TextEditIcon from "./TextEditIcon";
import AppWindow from './AppWindow';
import useApp from '../App';

const Bottom = () => {
  const { minimizedWindows, restoreWindow } = useApp();

  return (
	<div style={{ position: "fixed", bottom: 0, left: 0 }}>
	  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
		{minimizedWindows && minimizedWindows.map((window, index) => (
		  <div key={index}>
			{window.props.title === "Mindware.txt" ? <TextEditIcon onClick={() => restoreWindow(index)} /> : <BlankIcon onClick={() => restoreWindow(index)} />}
		  </div>
		))}
	  </div>
	</div>
  );
};

export default Bottom;
