import React, { useEffect, useState } from "react";
import styles from "./productSellerBand.module.scss";
import IProduct from "dto/KongaOnline/IProduct";

import constants from "Components/constants";

import { Link } from "react-router-dom";

const {
  pageIDs: { productSellerBandID },
} = constants;

const {
  productSellerBand,
  productSellerBandBanner,
  productSellerBandContent,
  sellerLink,
} = styles;

export interface ISoldByBand {
  selectedProduct?: IProduct;
}
/**
 * ProductSellerBand Component
 * @param {*} props component props
 * @returns {*} DOM Node
 */
const ProductSellerBand: React.FunctionComponent<ISoldByBand> = ({
  selectedProduct,
}: ISoldByBand) => {
  const [sellerName, setSellerName] = useState<string>("");
  const [sellerBanner, setSellerBanner] = useState<string>("");
  const [sellerURL, setSellerURL] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    if (mounted && selectedProduct) {
      if (selectedProduct.seller) {
        setSellerName(selectedProduct.seller.name);
        setSellerURL(selectedProduct.seller.url ?? "");
        setSellerBanner(selectedProduct.seller.banner ?? "");
      }
    }

    return () => {
      mounted = false;
    };
  }, [selectedProduct]);

  return (
    <>
      <div className={productSellerBand}>
        <div className={styles.productSellerBand_header}>
          <h1> Seller Information</h1>
          <Link to={`/online-shopping/merchant/${sellerURL}`}>
            <span className={sellerLink}>View Official Store</span>
          </Link>
        </div>
        <div className={styles.productSellerBand_mainContent}>
          {sellerBanner || !sellerName ? (
            <div className={productSellerBandBanner}>
              {/* <Asset
            alt={`${seller.name}.`}
            name={seller.banner}
            type={cloudinaryConstants.asset.cloudinaryType}
          /> */}
            </div>
          ) : (
            <div className={styles.sellerBadge}>{sellerName[0]}</div>
          )}
          <div className={productSellerBandContent}>
            <span>Sold by</span>
            <Link to={`/online-shopping/merchant/${sellerURL}`}>
              <span className={sellerName}>{sellerName}</span>
            </Link>
          </div>
        </div>
      </div>
      {selectedProduct?.warehouse_location_regions?.availability_locations
        .length > 0 && (
        <div className={productSellerBand}>
          <div className={styles.productSellerBand_header}>
            <h1> Next Day Delivery Available</h1>
          </div>
          <div className={styles.productSellerBand_mainContent2}>
            {selectedProduct?.warehouse_location_regions?.availability_locations.map(
              (location: string, key: number) => {
                return (
                  <div className={styles.location} key={key}>
                    <p>{location}</p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};

ProductSellerBand.defaultProps = {
  selectedProduct: undefined,
};

export default ProductSellerBand;
