import React, { forwardRef } from "react";

function TextInput({  label, value = "", ...props }, ref) {
  return (
    <input
      className="text-input"
      data-testid={`input-${props.name}`}
      value={value}
      {...props}
      ref={ref}
    />
  );
}

export default forwardRef(TextInput);
