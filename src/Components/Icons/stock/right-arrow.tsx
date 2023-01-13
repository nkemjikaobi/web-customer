/* eslint-disable max-len */
/* eslint-disable react/no-unknown-property */
import React from "react";

/**
 * Right Arrow Icon
 * @param {Object} props Component props
 * @returns {React.Component} React component
 */
const SVG = (props: any) => (
  <svg height="79" viewBox="0 0 79 79" width="79" {...props}>
    <defs>
      <circle cx="28.5" cy="28.5" r="28.5" />
      <filter
        filterUnits="objectBoundingBox"
        height="161.4%"
        width="161.4%"
        x="-30.7%"
        y="-27.2%"
      >
        <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="5.5"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.238337862 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(11 9)">
        <use fill="#000" filter="url(#a)" xlinkHref="#b" />
        <use fill="#FFF" xlinkHref="#b" />
      </g>
      <path
        d="M36.674 46.316a.668.668 0 0 1 0-.9l7.406-7.907-7.406-7.924a.668.668 0 0 1 0-.899.568.568 0 0 1 .84 0l7.812 8.358a.671.671 0 0 1 0 .9l-7.812 8.356a.556.556 0 0 1-.84.016z"
        fill="#7E859B"
        fillRule="nonzero"
        stroke="#7E859B"
        strokeWidth="3"
      />
    </g>
  </svg>
);

export default SVG;
/* eslint-enable max-len */
