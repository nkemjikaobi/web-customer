/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-types */
import ICategory from "dto/KongaOnline/ICategory";
import { getSanitizedHtml } from "libs/utils/utils";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./subCategoryNode.module.scss";

interface IProps {
  category?: ICategory;
  isChildNode: boolean;
}

const SubCategoryChildNode: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  let categoryUrl = props.category?.url_key;
  const categoryId = categoryUrl?.split("-").slice(-1);
  if (categoryId !== undefined) {
    categoryUrl = "/online-shopping/category/" + categoryId[0];
  }

  if (props.isChildNode) {
    return (
      <Fragment>
        <Link className={styles.childNodeContainer} to={`${categoryUrl}`}>
          <label
            className={styles.childNode}
            dangerouslySetInnerHTML={getSanitizedHtml(
              props.category?.name ?? ""
            )}
          />
        </Link>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <label
        className={styles.parentNode}
        dangerouslySetInnerHTML={getSanitizedHtml(props.category?.name ?? "")}
      />
    </Fragment>
  );
};

SubCategoryChildNode.defaultProps = {
  category: undefined,
};

export default SubCategoryChildNode;
