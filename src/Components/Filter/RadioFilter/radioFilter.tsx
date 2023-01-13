import React, { useEffect, useState } from "react";
import styles from "./radioFilter.module.scss";

interface IRadioFilter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: any;

  text?: string;
  name: string;
  value: any;
  checked?: boolean;
  isText?: boolean;
  children?: any;
}

const RadioFilter: React.FunctionComponent<IRadioFilter> = (
  props: IRadioFilter
) => {
  const [content, setContent] = useState<any>();

  const handleChange = (event: any) => {
    props.onChange(event.target.value);
  };

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

  useEffect(() => {
    let mounted = props.checked;

    if (mounted) {
      props.onChange(props.value);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.radioFilter}>
      <label className={styles.container}>
        <input
          defaultChecked={props.checked}
          name={props.name}
          onChange={handleChange}
          type="radio"
          value={props.value}
        />
        <span className={styles.checkmark} />
        {content}
      </label>
    </div>
  );
};

RadioFilter.defaultProps = {
  checked: false,
  children: null,
  isText: true,
  text: "",
};

export default RadioFilter;
