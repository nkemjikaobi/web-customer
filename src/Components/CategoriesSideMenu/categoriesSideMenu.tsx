/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Image from "Assets/images/png/categorySideMenuImg.png";
import styles from "./categoriesSideMenu.module.scss";
import MarketplaceService from "Http/Services/MarketplaceService";
import ICategory from "dto/KongaOnline/ICategory";
import CategoryLink from "./CategoryLink";

interface ICategorySideMenu {
  onOpenSubCategories: Function;
}

const categorySideMenu: React.FunctionComponent<ICategorySideMenu> = (
  props: ICategorySideMenu
) => {
  /***
   * TODO: Fetch the menu categories and display them here also
   */

  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    let mounted = true;
    MarketplaceService.GetCMSMenuByStoreId().then((results: any) =>
      setCategories(MarketplaceService.SortCMSMenuByStoreId(results))
    );

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fragment>
      <div className={styles.categorySideMenu}>
        <div className={styles.heading}>
          <p>All Products Categories</p>
        </div>
        <div className={styles.categoriesLink}>
          {categories.map((category: ICategory, index: number) => (
            <CategoryLink
              category={category}
              key={index}
              onClick={(e: any) => props.onOpenSubCategories(e, category)}
            />
          ))}
        </div>
        <img className={styles.img} src={Image} />
      </div>
    </Fragment>
  );
};

export default categorySideMenu;
