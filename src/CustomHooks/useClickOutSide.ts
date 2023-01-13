/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useRef, useEffect } from "react";

//use clickoutside hook
const useClickOutside = (handler: Function) => {
  const domNode = useRef<any>();

  useEffect(() => {
    const maybeHandler = (event: any) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
