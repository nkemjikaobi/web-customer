import Icon from "Components/Icons";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./mobileNavDropDown.module.scss";

interface IProps {
  dropDownData: any[];
  display: boolean;
}

const BusinessDropDown: React.FunctionComponent<IProps> = (props: IProps) => {
  const data = props.dropDownData?.map((e, i) => (
    <Link key={i} to={`${e.route}`}>
      <div className={styles.listItem}>
        <p>{e.name}</p>
      </div>
    </Link>
  ));

  if (props.display) {
    return (
      <div className={styles.forBusinessData}>
        <div>{data}</div>
      </div>
    );
  }
  return null;
};

export default BusinessDropDown;
