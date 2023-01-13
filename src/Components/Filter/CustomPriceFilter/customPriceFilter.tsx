import React, { useEffect, useState } from "react";
import styles from "./customPriceFilter.module.scss";

interface ICustomPriceFilter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;

  value: any;
}

const CustomPriceFilter: React.FunctionComponent<ICustomPriceFilter> = (
  props: ICustomPriceFilter
) => {
  const [minimum, setMinimum] = useState<number>();
  const [maximum, setMaximum] = useState<number>();

  const [upperLimit, setUpperLimit] = useState<number>();
  const [lowerLimit, setLowerLimit] = useState<number>();

  const handleBtnClickEvent = (btnEvent: any) => {
    const filterArray = [];

    if (minimum) {
      filterArray.push(`"price>${minimum}"`);
    }

    if (maximum) {
      filterArray.push(`"price<${maximum}"`);
    }

    props.onChange(filterArray.join(", "));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && props && props.value) {
      const boundaries = props.value;

      const lowLimit = boundaries.min ? boundaries.min : 0;
      const highLimit = boundaries.max ? boundaries.max : 999999;

      setLowerLimit(lowLimit);
      setUpperLimit(highLimit);

      setMaximum(highLimit);
      setMinimum(lowLimit);
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  return (
    <div className={styles.customPriceFilter}>
      <br />
      <div className={"input-group"}>
        <input
          className={"form-control form-control-sm mt-0 pe-0 ps-1"}
          max={upperLimit}
          min={lowerLimit}
          name={"minimum"}
          onChange={(e: any) => setMinimum(e.target.value)}
          placeholder={"MIN"}
          type={"number"}
          value={minimum}
        />
        <p className={"input-group-text mb-0"}>To</p>
        <input
          className={"form-control form-control-sm mt-0 pe-0 ps-1"}
          max={upperLimit}
          min={lowerLimit}
          name={"maximum"}
          onChange={(e: any) => setMaximum(e.target.value)}
          placeholder={"MAX"}
          type={"number"}
          value={maximum}
        />
        <input
          className={"btn btn-smbtn-sm btn-primary text-white"}
          onClick={handleBtnClickEvent}
          type={"button"}
          value={"GO"}
        />
      </div>
    </div>
  );
};

export default CustomPriceFilter;
