/* eslint-disable @typescript-eslint/ban-types */
import CheckboxFilterInput from "Components/Filter/CheckboxFilterInput/CheckboxFilterInput";
import { IAirlineMetric } from "dto/KongaTravel/ISearchResponse";
import { convertStringToDashed } from "libs/utils/utils";
import React, { Fragment, useEffect, useState } from "react";

export interface IFlightAirlinesFilterComponent {
  items: Array<IAirlineMetric>;
  onChange: Function;
}

const FlightAirlinesFilterComponent: React.FunctionComponent<
  IFlightAirlinesFilterComponent
> = (props: IFlightAirlinesFilterComponent) => {
  const [items, setItems] = useState<Array<IAirlineMetric>>([]);
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);

  useEffect(() => {
    let properties = props.items;
    if (properties && properties.length > 0 && items.length <= 0) {
      setItems(properties);
      try {
        setSelectedValues(
          properties.map((property: IAirlineMetric) =>
            convertStringToDashed(property.airline_code)
          )
        );
      } catch (error: any) {}
    }
    return () => {
      properties = [];
    };
  }, [props]);

  useEffect(() => {
    let values = selectedValues;
    props.onChange(values);
    return () => {
      values = [];
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
      {items.map((parameter: IAirlineMetric, key: number) => (
        <Fragment key={key}>
          <CheckboxFilterInput
            checked={selectedValues.includes(
              convertStringToDashed(parameter.airline_code)
            )}
            label={parameter.airline_name}
            name={convertStringToDashed(parameter.airline_code)}
            onChange={(e: boolean) =>
              handleSelectedEvent(
                e,
                convertStringToDashed(parameter.airline_code)
              )
            }
          />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default FlightAirlinesFilterComponent;
