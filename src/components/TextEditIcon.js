import React from "react";
import Draggable from "react-draggable";
import IconImage from "../icons/TextEditIcon2-24.png";

const TextEditIcon = ({ onClick }) => (
  <Draggable>
    <div 
      style={{ border: '1px solid #000000', cursor: 'default' }} 
      onClick={onClick}
    >
      <img src={IconImage} width="64px" height="64px" />
      <text className="icon-text"></text>
    </div>
  </Draggable>
);

export default TextEditIcon;
