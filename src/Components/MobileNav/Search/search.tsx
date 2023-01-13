/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import PredictiveSearch from "Components/PredictiveSearch/predictiveSearch";
import config from "Configurations/configurations";
import algoliasearch from "algoliasearch/lite";
import { updateBodyScroll } from "libs/utils/domUtils";
import styles from "./search.module.scss";
import CustomSearchBox from "Components/CustomSearchBox/customSearchBox";

interface Iprops {
  setShowCart?: any;
  setRemoveCart?: any;
  showInputField?: any;
  showHideInputField?: any;
  hideInputField?: any;
}
const Search: React.FunctionComponent<Iprops> = (properties: Iprops) => {
  const [showPredictiveSearch, setShowPredictiveSearch] = useState(false);
  const [active, setActive] = useState<boolean>(false);

  const handleActiveText = () => {
    setActive(true);
    setPredictiveSearchState(false);
  };
  const handleInactiveText = () => {
    setActive(false);
    setPredictiveSearchState(false);
    properties.setShowCart();
    properties.setRemoveCart();
    properties.showInputField();
    properties.hideInputField();
  };

  const toggleCartAndInputFields = () => {
    properties.setShowCart();
    properties.showInputField();
  };

  const algoliaClient = algoliasearch(
    config.general.algolia.appID,
    config.general.algolia.apiKey
  );

  const searchClient = {
    search: (requests: any) =>
      requests.some(({ params: { query } }: any) => query !== "")
        ? algoliaClient.search(requests)
        : Promise.resolve({
            results: [{ hits: [] }],
          }),
    searchForFacetValues: algoliaClient.searchForFacetValues,
  };

  const setPredictiveSearchState: Function = (visible: boolean) => {
    if (!showPredictiveSearch && visible) updateBodyScroll(true);
    else if (showPredictiveSearch && !visible) updateBodyScroll(false);

    setShowPredictiveSearch(visible);
  };
  return (
    <div className={styles.searchContainer}>
      <InstantSearch
        indexName={config.general.algolia.indexes.mainProductIndex}
        searchClient={searchClient}
      >
        <CustomSearchBox
          isMobileSearch={true}
          isTextActive={active}
          setPredictiveSearchState={setPredictiveSearchState}
          setRemoveCart={properties.setRemoveCart} // what is this for?
          setSearchActive={handleActiveText}
          setSearchInactive={handleInactiveText}
          setShowCart={properties.setShowCart} // this is not on the component what is its effect or use?
          showHideInputField={properties.showHideInputField}
          showInputField={properties.showInputField}
          toggleCartAndInputFields={toggleCartAndInputFields}
        />
        <PredictiveSearch
          dismissHandler={() => setPredictiveSearchState(false)}
          show={showPredictiveSearch}
        />
      </InstantSearch>
    </div>
  );
};

Search.defaultProps = {
  setShowCart: null,
  setRemoveCart: null,
  showInputField: null,
  showHideInputField: null,
  hideInputField: null,
};
export default Search;
