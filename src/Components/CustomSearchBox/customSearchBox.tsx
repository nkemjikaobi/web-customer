/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef, useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { useHistory } from "react-router-dom";
import "../../Scss/Custom.scss";
import styles from "./customSearchBox.module.scss";
import { getSearchQueryURL } from "libs/utils/searchUtils";
import { composeClasses } from "libs/utils/utils";
import Icon from "Components/Icons";
interface ISearchBox {
  currentRefinement: any;
  refine: Function;
  setPredictiveSearchState?: any;
  isMobileSearch?: boolean;
  isTextActive?: boolean;
  setSearchActive?: any;
  setSearchInactive?: any;
  showHideInputField?: any;
  showSearchInputDesktop?: any;
  toggleCartAndInputFields?: any;
}

const SearchBox = (properties: ISearchBox) => {
  const [swapClass, setSwapClass] = useState(true);
  const searchInput: any = useRef("");
  const history = useHistory();

  const handleClick = (event: any) => {
    event.preventDefault();

    history.push(getSearchQueryURL(properties.currentRefinement));

    properties.setPredictiveSearchState(false);
    properties.toggleCartAndInputFields &&
      properties.toggleCartAndInputFields();
    properties.setSearchActive && properties.setSearchActive();
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      properties.setPredictiveSearchState(false);
    } else {
      properties.setPredictiveSearchState(true);
    }
  };

  const searchIcon = () => {
    if (properties.isMobileSearch) {
      return (
        <button
          className={styles.SearchBoxButtonMobile}
          onClick={handleClick}
          type={"submit"}
        >
          <div>
            <Icon name="mobileSearch" />
          </div>
        </button>
      );
    }
    return (
      <button
        className={styles.SearchBoxButton}
        onClick={handleClick}
        type={"submit"}
      >
        <div className={styles.buttonIconContainer}>
          <Icon className={"mb-1"} name={"searchWhite"} />
          <span>Search</span>
        </div>
      </button>
    );
  };

  return (
    <div className={styles.searchFormContainer}>
      <div
        className={`${properties.isTextActive && styles.searchFormBackground}`}
      />
      <form
        className={composeClasses(
          styles.SearchBox,
          `${properties.isMobileSearch && styles.searchBoxMobile}`
        )}
      >
        <div
          className={
            properties.isTextActive
              ? styles.showLeftArrow
              : styles.hideLeftArrow
          }
          onClick={properties.setSearchInactive}
        >
          <Icon name="arrowLeft" />
        </div>
        {properties.showHideInputField && (
          <input
            aria-label={"Search"}
            className={
              properties.isMobileSearch
                ? composeClasses(
                    styles.SearchBoxInputMobile,
                    `${properties.isTextActive && styles.searchBoxMobileActive}`
                  )
                : styles.SearchBoxInput
            }
            onChange={(event) => properties.refine(event.currentTarget.value)}
            onClick={properties.setSearchActive}
            onKeyPress={handleKeyPress}
            placeholder={
              "Search for products, brands, categories and services…"
            }
            ref={searchInput}
            type={"search"}
            value={properties.currentRefinement}
          />
        )}
        {searchIcon()}
      </form>
      <div
        className={`${
          properties.isTextActive && styles.searchResultBackground
        }, ${!swapClass && styles.searchResultBackgroundMobile}`}
      />
    </div>
  );
};

const CustomSearchBox: any = connectSearchBox(SearchBox);
export default CustomSearchBox;
