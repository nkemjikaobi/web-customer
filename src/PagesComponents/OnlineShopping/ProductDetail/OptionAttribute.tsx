import React, { Fragment, useEffect, useState } from "react";

interface IOptionAttribute {
  className?: string;
  option: any;
  value: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
}

const OptionAttribute: React.FunctionComponent<IOptionAttribute> = (
  props: IOptionAttribute
) => {
  const [labelValue, setLabelValue] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    if (
      mounted &&
      props &&
      props.option &&
      (props.option.label || props.option.value)
    ) {
      setLabelValue(props.option.label || props.option.value);
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  const handleClick = () => {
    props.onChange(props.option);
  };

  return (
    <div className={props.className} onClick={handleClick}>
      <Fragment>{labelValue}</Fragment>
    </div>
  );
};

OptionAttribute.defaultProps = {
  className: "",
};

export default OptionAttribute;
