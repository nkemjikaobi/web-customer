/* eslint-disable @typescript-eslint/ban-types */
import CheckboxFilterInput from "Components/Filter/CheckboxFilterInput/CheckboxFilterInput";
import React, { Fragment, useEffect, useState } from "react";
import { convertStringToDashed } from "libs/utils/utils";
import { travelTimeData } from "dto/KongaTravel/data";

export interface IFlightMovementFilterComponent {
  onChange: Function;
}

const FlightMovementFilterComponent: React.FunctionComponent<
  IFlightMovementFilterComponent
> = (props: IFlightMovementFilterComponent) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [selectedValues, setSelectedValues] = useState<Array<any>>([]);

  useEffect(() => {
    let properties = travelTimeData;
    if (properties) {
      setItems(travelTimeData);
      setSelectedValues(
        properties.map((prop: { label: string; time: string }) =>
          convertStringToDashed(prop.label)
        )
      );
    }
    return () => {
      properties = [];
    };
  }, []);

  useEffect(() => {
    let valuesSelected = selectedValues;
    props.onChange(valuesSelected);
    return () => {
      valuesSelected = [];
    };
  }, [selectedValues]);

  const handleSelectedEvent = (e: boolean, name: string) => {
    let values = selectedValues;
    if (e) {
      if (!selectedValues.includes(name)) {
        values = [...selectedValues, name];
      }
    } else {
      const index = values.indexOf(name);
      if (index >= 0) {
        values.splice(index, 1);
      }
    }
    setSelectedValues([...values]);
    props.onChange([...values]);
  };

  return (
    <Fragment>
      {items.map(
        ({ label, time }: { label: string; time: string }, key: number) => (
          <Fragment key={key}>
            <CheckboxFilterInput
              checked={selectedValues.includes(convertStringToDashed(label))}
              label={`${label} ${time}`}
              name={convertStringToDashed(label)}
              onChange={(e: boolean) =>
                handleSelectedEvent(e, convertStringToDashed(label))
              }
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default FlightMovementFilterComponent;
