/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { Link } from "react-router-dom";
import Asset from "Components/Asset/asset";
import cloudinaryConstants from "Helpers/cloudinaryConstants";
import styles from "./predictiveSearch.module.scss";
import HighlightComponent from "./HighlightComponent";
import { connect } from "react-redux";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";

export interface IHit {
  hit: any;
  hitLinkKey: string;
  hitLinkPrefix: string;
  showProductImage: boolean;
  SelectMarketplaceProductAction: Function;
}

/**
 * Renders an individual hit item
 * @param {Object} props Props
 * @returns {Component} React component
 */
const Hit = (properties: IHit) => {
  const handleProductClickEvent = () => {
    if (properties.hit) {
      if (properties.hitLinkPrefix === "/online-shopping/product-detail/") {
        properties.SelectMarketplaceProductAction(properties.hit);
      }
    }
  };
  return (
    <li className={styles.hitListItem}>
      <Link
        className={styles.hitListLink}
        onClick={handleProductClickEvent}
        to={
          properties.hitLinkPrefix === "/online-shopping/search?search="
            ? `${properties.hitLinkPrefix}${
                properties.hit[properties.hitLinkKey]
              }`
            : `${properties.hitLinkPrefix}${
                properties.hit[properties.hitLinkKey]
              }/${properties.hit.sku}`
        }
      >
        {properties.showProductImage && (
          <Asset
            alt={
              (properties.hit && properties.hit.query) ||
              "Product image thumbnail."
            }
            className={styles.predictiveSearchImageThumbail}
            name={properties.hit.image_thumbnail_path}
            type={cloudinaryConstants.asset.cloudinaryType}
          />
        )}
        <HighlightComponent
          attribute={properties.hit.query ? "query" : "name"}
          hit={properties.hit}
        />
      </Link>
    </li>
  );
};

export default connect(null, {
  SelectMarketplaceProductAction,
})(Hit);
