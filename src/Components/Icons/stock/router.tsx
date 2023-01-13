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
    <rect fill="#404040" height="7" rx="2" width="18" x="3" y="13" />
    <path
      clipRule="evenodd"
      d="M18.929 8.25619L20.468 6.97889C18.3915 4.47693 15.3152 3 11.9999 3C8.68908 3 5.61663 4.47282 3.54004 6.96885L5.07752 8.24797C6.77807 6.20393 9.2896 5 11.9999 5C14.7139 5 17.2285 6.2073 18.929 8.25619ZM15.86 10.8215L17.403 9.54911C16.082 7.94714 14.1174 7 12.0001 7C9.88965 7 7.9308 7.94091 6.6097 9.53389L8.14917 10.8106C9.09425 9.67105 10.4913 9 12.0001 9C13.5138 9 14.915 9.6755 15.86 10.8215Z"
      fill="black"
      fillRule="evenodd"
      opacity="0.3"
    />
  </svg>
);

export default SVG;
