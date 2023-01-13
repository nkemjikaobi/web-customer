/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import CheckboxFilterInput from "Components/Filter/CheckboxFilterInput/CheckboxFilterInput";
import { flightStopsData } from "dto/KongaTravel/data";
import { convertStringToDashed } from "libs/utils/utils";
export interface IFlightStopsFilterComponent {
  onChange: Function;
}

const FlightStopsFilterComponent: React.FunctionComponent<
  IFlightStopsFilterComponent
> = (props: IFlightStopsFilterComponent) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);

  const [items, setItems] = useState<Array<any>>([]);

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

  useEffect(() => {
    let properties = flightStopsData;
    if (properties) {
      setItems(flightStopsData);
      setSelectedValues(
        properties.map((item: string) => convertStringToDashed(item))
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

  return (
    <Fragment>
      {items.map((flightStopData: string, key: number) => (
        <Fragment key={key}>
          <CheckboxFilterInput
            checked={selectedValues.includes(
              convertStringToDashed(flightStopData)
            )}
            label={flightStopData}
            name={convertStringToDashed(flightStopData)}
            onChange={(e: boolean) =>
              handleSelectedEvent(e, convertStringToDashed(flightStopData))
            }
          />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default FlightStopsFilterComponent;
