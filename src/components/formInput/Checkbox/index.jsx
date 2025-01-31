import React, { forwardRef } from "react";
import './Checkbox.css'
function Checkbox({ label, className, ...props }, ref) {
  return (
    <label className="checkbox">
      <input
        data-testid={`checkbox-${props.name}`}
        label={label}
        {...props}
        type="checkbox"
        ref={ref}
      />
      <span>{label}</span>
    </label>
  );
}

export default forwardRef(Checkbox);
