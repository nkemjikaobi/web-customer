/* eslint-disable react/no-unknown-property */
import CategoryListingCard from "Components/ProductCard/CategoryListingCard";
import CategoryListPlaceholder from "Components/ProductCard/CategoryListPlaceholder";
import IProduct from "dto/KongaOnline/IProduct";
import MarketplaceService from "Http/Services/MarketplaceService";
import { range } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./ProductListingComponent.module.scss";

interface IProductListComponent {
  products: Array<IProduct>;
}

const ProductListComponent: React.FunctionComponent<IProductListComponent> = (
  props: IProductListComponent
) => {
  const [productList, setProductList] = useState<any>(<Fragment />);

  useEffect(() => {
    let mounted = true;
    if (mounted && props.products && props.products.length > 0) {
      const tempProductList = props.products.map(
        (product: IProduct, index: number) => {
          return (
            <Fragment key={index}>
              <div className={styles.productCardWrapper}>
                <CategoryListingCard
                  key={product.sku}
                  product={product}
                  store_id={MarketplaceService.STORE_ID}
                />
              </div>
            </Fragment>
          );
        }
      );
      setProductList(tempProductList);
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  useEffect(() => {
    let tempProductList = range(10).map((index: number) => {
      return (
        <Fragment key={index}>
          <div className={styles.productCardWrapper}>
            <CategoryListPlaceholder key={index} />
          </div>
        </Fragment>
      );
    });
    setProductList(tempProductList);
    return () => {
      tempProductList = [];
    };
  }, []);

  return <Fragment>{productList}</Fragment>;
};

export default ProductListComponent;
