import React, { forwardRef } from "react";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import Textarea from "./Textarea";
import TextInput from "./TextInput";
import FormType from "../../constants/FormType";
import CheckboxGroup from "./CheckboxGroup";
import { RangeInput } from "./RangeInput";

function FormItem({  options,checked, children,parent, error, ...props }, ref) {
  const renderItem = () => {
    switch (props.type) {
      case FormType.CHECKBOX:
        return <Checkbox {...props} ref={ref} checked={checked}/>;
      case FormType.RANGE:
        return <RangeInput options={options} {...props} ref={ref} />;
      case FormType.CHECKBOX_GROUP:
        return <CheckboxGroup options={options} {...props} ref={ref} />;
      case FormType.TEXT:
        return <TextInput {...props} ref={ref} />;
      case FormType.TEXTAREA:
        return <Textarea {...props} ref={ref} />;
      case FormType.DROPDOWN:
        return <Dropdown options={options} {...props} ref={ref} />;
      default:
        return null;
    }
  };
  return <div data-testid={`form-item-${props.name}`}>{renderItem()}</div>;
}

export default forwardRef(FormItem);
