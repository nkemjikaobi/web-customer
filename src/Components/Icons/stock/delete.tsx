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
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 8V20.5C6 21.3284 6.67157 22 7.5 22H16.5C17.3284 22 18 21.3284 18 20.5V8H6Z"
      fill="#F36923"
    />
    <path
      clipRule="evenodd"
      d="M14 4.5V4C14 3.44772 13.5523 3 13 3H11C10.4477 3 10 3.44772 10 4V4.5H5.5C5.22386 4.5 5 4.72386 5 5V5.5C5 5.77614 5.22386 6 5.5 6H18.5C18.7761 6 19 5.77614 19 5.5V5C19 4.72386 18.7761 4.5 18.5 4.5H14Z"
      fill="#F36923"
      fillRule="evenodd"
      opacity="0.3"
    />
  </svg>
);

export default SVG;