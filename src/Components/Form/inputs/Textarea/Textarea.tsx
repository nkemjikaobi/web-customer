import React from "react";
import Label from "../Label";

interface ITextareaType {
  type?: string;
  label?: string;
  value?: any;
  [propName: string]: any;
}

const defaultProps: ITextareaType = {
  type: " ",
  label: " ",
  value: " ",
};
const Textarea = ({ label = "great", value, ...props }: ITextareaType) => {
  return (
    <div>
      {label && <Label title={label} />}
      <textarea value={value} {...props} />
    </div>
  );
};

Textarea.defaultProps = defaultProps;
export default Textarea;
