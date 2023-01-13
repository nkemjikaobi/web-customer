import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./BreadCrumbComponent.module.scss";
import RightArrowComponent from "./RightArrowComponent";

export interface IBreadCrumbComponent {
  text: string;
  url?: string;
}

export interface IBreadCrumbComponentProp {
  className?: string;
  breadcrumbs: Array<IBreadCrumbComponent>;
}

const BreadCrumbComponent: React.FunctionComponent<IBreadCrumbComponentProp> = (
  properties: IBreadCrumbComponentProp
) => {
  const { breadcrumbs, className } = properties;
  return (
    <div className={`pt-3 ${className || ""}`}>
      {breadcrumbs.map((breadcrumb: IBreadCrumbComponent, index: number) => (
        <Fragment key={index}>
          <Link
            className={
              index === breadcrumbs.length - 1
                ? styles.header_travels
                : styles.header_head
            }
            to={breadcrumb.url || ""}
          >
            {breadcrumb.text}
          </Link>
          {index !== breadcrumbs.length - 1 ? <RightArrowComponent /> : <></>}
        </Fragment>
      ))}
    </div>
  );
};

BreadCrumbComponent.defaultProps = {
  className: "",
};
export default BreadCrumbComponent;
