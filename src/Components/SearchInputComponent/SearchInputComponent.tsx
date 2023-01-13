/* eslint-disable @typescript-eslint/ban-types */
import { IAirport } from "dto/KongaTravel/ITrip";
import React, { Fragment, useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";

interface ISearchInputComponent {
  placeholder: string;
  airports: Array<IAirport>;
  onChange: Function;
}

const SearchInputComponent: React.FunctionComponent<ISearchInputComponent> = (
  props: ISearchInputComponent
) => {
  const [value, setValue] = useState<string>("");
  const [inputProps, setInputProps] = useState<any>({
    value: "",
    placeholder: "",
    onChange: (event: any, { newValue }: any) => setValue(newValue),
  });
  const [items, setItems] = useState<Array<IAirport>>([]);
  const [suggestions, setSuggestions] = useState<Array<any>>([]);

  useEffect(() => {
    let result = value;
    setInputProps({ ...inputProps, value: result });
    props.onChange(result);
    return () => {
      result = "";
    };
  }, [value]);

  useEffect(() => {
    let result = props.airports;
    setItems(result ?? []);
    setInputProps({ ...inputProps, placeholder: props.placeholder ?? "" });
    return () => {
      result = [];
    };
  }, [props]);

  const onSuggestionsFetchRequested = ({
    value,
    reason,
  }: {
    value: string;
    reason: any;
  }) => {
    if (value) {
      setSuggestions(getSuggestions(value));
    } else {
      setSuggestions(items.slice(0, 5));
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: IAirport): string =>
    `${suggestion.airport_city}, ${suggestion.country}, ${suggestion.airport_name}, (${suggestion.airport_code})`;

  const renderSuggestion = (suggestion: IAirport) => {
    return (
      <ul className={"list-group"}>
        <small className={"list-group-item"}>
          {`${suggestion.airport_city}, ${suggestion.country}`}
          <br /> {`${suggestion.airport_name} (${suggestion.airport_code}`})
        </small>
      </ul>
    );
  };

  const getSuggestions = (param: string) => {
    const inputValue = param.trim().toLowerCase();
    const inputLength = inputValue.length;
    const results =
      inputLength <= 0
        ? []
        : items.filter(
            (item) =>
              item.airport_city.trim().toLowerCase().includes(inputValue) ||
              item.airport_code.trim().toLowerCase().includes(inputValue) ||
              item.airport_name.trim().toLowerCase().includes(inputValue) ||
              item.country_code.trim().toLowerCase().includes(inputValue) ||
              item.country.trim().toLowerCase().includes(inputValue) ||
              item.city_code.trim().toLowerCase().includes(inputValue)
          );
    return results.splice(0, 5);
  };

  return (
    <Autosuggest
      getSuggestionValue={getSuggestionValue}
      inputProps={inputProps}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      renderSuggestion={renderSuggestion}
      suggestions={suggestions}
    />
  );
};

export default SearchInputComponent;
