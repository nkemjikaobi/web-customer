import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./listContainer.module.scss";

interface Props {
  title: any;
}
const Navigation: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <Fragment>
      <div>
        <div>
          <h1>{title}</h1>
          <Link to="#">See All Items</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
