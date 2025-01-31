import React from "react";
import './chips.css'
export const Chips = ({ title,...props}) => {
  return (
    <button  className="chips" {...props}>
      <span>✖</span> {title}
    </button>
  );
};
