/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { connectHighlight } from "react-instantsearch-dom";
import styles from "./predictiveSearch.module.scss";

interface IHighlight {
  highlight: Function;
  attribute: string;
  hit: string;
}

interface IPart {
  isHighlighted: boolean;
  value: string;
}

const HighlightComponent = connectHighlight(
  ({ highlight, attribute, hit }: IHighlight) => {
    const highlights = highlight({
      highlightProperty: "_highlightResult",
      attribute,
      hit,
    });
    return highlights.map((part: IPart, index: number) =>
      part.isHighlighted ? (
        <mark className={styles.highlightedItem} key={index}>
          {part.value}
        </mark>
      ) : part.value.indexOf(" ") === 0 ? (
        <span key={index}>
          <span> </span>
          {part.value}
        </span>
      ) : (
        <span key={index}>{part.value}</span>
      )
    );
  }
);

export default HighlightComponent;
