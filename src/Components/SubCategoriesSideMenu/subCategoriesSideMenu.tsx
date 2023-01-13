/* eslint-disable @typescript-eslint/ban-types */
import ICategory from "dto/KongaOnline/ICategory";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./subCategoriesSideMenu.module.scss";
import SubCategoryNode from "Components/SubCategoryNode/subCategoryNode";
import Icon from "Components/Icons/icon";

interface IProps {
  category?: ICategory;
  onOpenSubCategories: Function;
  onCloseSubCateogries: Function;
}

const SubCategory: React.FunctionComponent<IProps> = (props: IProps) => {
  const [category, setCategory] = useState<ICategory | undefined>(undefined);

  const getChildren = (subCat: ICategory) => {
    if (subCat.children.length > 0) {
      return subCat.children?.map((subCatChild: ICategory, index: number) => (
        <SubCategoryNode
          category={subCatChild}
          isChildNode={true}
          key={index}
        />
      ));
    }
  };

  // eslint-disable-next-line react/jsx-key
  const getSubCategories = category?.children.map((subCat, index) => (
    <Fragment key={index}>
      <SubCategoryNode category={subCat} isChildNode={false} />
      {getChildren(subCat)}
    </Fragment>
  ));

  useEffect(() => {
    let mounted: IProps | undefined = props;
    if (mounted) {
      setCategory(mounted.category);
    }
    return () => {
      mounted = undefined;
    };
  }, [props]);

  return (
    <Fragment>
      <div className={styles.categorySideMenu}>
        <div className={styles.subCategoriesNav}>
          <div
            className={styles.icon}
            onClick={() => props.onCloseSubCateogries()}
          >
            <Icon name="arrowLeft" />
          </div>

          <span>All Products Categories</span>
        </div>
        <div className={styles.categoriesLink}>{getSubCategories}</div>
      </div>
    </Fragment>
  );
};

SubCategory.defaultProps = {
  category: undefined,
};

export default SubCategory;
