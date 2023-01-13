import React from "react";
import { connectHits } from "react-instantsearch-dom";
import { composeClasses } from "libs/utils/utils";
import styles from "./predictiveSearch.module.scss";
import Hit from "./Hit";

interface IHitsList {
  hideOnMobile: string;
  hitLinkKey: string;
  hitLinkPrefix: string;
  hits: any;
  limit: number;
  showProductImage: boolean;
  title: string;
}

const HitsData = (properties: IHitsList) => {
  // Number of search results that should be shown
  const NUMBER_OF_SEARCH_ITEMS = 4;

  const maxItems = properties.limit || NUMBER_OF_SEARCH_ITEMS;
  // Ensures that if for some reason, Algolia returns more than the NUMBER_OF_SEARCH_ITEMS,
  // only the needed amount is rendered
  const limitHits =
    Array.isArray(properties.hits) && properties.hits.slice(0, maxItems);
  // If hits are empty, don't render the hit list
  if (!Array.isArray(limitHits) || limitHits.length < 1) return null;

  return (
    <div
      className={composeClasses(
        styles.hitList,
        properties.hideOnMobile && styles.hideOnMobile
      )}
    >
      <h2 className={styles.hitListTitle}>{properties.title}</h2>
      <ul aria-live="polite" className={styles.hitListUl}>
        {limitHits.map((hit) => (
          <Hit
            hit={hit}
            hitLinkKey={properties.hitLinkKey}
            hitLinkPrefix={properties.hitLinkPrefix}
            key={hit.objectID}
            showProductImage={properties.showProductImage}
          />
        ))}
      </ul>
    </div>
  );
};

const HitsList: any = connectHits(HitsData);
export default HitsList;
