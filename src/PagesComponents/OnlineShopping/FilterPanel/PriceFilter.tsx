import React, { Fragment, useEffect, useState } from "react";
import { priceFilterData, priceFilterValues } from "./data";
import RadioFilter from "Components/Filter/RadioFilter/radioFilter";

interface IPriceFilter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;

  name: string;
  value: any;
}

const PriceFilter: React.FunctionComponent<IPriceFilter> = (
  props: IPriceFilter
) => {
  const [selection, setSelection] = useState<number>();

  const handleChange = (index: any) => {
    setSelection(index);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && selection) {
      const select = priceFilterValues[selection];
      const filterArray = [];

      if (select.max !== null) {
        filterArray.push(`"price<${select.max}"`);
      }
      if (select.min !== null) {
        filterArray.push(`"price>${select.min}"`);
      }

      props.onChange(filterArray.join(", "), select);
    }

    return () => {
      mounted = false;
    };
  }, [selection]);

  return (
    <Fragment>
      {priceFilterData.map((e: any, index: number) => {
        return (
          <div key={index}>
            <RadioFilter
              name={props.name}
              onChange={handleChange}
              text={e}
              value={index}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default PriceFilter;
