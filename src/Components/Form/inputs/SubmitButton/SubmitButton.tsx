import React from "react";

interface ISubmitButtonType {
  value: string;
  [propName: string]: any;
}

const SubmitButton = ({ value, ...props }: ISubmitButtonType) => {
  return (
    <div>
      <input type="submit" value={value} {...props} />
    </div>
  );
};

export default SubmitButton;
