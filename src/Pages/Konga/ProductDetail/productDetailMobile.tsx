import React, { Fragment, useEffect, useState } from "react";
import SellerBand from "Components/ProductDetail/SellerBand/sellerBand";
import styles from "./productDetail.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import ProductDetailContent from "Components/ProductDetail/productDetail";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";

import { connect } from "react-redux";
import IProduct from "dto/KongaOnline/IProduct";
import ICategory from "dto/KongaOnline/ICategory";
import { useHistory } from "react-router-dom";
import { getSanitizedHtml } from "libs/utils/utils";
import CustomerReview from "Components/ProductDetail/CustomerReview/customerReview";

export interface IProductDetail {
  selectedProduct?: IProduct;
  selectedCategory?: ICategory;
}

const data = [1, 2, 3, 4, 5, 6, 7];
const productList = data.map((e) => <Fragment key={e} />);

const ProductDetail: React.FunctionComponent<IProductDetail> = ({
  selectedProduct,
  selectedCategory,
}: IProductDetail) => {
  const history = useHistory();
  const [categoryPosition, setCategoryPosition] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    if (selectedProduct === null && selectedCategory === null) {
      history.push("/online-shopping");
    } else {
      setProductName(selectedProduct?.name ?? "");
      setProductDescription(selectedProduct?.description ?? "");
      setCategoryPosition(selectedCategory?.name ?? "");
      setCategoryId(selectedCategory?.category_id ?? "");
    }

    return () => {
      mounted = false;
    };
  }, [selectedProduct]);

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online Shopping", Url: "/online-shopping" },
    {
      Text: categoryPosition,
      Url: `/online-shopping/product-listing/${categoryId}`,
    },
    { Text: productName },
  ];

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.productDetail}>
        <section className={styles.productDetailContent}>
          <ProductDetailContent />
        </section>
        <section>
          <SellerBand />
        </section>
        <section className={styles.productDetail_Info}>
          <div className={styles.header}>
            <h1>Product Details</h1>
          </div>
          <div dangerouslySetInnerHTML={getSanitizedHtml(productDescription)} />
        </section>
        {/* TODO: the product specifications */}
        <section className={styles.productDetail_Sepcification}>
          <div className={styles.header}>
            <h2>Specification</h2>
          </div>
          <div className={styles.content}>
            <ul>
              <li>Shirts Type: Dress Shirts</li>

              <li>Gender: Men</li>

              <li>Pattern Type: Solid</li>

              <li>Material: Cotton</li>

              <li>Fit: Tailored</li>

              <li>Collocation: Pants, Shorts, Suits, Jackets, Coats</li>

              <li>Season: Spring Summer;Autumn;Winter</li>

              <li>Style: Business, Casual, Slim Fit, Fashion</li>
            </ul>
          </div>
        </section>
        <section className={styles.productDetail_customerReview}>
          <div className={styles.header}>
            <h2>Customer Review</h2>
          </div>
          <div className={styles.content}>
            <CustomerReview selectedProduct={selectedProduct} />
          </div>
        </section>
        <section className={styles.productDetail_productListItems}>
          <div className={styles.productListHeading}>
            <h3>Similar Items You May Like</h3>
          </div>
          <div className={styles.productList}>{productList}</div>
        </section>
      </div>
    </BasePageLayout>
  );
};

const mapStatesToProps = (state: any) => ({
  selectedProduct: state.marketplace.SelectedProduct,
  selectedCategory: state.marketplace.SelectedCategory,
});

export default connect(mapStatesToProps, null)(ProductDetail);
