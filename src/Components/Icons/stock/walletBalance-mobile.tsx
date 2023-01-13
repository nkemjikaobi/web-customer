/* eslint-disable max-len */
import React from "react";
/**
 * Account Profile Icon
 * @param {Object} props Component props
 * @returns {React.Component} React component
 */
const SVG = (props: any): unknown => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      fill="black"
      height="10"
      opacity="0.3"
      rx="2"
      width="8.33333"
      x="1.66666"
      y="1.66666"
    />
    <path
      clipRule="evenodd"
      d="M3.66666 5C2.56209 5 1.66666 5.89543 1.66666 7V16.3333C1.66666 17.4379 2.56209 18.3333 3.66666 18.3333H16.3333C17.4379 18.3333 18.3333 17.4379 18.3333 16.3333V7C18.3333 5.89543 17.4379 5 16.3333 5H3.66666ZM16.6667 11.6667C16.6667 12.5871 15.9205 13.3333 15 13.3333C14.0795 13.3333 13.3333 12.5871 13.3333 11.6667C13.3333 10.7462 14.0795 10 15 10C15.9205 10 16.6667 10.7462 16.6667 11.6667Z"
      fill="black"
      fillRule="evenodd"
    />
  </svg>
);

export default SVG;
