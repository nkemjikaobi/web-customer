/* eslint-disable max-len */
import React from "react";

/**
 * Chevron Icon
 * @param {Object} props Component props
 * @returns {React.Component} React component
 */
const SVG = (props: any) => (
  <svg
    fill="none"
    height="18"
    viewBox="0 0 20 20"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_4285_10598)">
      <circle cx="10" cy="10" r="9.5" stroke="#AFAFAF" />
    </g>
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="20"
        id="filter0_i_4285_10598"
        width="20"
        x="0"
        y="0"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          mode="normal"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="7" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          in2="shape"
          mode="normal"
          result="effect1_innerShadow_4285_10598"
        />
      </filter>
    </defs>
  </svg>
);

export default SVG;
/* eslint-enable max-len */
