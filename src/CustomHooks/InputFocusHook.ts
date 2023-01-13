/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";

export const useFocus = (initialFocus = false, id = ""): any => {
  const [focus, setFocus] = useState(initialFocus);
  const setFocusWithTrueDefault = (param: any) =>
    setFocus(param ? param : true);
  return [
    setFocusWithTrueDefault,
    {
      autoFocus: focus,
      key: `${id}${focus}`,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
    },
  ];
};
