import IOption from "dto/KongaOnline/IOption";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useEffect, useState } from "react";
import OptionAttribute from "./OptionAttribute";

interface IAttributeOptions {
  className?: string;
  SelectedClassName: string;
  id?: number;
  options: Array<IOption>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
}

// styles.attributeOptionSelected

const AttributeOptions: React.FunctionComponent<IAttributeOptions> = (
  props: IAttributeOptions
) => {
  const [options, setOptions] = useState<Array<IOption>>([]);
  const [selectedValue, setSelectedValue] = useState<IOption>();

  useEffect(() => {
    let mounted = true;

    if (mounted && props.options && props.options.length > 0) {
      const sortedOptions = props.options.sort(
        (a: any, b: any) => parseFloat(a.value) - parseFloat(b.value)
      );

      setOptions(sortedOptions);
      setSelectedValue(props.options[0]);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted && selectedValue) {
      props.onChange({ attribute_id: props.id, option_id: selectedValue.id });
    }

    return () => {
      mounted = false;
    };
  }, [selectedValue]);

  return (
    <Fragment>
      {Array.isArray(options) &&
        options.map((option: IOption, key: number) => (
          <OptionAttribute
            className={composeClasses(
              props.className ?? "",
              selectedValue?.id === option.id ? props.SelectedClassName : ""
            )}
            key={key}
            onChange={setSelectedValue}
            option={option}
            value={option.value ?? ""}
          />
        ))}
    </Fragment>
  );
};

AttributeOptions.defaultProps = {
  className: "",
  id: undefined,
};

export default AttributeOptions;
