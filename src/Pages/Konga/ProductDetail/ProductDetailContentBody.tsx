import React, { useEffect, useState } from "react";
import styles from "./productDetail.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import constants from "Components/constants";
import { connect } from "react-redux";
import IProduct from "dto/KongaOnline/IProduct";
import ICategory from "dto/KongaOnline/ICategory";
import { useHistory } from "react-router-dom";
import { getSanitizedHtml, isNotEmptyArray } from "libs/utils/utils";
import Accordion from "Components/Accordion/accordion";
import MarketplaceService from "Http/Services/MarketplaceService";
import INavbarProductCategory from "dto/KongaOnline/INavbarProductCategory";
import IFrontendAttribute from "dto/KongaOnline/IFrontendAttribute";
import { composeClasses } from "Pages/CustomPage/Home/sectionVariants";
import { RECOMBI_PRODUCT_DETAIL_PAGE } from "Helpers/Constants";
import { BestSellingProductCard } from "Components/ProductCard/BestSellingProductCard";
import ProductDetailContent from "Components/ProductDetail/productDetail";
import CustomerReview from "Components/ProductDetail/CustomerReview/customerReview";

interface IProductDetailContentBody {
  product: number;
  selectedCategory?: ICategory;
  breadCrumb?: Array<IBreadcrumbProp>;
}

const {
  pageIDs: { productSellerBandID, productScrollBarID },
} = constants;

const ProductDetailContentBody: React.FunctionComponent<
  IProductDetailContentBody
