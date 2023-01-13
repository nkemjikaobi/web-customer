/* eslint-disable @typescript-eslint/ban-types */
import { composeClasses } from "libs/utils/utils";
import React, { useEffect, useState } from "react";
import styles from "./sortByFilter.module.scss";

const filterText = ["", "desc", "asc"];
const data: any = [
  "Relevance",
  "Price - High To Low",
  "Price - Low To High", // "Product - Rating"
];

interface ISortByFilter {
  currentCategory?: string;
  updateEntry: Function;
}

const SortByFilter: React.FunctionComponent<ISortByFilter> = (
  props: ISortByFilter
) => {
  const [entries, setEntries] = useState<Array<string>>([]);
  const [selectedBtn, setSelectedBtn] = useState<number>(0);

  const handleBtnClickEvent = (event: any, btnName: any) => {
    setSelectedBtn(btnName);
    props.updateEntry(filterText[btnName]);
  };

  useEffect(() => {
    let mounted = data;
    setEntries(data);
    return () => {
      mounted = {};
    };
  }, []);

  return (
    <div className={styles.sortByFilter}>
      <p className={"mt-1 me-3"}>Sort By: </p>
      <div className={styles.filterButtons}>
        {entries.map((entry: string, key: any) => (
          <button
            className={composeClasses(
              selectedBtn === key ? styles.btnActive : "",
              styles.button
            )}
            key={key}
            onClick={(e: any) => handleBtnClickEvent(e, key)}
          >
            {entry}
          </button>
        ))}
      </div>
    </div>
  );
};

SortByFilter.defaultProps = {
  currentCategory: "",
};

export default SortByFilter;
