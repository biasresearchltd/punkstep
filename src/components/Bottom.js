import React, { useRef } from "react";
import PunkIcon from "./Icon";
import CalIcon from "./CalIcon";
import BlankIcon from "./BlankIcon";
import TextEditIcon from "./BlankIcon";

const Iframe = ({ src, width, height, createIframe }) => {
  const iframeRef = useRef(null);

  const createFrame = () => {
	const frame = iframeRef.current;
	frame.src = src;
	frame.style.width = width;
	frame.style.height = height;
  };

  return <iframe ref={iframeRef} />;
};

const Bottom = ({ onClick, minimizeTextEditor }) => (
  <div style={{ position: "fixed", bottom: 0, left: 0 }}>
	<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
	  <PunkIcon onClick={onClick} />
	  <BlankIcon onClick={onClick} />
	  <BlankIcon onClick={onClick} />
	  <BlankIcon onClick={onClick} />
	  <BlankIcon onClick={onClick} />
	  <BlankIcon onClick={onClick} />
	</div>
  </div>
);
export default Bottom;
