/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useEffect, useState } from "react";
import FilterWrapper from "Components/FilterWrapper/filterWrapper";
import SizeFilter from "Components/Filter/SizeFilter/sizeFilter";
import CustomPriceFilter from "Components/Filter/CustomPriceFilter/customPriceFilter";
import CheckboxFilter from "Components/Filter/CheckboxFilter/checkboxFilter";
import {
  categoriesFilterData,
  itemAvailabilityData,
  shippingData,
  brandsData,
} from "./data";
import styles from "./shoppingFilter.module.scss";
import PriceFilter from "PagesComponents/OnlineShopping/FilterPanel/PriceFilter";
import { composeClasses } from "libs/utils/utils";
import StarsFilter from "Components/Filter/StarsFilter/StarsFilter";
import RefinementFilter from "Components/Filter/RefinementFilter/RefinementFilter";
import { searchAttributes } from "Helpers/SearchConstants";

const brandsFilter = brandsData.map((e, index: number) => {
  return (
    <div key={index}>
      <CheckboxFilter text={e} />
    </div>
  );
});

const categoryFilters = categoriesFilterData.map((e, index: number) => {
  return (
    <div key={index}>
      <Fragment />
    </div>
  );
});

const availabilityFilters = itemAvailabilityData.map((e, index: number) => {
  return (
    <div key={index}>
      <CheckboxFilter text={e} />
    </div>
  );
});

const shippingFilters = shippingData.map((e, index: number) => {
  return (
    <div key={index}>
      <CheckboxFilter text={e} />
    </div>
  );
});

interface IShoppingFilter {
  updatePrice: Function;
  starsFilter: Function;
}

const ShoppingFilter: React.FunctionComponent<IShoppingFilter> = (
  props: IShoppingFilter
) => {
  const [priceFilterProp, setPriceFilterProp] = useState<any>();
  const [priceFilterValue, setPriceFilterValue] = useState<number>();
  const [starsFilterValue, setStarsFilterValue] = useState<number>();
  const [searchElements, setSearchElements] = useState<Array<unknown>>([]);

  const handlePriceFilter = (index: any, selected: any) => {
    props.updatePrice(index);
    setPriceFilterValue(index);
    setPriceFilterProp(selected);
  };

  const handlePriceInputFilter = (index: any) => {
    props.updatePrice(index);
    setPriceFilterValue(index);
  };

  const handleStarsFilter = (starsCount: string) => {
    const newStarsCount = parseInt(starsCount) + 1;
    setStarsFilterValue(newStarsCount);
    props.starsFilter(newStarsCount);
  };

  useEffect(() => {
    let mounted = true;

    const attributes: Array<string> = [];
    const elements: Array<unknown> = [];

    if (mounted) {
      let key = 0;
      for (const item in searchAttributes) {
        if (!attributes.includes(item)) {
          attributes.push(item);
          elements.push(<RefinementFilter attribute={item} key={key} />);
          key++;
        }
      }
    }
    setSearchElements(elements);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.shoppingFilter}>
      <div className={styles.browseCategories}>
        <div>
          <FilterWrapper heading="Browse Categories" type="shopping">
            {/* TODO: change the category header */}
            <p>Konga Fashion</p>

            {/* TODO: change category title */}
            <p>Men's Fashion</p>

            {/* TODO: relook at category filters */}
            {categoryFilters}
            {searchElements}
          </FilterWrapper>
        </div>
      </div>
      <div className={styles.priceFilter}>
        <div>
          <FilterWrapper heading="Price" type="shopping">
            <PriceFilter
              name={"priceFilter"}
              onChange={handlePriceFilter}
              value={priceFilterValue}
            />
          </FilterWrapper>
        </div>
        <div className={composeClasses("mb-2", styles.customFilter)}>
          <p>Custom Price Range</p>
          <CustomPriceFilter
            onChange={handlePriceInputFilter}
            value={priceFilterProp}
          />
        </div>
      </div>
      <div className={composeClasses("mt-2", styles.ratingFilter)}>
        <div>
          <FilterWrapper heading="Ratings" type="shopping">
            {/* enter the stars here */}
            <StarsFilter
              name={"starsFilter"}
              onChange={handleStarsFilter}
              value={""}
            />
          </FilterWrapper>
        </div>
      </div>
      <div className={styles.brandsFilter}>
        <div>
          <FilterWrapper heading="Search Brands" type="shopping">
            <div className={styles.input}>
              <input type="search" />
            </div>
            {brandsFilter}
          </FilterWrapper>
        </div>
      </div>
      <div className={styles.sizeFilter}>
        <FilterWrapper heading="Size" type="shopping">
          <SizeFilter />
        </FilterWrapper>
      </div>
      <div className={styles.itemAvailabilityFilter}>
        <FilterWrapper heading="Item Availability" type="shopping">
          {availabilityFilters}
        </FilterWrapper>
      </div>
      <div className={styles.shippingFilter}>
        <FilterWrapper heading="Shipping" type="shopping">
          {shippingFilters}
        </FilterWrapper>
      </div>
    </div>
  );
};

export default ShoppingFilter;
