/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import airports from "../../../../dto/KongaTravel/airports.json";

export interface IFlightLocationWidgetComponentValue {
  newValue: string;
}

export interface IFlightLocationWidgetComponentProps {
  placeholder: string;
  onChange: Function;
}

const FlightLocationWidgetComponent: React.FunctionComponent<
  IFlightLocationWidgetComponentProps
> = ({ placeholder, onChange }: IFlightLocationWidgetComponentProps) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Array<any>>([]);

  const effectChange = (
    event: any,
    value: IFlightLocationWidgetComponentValue
  ) => {
    setValue(value.newValue);
    onChange(value.newValue);
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const checkAirportCity = (airport: any): boolean =>
      airport.airport_city.toLowerCase.slice(0, inputLength) === inputValue;
    const checkAirportName = (airport: any): boolean =>
      airport.airport_name.toLowerCase.slice(0, inputLength) === inputValue;

    return inputLength === 0
      ? []
      : airports.filter((airport: any) => checkAirportCity);
  };

  const inputProps = {
    placeholder: placeholder,
    value,
    onChange: effectChange,
  };

  const onSuggestionsFetchRequested = (param: { value: string }) =>
    setSuggestions(getSuggestions(param.value));

  const onSuggestionsClearRequested = () => setSuggestions([]);
  const getSuggestionValue = (airport: any) => airport.airport_name;
  const renderSuggestion = (airport: any) => (
    <div className={"p-3 border-1"}>{airport.airport_name}</div>
  );
  return (
    <Autosuggest
      getSuggestionValue={getSuggestionValue}
      highlightFirstSuggestion={true}
      inputProps={inputProps}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      renderSuggestion={renderSuggestion}
      suggestions={suggestions}
    />
  );
};

export default FlightLocationWidgetComponent;
