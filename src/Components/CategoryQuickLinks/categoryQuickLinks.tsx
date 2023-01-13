/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./categoryQuickLinks.module.scss";
import { composeClasses, getSanitizedHtml } from "libs/utils/utils";
import ICmsMenuCategory from "dto/KongaFood/ICmsMenuCategory";
import MarketplaceService from "Http/Services/MarketplaceService";
import QuickLinksInfo from "./QuickLinksInfo";

export interface ICategoryQuickLinks {
  categoryId?: string;
  header?: string;

  getSelectedCategory?: Function;
  getBreadCrumbs?: Function;
}

const categoriesQuickLinks: React.FunctionComponent<ICategoryQuickLinks> = (
  props: ICategoryQuickLinks
) => {
  const { categoryId, header } = props;
  const [breadCrumbs, setBreadCrumbs] = useState<Array<any>>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICmsMenuCategory>();

  // method to filter the category from the list of categories
  const filterMenuItems = (
    expectedCategoryId: number,
    currentCategory: ICmsMenuCategory,
    familyTree: Array<string>
  ): Array<any> => {
    familyTree.push(currentCategory.name);

    if (currentCategory.category_id === expectedCategoryId) {
      setSelectedCategory(currentCategory);
      setBreadCrumbs(familyTree);
      return [currentCategory, familyTree];
    }

    currentCategory &&
      currentCategory.children.forEach((categoryCurrent: ICmsMenuCategory) => {
        const result: Array<any> = filterMenuItems(
          expectedCategoryId,
          categoryCurrent,
          familyTree
        );

        if (result) {
          return result;
        }
      });

    return [];
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && categoryId) {
      MarketplaceService.GetCMSMenuByStoreId().then(
        (results: Array<ICmsMenuCategory>) => {
          results &&
            results.length > 0 &&
            results.forEach((result: ICmsMenuCategory) => {
              const familyTree: Array<string> = [];
              const datam = filterMenuItems(
                parseInt(categoryId),
                result,
                familyTree
              );

              if (datam && datam.length > 0) {
                return datam;
              }
            });
        }
      );
    }

    return () => {
      mounted = false;
    };
  }, [categoryId]);

  useEffect(() => {
    let mounted = true;

    if (mounted && selectedCategory && props.getSelectedCategory) {
      props.getSelectedCategory(selectedCategory);
    }

    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  return (
    <Fragment>
      <div className={styles.quickLinks}>
        <h1
          className={composeClasses(
            selectedCategory && selectedCategory.children.length > 0
              ? styles.header
              : styles.header2
          )}
          dangerouslySetInnerHTML={getSanitizedHtml(header ?? "")}
        />
        {selectedCategory?.children && (
          <div className={styles.imageContainer}>
            {selectedCategory?.children.map(
              (category: ICmsMenuCategory, index: number) => (
                <QuickLinksInfo
                  img={`/${category.icon_image}`}
                  key={index}
                  link={category.url_key}
                  title={category.name}
                />
              )
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

categoriesQuickLinks.defaultProps = {
  categoryId: undefined,
};

export default categoriesQuickLinks;
