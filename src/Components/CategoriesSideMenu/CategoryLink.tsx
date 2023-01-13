/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import ICategory from "dto/KongaOnline/ICategory";
import { Link } from "react-router-dom";

import styles from "./categoriesSideMenu.module.scss";
import Icon from "Components/Icons";
import { getSanitizedHtml } from "libs/utils/utils";

interface ICategoryLink {
  category: ICategory;
  onClick: any;
}

const CategoryLink: React.FunctionComponent<ICategoryLink> = (
  props: ICategoryLink
) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    let category: ICategory | undefined = props.category;
    if (category) {
      setName(category.name);
    }
    return () => {
      category = undefined;
    };
  }, [props]);

  return (
    <Fragment>
      <Link onClick={props.onClick} to="#">
        <div className={styles.categoryInfo}>
          <p dangerouslySetInnerHTML={getSanitizedHtml(name ?? "")} />
          <Icon name="arrowRight" />
        </div>
      </Link>
    </Fragment>
  );
};

export default CategoryLink;
