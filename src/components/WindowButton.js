import React from "react";
import Minimize from "../icons/Minimize.png";
import Close from "../icons/Close.png";
import { css } from "@emotion/core";

const windowButtonStyles = css`
  width: 15px;
  height: 15px;
  background-color: #AAA;
  border: none;
  outline: none;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 1px 1px #FCFCFE, inset -1px -1px #565656, 1px 1px #000000;
  &:hover {
	background-color: #ddd;
  }
  &:active {
	transform: scale(0.95);
  }
`;

const WindowButton = ({ onClick, icon, iconSize = "10px" }) => (
  <div css={windowButtonStyles} onClick={onClick}>
	<div style={{ width: iconSize, height: iconSize }}>
	  {icon === "minimize" ? (
		<img src={Minimize} alt="Minimize icon" />
	  ) : icon === "close" ? (
		<img src={Close} alt="Close icon" />
	  ) : null}
	</div>
  </div>
);
export default WindowButton;
