import React from "react";
import { connectMenu } from "react-instantsearch-dom";
import styles from "./predictiveSearch.module.scss";
import { composeClasses, hyphenate } from "libs/utils/utils";
import { Link } from "react-router-dom";

interface ICategoryMenu {
  hideOnMobile?: any;
  hitLinkKey: string;
  hitLinkPrefix: string;
  items: any;
  title: string;
}

const CategoryMenu = connectMenu((properties: ICategoryMenu) => {
  // Number of search results that should be shown
  const NUMBER_OF_SEARCH_ITEMS = 4;
  const limitHits =
    Array.isArray(properties.items) &&
    properties.items.slice(0, NUMBER_OF_SEARCH_ITEMS);
  // If hits are empty, don't render the hit list
  if (!Array.isArray(limitHits) || limitHits.length < 1) return null;
  return (
    <div
      className={composeClasses(
        styles.hitList,
        styles.hitListBorderLess,
        properties.hideOnMobile && styles.hideOnMobile
      )}
    >
      <h2 className={styles.hitListTitle}>{properties.title}</h2>
      <ul
        aria-live="polite"
        className={composeClasses(styles.hitListUl, styles.hitListSplit)}
      >
        {limitHits.map((item) => (
          <li className={composeClasses(styles.hitListItem)} key={item.value}>
            <Link
              className={styles.hitListLink}
              to={`${properties.hitLinkPrefix}${hyphenate(
                item[properties.hitLinkKey]
              )}`}
            >
              {item.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default CategoryMenu;
