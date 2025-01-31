import React from "react";
import Checkbox from "../Checkbox";

import "./CheckboxGroup.css";

function CheckboxGroup({ options, value, className, ...props }) {
  return (
    <div className="checkbox-group"
    data-testid={`checkbox-group-${props.name}`}>
      {options?.map(({value: v,label}, idx) => {
          return (
            <Checkbox
              {...props}
              data-testid={`checkbox-${v}`}
              key={idx}
              label={label}
              value={v}
              checked={value?.includes(v)}
            />
          );
        })}
    </div>
  );
}

export default CheckboxGroup;
