/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import styles from "./checkboxFilter.module.scss";

interface ICheckboxFilter {
  text?: string;

  isText?: boolean;
  children?: any;
}

const CheckboxFilter: React.FunctionComponent<ICheckboxFilter> = (props: ICheckboxFilter) => {
  const [content, setContent] = useState<any>();

  useEffect(() => {
    let mounted = true;

    if (mounted && props) {
      if (props.isText && props.text) {
        setContent(props.text);
      } else if (props.isText === false && props.children) {
        setContent(props.children);
      }
    }

    return () => {
      mounted = false;
    };
  }, [props]);
  return (
    <div className={styles.checkboxFilter}>
      <label className={styles.container}>
        <input type="checkbox" />
        <span className={styles.checkmark} />
        {content}
      </label>
    </div>
  );
};

CheckboxFilter.defaultProps = {
  children: null,
  isText: true,
  text: "",
};

export default CheckboxFilter;