> = (props: IProductDetailContentBody) => {
  const history = useHistory();
  const [categoryPosition, setCategoryPosition] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [specifications, setSpecifications] = useState<
    Array<IFrontendAttribute>
  >([]);
  const [recomendations, setRecommendations] = useState<Array<IProduct>>([]);
  const [productDescription, setProductDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [breadCrumbs, setBreadCrumbs] = useState<Array<IBreadcrumbProp>>();
  const [activeProduct, setActiveProduct] = useState<IProduct>();
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (selectedProduct === null) {
        history.push("/online-shopping");
      } else {
        if (props.selectedCategory) {
          setCategoryPosition(props.selectedCategory.name ?? "");
          setCategoryId(props.selectedCategory.category_id ?? "");
        }
        if (selectedProduct) {
          setProductName(selectedProduct.name ?? "");
          setProductDescription(selectedProduct.description ?? "");
          setActiveProduct(selectedProduct);
          if (selectedProduct.frontend_attributes) {
            setSpecifications(selectedProduct.frontend_attributes);
          }
        }
      }
    }

    return () => {
      mounted = false;
    };
  }, [selectedProduct]);

  /**
   * TODO: Relook at this implementation
   */
  useEffect(() => {
    let mounted = true;
    if (
      mounted &&
      categoryPosition.length > 0 &&
      categoryId.length > 0 &&
      productName
    ) {
      if (props.breadCrumb && props.breadCrumb.length > 0) {
        setBreadCrumbs(props.breadCrumb);
      } else {
        setBreadCrumbs([
          { Text: "Home", Url: "/" },
          { Text: "Online Shopping", Url: "/online-shopping" },
          {
            Text: categoryPosition,
            Url: `/online-shopping/product-listing/${categoryId}`,
          },
          { Text: productName },
        ]);
      }
    }
    return () => {
      mounted = false;
    };
  }, [props.breadCrumb, categoryId, categoryPosition, productName]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window && window.addEventListener("scroll", fixScrollBanner);
    }

    return () => {
      mounted = false;
      window && document.body.removeEventListener("scroll", fixScrollBanner);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted && props.product) {
      getProduct();
      getRecomendations();
    }

    return () => {
      mounted = false;
    };
  }, [props.product]);

  const getRecomendations = async () => {
    if (props.product) {
      try {
        let prods: Array<any> = [];
        prods = await MarketplaceService.GetRecommendedProducts(
          props.product,
          undefined,
          16,
          RECOMBI_PRODUCT_DETAIL_PAGE
        );
        setRecommendations(prods);
      } catch (error: unknown) {}
    }
  };

  const getProduct = () => {
    MarketplaceService.GetProductByUrlOrID(`${props.product}`, true)
      .then((res: IProduct | null) => {
        if (res) {
          setSelectedProduct(res);
          const crumbs = [
            { Text: "Home", Url: "/" },
            { Text: "Online Shopping", Url: "/online-shopping" },
          ];

          if (res.categories) {
            const crumbCategories = res.categories.map(
              (category: INavbarProductCategory) => ({
                Text: category.name,
                Url: `/online-shopping/product-listing/${category.id}`,
              })
            );
            setBreadCrumbs([...crumbs, ...crumbCategories]);
          }
        }
      })
      .catch((err: any) => console.log(err));
  };

  /**
   * handle the display action of the scroll-banner
   * @returns {*} undefined
   */
  const fixScrollBanner = () => {
    const sellerBand = document.getElementById(productSellerBandID);
    if (sellerBand) {
      const scrollTarget = sellerBand.offsetTop;
      const scrollHeight = window.scrollY;
      const scrollBanner = document.getElementById(productScrollBarID);
      if (scrollHeight > scrollTarget) {
        scrollBanner && scrollBanner.classList.add(styles.fix);
      } else {
        scrollBanner && scrollBanner.classList.remove(styles.fix);
      }
    }
  };

  return (
    <BasePageLayout
      breadcrumbs={breadCrumbs}
      hasLocation={true}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.productDetail}>
        <section className={styles.productDetailContent}>
          <ProductDetailContent selectedProduct={selectedProduct} />
        </section>
        <section className={styles.productDetail_Info}>
          <div className={styles.tabletAndAboveOnly}>
            <div className={styles.header}>
              <h1>Product Details</h1>
            </div>
            <div
              dangerouslySetInnerHTML={getSanitizedHtml(productDescription)}
              style={{ padding: "1rem" }}
            />
          </div>
          <div className={styles.mobileContentWrapper}>
            <Accordion
              customWrapperClass={styles.accordionWrapper}
              title="Product Details"
            >
              <div
                className={styles.details}
                dangerouslySetInnerHTML={getSanitizedHtml(productDescription)}
              />
            </Accordion>
          </div>
        </section>
        <section className={styles.productDetail_Info}>
          {specifications && specifications.length > 0 && (
            <div className={styles.tabletAndAboveOnly}>
              <div className={styles.header}>
                <h1>Specification</h1>
              </div>
              <div className={composeClasses("row", styles.contentBody)}>
                {specifications.map(
                  (specification: IFrontendAttribute, key: number) => (
                    <div className={"col-6 pl-3 py-1"} key={key}>
                      {`${specification.attribute_label}: ${specification.attribute_value}`}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className={styles.mobileContentWrapper}>
            <Accordion
              customWrapperClass={styles.accordionWrapper}
              title="Specification"
            >
              {/* <div
                  className={styles.details}
                  dangerouslySetInnerHTML={getSanitizedHtml(specification)}
                /> */}
            </Accordion>
          </div>
        </section>
        <section className={styles.productDetail_Info}>
          <div className={styles.tabletAndAboveOnly}>
            <div className={styles.header}>
              <h1>Customer Reviews</h1>
            </div>
            <div className={styles.customerReviewWrapper}>
              <CustomerReview selectedProduct={selectedProduct} />
            </div>
          </div>
          <div className={styles.mobileContentWrapper}>
            <Accordion
              customWrapperClass={styles.accordionWrapper}
              title="Customer Reviews"
            >
              <CustomerReview selectedProduct={selectedProduct} />
            </Accordion>
          </div>
        </section>
        <section className={styles.productDetail_productListItems}>
          <div className={styles.productListHeading}>
            <h3>Similar Items You May Like</h3>
          </div>
          <div className={composeClasses("p-2", styles.productList)}>
            {recomendations.map((prod: IProduct, key: number) => (
              <BestSellingProductCard key={key} product={prod} />
            ))}
          </div>
        </section>
      </div>
    </BasePageLayout>
  );
};

ProductDetailContentBody.defaultProps = {
  breadCrumb: [],
  selectedCategory: undefined,
};

const mapStatesToProps = (state: any) => ({
  selectedCategory: state.marketplace.SelectedCategory,
});

export default connect(mapStatesToProps, null)(ProductDetailContentBody);
