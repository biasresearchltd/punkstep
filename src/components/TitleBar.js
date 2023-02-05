import React, { useState } from "react";
import WindowButton from "./WindowButton";
import { css, cx } from "@emotion/core";

const commonStyles = css`
  height: 23px;
  width: 100%;
  display: flex;
  padding: 2px;
  justify-content: space-between;
  border-top: 1px solid #FCFCFE;
  border-left: 1px solid #FCFCFE;
  border-bottom: 1px solid #565656;
  border-right: 1px solid #565656;
  font-size: 9px;
  background: #AAAAAA;
`;

const inactiveStyles = css`
  ${commonStyles};
  background: #AAAAAA;
`;

const activeStyles = css`
  ${commonStyles};
  background: #000;
  color: #FFF;
`;

const TitleBar = ({ title, handleMinimize, handleClose }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
	setIsActive(true);
  };

  return (
	<div css={isActive ? activeStyles : inactiveStyles} onClick={handleClick}>
	  <WindowButton icon="close" onClick={handleClose} />
	  <div css={{ height: "100%", display: "flex", alignItems: "center" }}>
		<title css={{ cursor: "default", color: "black", width: "100%", fontSize: "9px", fontWeight: "bold", fontFamily: "'NeueBitBold'" }}>
		  {title}
		</title>
	  </div>
	  <WindowButton icon="minimize" onClick={handleMinimize} />
	</div>
  );
};

export default TitleBar;
