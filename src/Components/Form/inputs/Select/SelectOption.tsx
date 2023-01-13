import React from "react";

const SelectOption = ({ value, ...props }: any) => {
  return <option value={value}>{props.children}</option>;
};

export default SelectOption;
