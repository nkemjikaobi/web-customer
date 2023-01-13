import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import { Link } from "react-router-dom";
import { composeClasses } from "libs/utils/utils";
import { getSearchQueryURL } from "libs/utils/searchUtils";
import styles from "./predictiveSearch.module.scss";
import AutoComplete from "./AutoComplete";
import HitsList from "./HitsList";
import CategoryMenu from "./CategoryMenu";
import { connect } from "react-redux";

// Number of search results that should be shown
const NUMBER_OF_SEARCH_ITEMS = 4;

interface IPredictiveSearch {
  dismissHandler: any;
  show: boolean;
  searchResults: any;
  searchState: any;
}

const predictiveSearch = (properties: IPredictiveSearch) => {
  const query =
    properties.searchState && (properties.searchState.query as string);
  const showPredictiveSearch = properties.show && query;
  const nbHits = properties.searchResults && properties.searchResults.nbHits;
  const noResults = nbHits < 1;
  return (
    <div
      className={composeClasses(
        styles.predictiveSearch,
        showPredictiveSearch && styles.predictiveSearchShown
      )}
      onClick={properties.dismissHandler}
    >
      <div className={styles.predictiveSearchContainer}>
        {noResults && (
          <div
            className={composeClasses(styles.hitList, styles.searchEmptyState)}
          >
            <h2 className={styles.hitListTitle}>
              No result found for
              <em className={styles.searchEmptyStateText}>{query}</em>
            </h2>
          </div>
        )}
        <AutoComplete />
        <HitsList
          hitLinkKey="url_key"
          hitLinkPrefix="/online-shopping/product-detail/"
          limit={5}
          showProductImage={Boolean(showPredictiveSearch)}
          title="Products"
        />
        <CategoryMenu
          attribute="attributes.brand"
          hitLinkKey="value"
          hitLinkPrefix="/online-shopping/brand/"
          limit={NUMBER_OF_SEARCH_ITEMS}
          title="Matching Brands"
        />
        {!noResults && (
          <Link to={getSearchQueryURL(query)}>
            <span className={styles.searchFooter}>See All Search Results</span>
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(connectStateResults(predictiveSearch));
