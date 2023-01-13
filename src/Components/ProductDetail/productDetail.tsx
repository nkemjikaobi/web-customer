/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import constants from "Components/constants";
import ImgCarousel from "./ImgCarousel/imgCarousel";
import styles from "./productDetail.module.scss";
import PriceBox from "Components/PriceBox/priceBox";
import { connect } from "react-redux";
import IProduct from "dto/KongaOnline/IProduct";
import { useHistory } from "react-router-dom";
import ProductSellerBand from "Components/ProductSellerBand/productSellerBand";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import { SetCartToOpenAction } from "Http/Redux/Actions/Cart/ICartAction";
import {
  AddItemToCart,
  HideCartAlert,
  ManageCartAlert,
} from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import {
  isNotEmptyArray,
  normalizeProductValues,
  getBrandedProductName,
  composeClasses,
} from "libs/utils/utils";
import DeliveryReturns from "Components/DeliveryReturns/deliveryReturns";
import IVariantAttribute from "dto/KongaOnline/IVariantAttribute";
import ItemQuantity from "Components/ItemQuantity/itemQuantity";
import MarketplaceService from "Http/Services/MarketplaceService";
import IOption from "dto/KongaOnline/IOption";
import IKeyValuePair from "dto/Utils/IKeyValuePair";
import AttributeOptions from "PagesComponents/OnlineShopping/ProductDetail/AttributeOptions";
import IOptionAttributeParam from "dto/KongaOnline/IOptionAttributeParam";
import FoodService from "Http/Services/FoodService";
import ImageCarouselMobile from "./ImageCarouselMobile/ImageCarouselMobile";
import {
  AddItemToSavedListAction,
  RemoveItemFromSavedList,
} from "Http/Redux/Actions/Cart/ICartAction";
import config from "Configurations/configurations";
import BuyNowButton from "Pages/Konga/ProductDetail/BuyNowButton/BuyNowButton";
import {
  KONGA_ONLINE_MOBILE_NUMBER,
  REMOVE_SAVED_FOR_LATER_ERROR_MSG,
  REMOVE_SAVED_FOR_LATER_SUCCESS_MSG,
  SAVED_FOR_LATER_ERROR_MSG,
  SAVED_FOR_LATER_SUCCESS_MSG,
} from "Helpers/Constants";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";
import StarRatings from "react-star-ratings";

export interface IProductDetailInfo {
  selectedProduct?: IProduct;
  foodCart?: any;
  marketplaceCart?: any;
  savedItems?: any;
  SetCartToOpenAction: Function;
  HideCartAlert: Function;
  ManageCartAlert: Function;
  AddItemToCart: Function;
  AddItemToSavedListAction: Function;
  RemoveItemFromSavedList: Function;
  SelectMarketplaceProductAction: Function;
}

/**
 * TODO: Move this to a constants file or better still made configurable.
 */
const shareOptions = [
  {
    name: "facebook",
    link: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "twitter",
    link: "https://twitter.com/intent/tweet?url=",
  },
  {
    name: "whatsapp",
    link: "https://api.whatsapp.com/send?",
  },
];

const { productLabels } = constants;

const ProductDetailInfo: React.FunctionComponent<IProductDetailInfo> = (
  props: IProductDetailInfo
) => {
  const history = useHistory();

  const { selectedProduct } = props;

  const [productCode, setProductCode] = useState<number>(0);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [orderAttributes, setOrderAttributes] = useState<
    Array<IOptionAttributeParam>
  >([]);
  const [features, setFeatures] = useState<Array<any>>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<Array<IVariantAttribute>>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Array<IKeyValuePair>
  >([]);
  const [productQty, setProductQty] = useState<number>(1);
  const [cart, setCart] = useState<IMarketplaceCartForm>({
    cart_id: null,
    product: null,
    quantity: 1,
  });

  const averageRatings =
    props?.selectedProduct?.product_rating?.quality.average;
  const productReviews = props?.selectedProduct?.product_rating?.total_ratings;

  const pagePath = window.location.href;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      document.body.scrollTop = 0;
      setOrderAttributes([]);
      if (props.marketplaceCart) {
        setCart({
          ...cart,
          cart_id: props.marketplaceCart.id,
          store_id: MarketplaceService.STORE_ID,
        });
      } else if (props.foodCart) {
        setCart({
          ...cart,
          cart_id: props.foodCart.id,
          store_id: FoodService.STORE_ID,
        });
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (selectedProduct && mounted) {
      setProductQty(1);
      setProductCode(selectedProduct.sku);
      setProductName(
        `${selectedProduct.brand ?? ""} ${selectedProduct.name ?? ""}`.trim()
      );
      setProductPrice(selectedProduct.price);

      if (selectedProduct.variants && selectedProduct.variants.attributes) {
        setAttributes(selectedProduct.variants.attributes);

        /**
         * TODO: assign to each atttribute its selected value
         */
        selectedProduct.variants.attributes.forEach((attribute: any) => {
          let selectedValue: IOption | null = null;
          if (attribute.options) {
            selectedValue = attribute.options[0];
          }

          const isSize: any =
            attribute.code && attribute.code.indexOf("size") > -1;
          const selectedLabel = isSize ? "Size" : attribute.label;

          const newValue: IKeyValuePair = {
            key: selectedLabel,
            value: selectedValue,
          };

          const valueIndex: any = selectedAttributes.findIndex(
            (x: IKeyValuePair) => x.key === selectedLabel
          );

          if (valueIndex >= 0) {
            selectedAttributes[valueIndex] = newValue;
          } else {
            selectedAttributes.push(newValue);
          }
        });
      }
      const feats: Array<any> = [];
      if (selectedProduct.pickup) {
        feats.push(productLabels.isPickup);
      }
      if (selectedProduct.express_delivery) {
        feats.push(productLabels.hasExpressDelivery);
      }
      if (selectedProduct.is_pay_on_delivery) {
        feats.push(productLabels.payOnDelivery);
      }
      if (
        selectedProduct.konga_fulfilment_type &&
        selectedProduct.konga_fulfilment_type !== "SHQ"
      ) {
        feats.push(productLabels.isKongaFulfilled);
      }
      if (selectedProduct.is_free_shipping) {
        feats.push(productLabels.freeShipping);
      }
      if (selectedProduct.has_after_sales_service) {
        feats.push(productLabels.hasAfterSalesService);
      }
      setFeatures(feats);
      return () => {
        mounted = false;
      };
    }
  }, [selectedProduct]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const target = document.getElementById("buy-now");
      const target2 = document.getElementById("buy-now-unfixed");

      window.addEventListener(
        "scroll",
        () => {
          const scrolled = document.body.scrollTop;
          if (scrolled >= 775) {
            target?.classList.remove(styles.show);
            target?.classList.add(styles.hide);

            target2?.classList.remove(styles.hide);
            target2?.classList.add(styles.show);
          } else {
            target?.classList.remove(styles.hide);
            target?.classList.add(styles.show);

            target2?.classList.remove(styles.show);
            target2?.classList.add(styles.hide);
          }
        },
        true
      );
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToCartEvent = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (selectedProduct) {
      const newCart = {
        ...cart,
        product: selectedProduct,
        attributes: orderAttributes,
        quantity: productQty,
      };

      props
        .AddItemToCart(newCart)
        .then((success: any) => {
          setCart(newCart);
          props.ManageCartAlert(cart);
          props.SetCartToOpenAction(MarketplaceService.STORE_ID);
          props.HideCartAlert();
          history.push(
            `/online-shopping/checkout/shopping-cart/${MarketplaceService.STORE_ID}`
          );
        })
        .finally(() => setIsSubmitting(false));
    } else {
      setIsSubmitting(false);
    }
  };

  const newProduct = selectedProduct && normalizeProductValues(selectedProduct);
  const URL = config.web.public_url;
  const FACEBOOK_PRODUCT_URL = newProduct?.url;
  const SKU = newProduct?.denormalized?.sku;
  const CATEGORY_ID = newProduct?.category?.id;
  const availableQty =
    selectedProduct && selectedProduct.stock && selectedProduct.stock.quantity;
  const availableLocations =
    selectedProduct &&
    selectedProduct.warehouseLocationRegions &&
    selectedProduct.warehouseLocationRegions.availability_locations;
  /**
   * Renders price box
   * @param {*} showFreeShipping
   * @param {*} wrapperClass
   * @returns {*} DOM node
   */
  const renderPriceBox = (showFreeShipping = true, wrapperClass: any) => {
    const selectedProduct = newProduct;
    const originalPrice = selectedProduct.originalPrice;
    const specialPrice =
      selectedProduct.dealPrice ||
      selectedProduct.specialPrice ||
      selectedProduct.price;
    return (
      <PriceBox
        freeShipping={selectedProduct.freeShipping}
        originalPrice={originalPrice}
        showFreeShipping={showFreeShipping}
        specialPrice={specialPrice}
        wrapperClass={wrapperClass}
      />
    );
  };

  const handleAttributesChange = (attr: IOptionAttributeParam) => {
    const exists = orderAttributes.findIndex(
      (orderAttribute: IOptionAttributeParam) =>
        orderAttribute.attribute_id === attr.attribute_id
    );

    if (exists >= 0) {
      orderAttributes[exists] = attr;
    } else {
      orderAttributes.push(attr);
    }
  };

  const addItemToSavedList = async (sku: number | null) => {
    try {
      setIsLoading(true);
      const savedData = await MarketplaceService.addItemToSavedList(
        "default",
        sku
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const [visible, setVisible] = useState<boolean>(false);

  const isSavedItem: boolean =
    Array.isArray(props.savedItems) &&
    props.savedItems.findIndex((item) => item.sku === selectedProduct?.sku) >
      -1;

  const removeItem = async (sku: number) => {
    try {
      if (sku) {
        const response = await props.RemoveItemFromSavedList(sku);
        if (response) {
          props.ManageCartAlert(
            null,
            REMOVE_SAVED_FOR_LATER_SUCCESS_MSG,
            NotificationAlertType.Success
          );
        } else {
          props.ManageCartAlert(
            null,
            REMOVE_SAVED_FOR_LATER_ERROR_MSG,
            NotificationAlertType.Success
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (sku: number) => {
    try {
      if (sku) {
        const response = await props.AddItemToSavedListAction(sku);
        if (response) {
          props.ManageCartAlert(
            null,
            SAVED_FOR_LATER_SUCCESS_MSG,
            NotificationAlertType.Success
          );
        } else {
          props.ManageCartAlert(
            null,
            SAVED_FOR_LATER_ERROR_MSG,
            NotificationAlertType.Success
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyNowButton = (
    <BuyNowButton
      isLoading={isLoading}
      isSavedItem={isSavedItem}
      isSubmitting={isSubmitting}
      onAddItem={() => addItem(productCode)}
      onAddToCart={handleAddToCartEvent}
      onRemoveItem={() => removeItem(productCode)}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.productDetail}>
        <div className={styles.productDetail_left}>
          <div className={styles.carouselTabsUpwards}>
            <ImgCarousel selectedProduct={selectedProduct} />
          </div>
          <div className={styles.carouselMobile}>
            <ImageCarouselMobile selectedProduct={selectedProduct} />
          </div>
          <div className={styles.sellerBandMobileOnly}>
            <ProductSellerBand selectedProduct={selectedProduct} />
          </div>
          <div className={styles.content}>
            <div className={styles.priceBarMobileOnly}>
              {selectedProduct &&
                renderPriceBox(true, styles.productDetailPriceBox)}
            </div>
            <div className={styles.header}>
              {selectedProduct?.express_delivery && (
                <div>
                  <Icon name="kongaNow" />
                </div>
              )}
              <h1 className={"h1"}>{productName}</h1>
              <p className={styles.reviews}>
                <span>
                  <StarRatings
                    name="rating"
                    numberOfStars={5}
                    rating={averageRatings !== undefined ? averageRatings : 0}
                    starDimension={"15px"}
                    starEmptyColor="#DBDBDB"
                    starRatedColor="#FFBC56"
                    starSpacing="0"
                  />
                </span>
                <span className={styles.productCode}>
                  {productReviews !== undefined ? productReviews : 0} Reviews
                </span>{" "}
              </p>
              <p>
                Product Code:{" "}
                <span className={styles.productCode}>{productCode}</span>
              </p>
            </div>
            <div className={styles.priceBar}>
              {selectedProduct &&
                renderPriceBox(true, styles.productDetailPriceBox)}
            </div>
            <div className={styles.filter}>
              {attributes.map(
                (attribute: IVariantAttribute, keyCode: number) => {
                  const code = attribute && attribute.code;
                  const isSize: any = code && code.indexOf("size") > -1;
                  const isLength: any = code && code.indexOf("length") > -1;
                  const isColor: any = code === "color";

                  const extraClassName = composeClasses(
                    (isSize || isLength) && styles.productAttributeSize,
                    isColor && styles.productAttributeColor
                  );

                  const selectedLabel = isSize ? "Size" : attribute.label;
                  return (
                    <div
                      className={composeClasses(
                        styles.productAttribute,
                        extraClassName
                      )}
                      key={keyCode}
                    >
                      <input name={`variants[${attribute.id}]`} type="hidden" />
                      <label>{selectedLabel}:</label>
                      <div className={styles.attributeOptions}>
                        <AttributeOptions
                          className={styles.attributeOption}
                          id={attribute.id}
                          onChange={handleAttributesChange}
                          options={attribute.options ?? []}
                          SelectedClassName={styles.attributeOptionSelected}
                        />
                      </div>
                    </div>
                  );
                }
              )}
              <div className={styles.filter_quantity}>
                <p className={styles.label}>Quantity:</p>
                <div className={styles.itemQuantityWrapper}>
                  <ItemQuantity
                    availableQty={availableQty}
                    onChange={(newQty: number) => setProductQty(newQty)}
                    value={productQty}
                  />
                </div>
              </div>
              <div className={styles.bulk}>
                <p>Call us for bulk purchases</p>
                <p onClick={() => setVisible(!visible)}>
                  <a href={`tel:${KONGA_ONLINE_MOBILE_NUMBER}`}>
                    {visible
                      ? `${KONGA_ONLINE_MOBILE_NUMBER}`
                      : "Click here to show phone number"}
                  </a>
                </p>
              </div>
            </div>
            <div
              className={composeClasses(styles.buyNow, styles.show)}
              id="buy-now"
            >
              {buyNowButton}
            </div>
            <div>
              <div className={styles.productLabels}>
                {Array.isArray(features) &&
                  features.map((productLabel: any, key: number) => (
                    <div className={styles.productLabel} key={key}>
                      <div className={styles.productLabelIcon}>
                        <Icon name={productLabel.icon} />
                      </div>
                      <span>{productLabel.label}</span>
                    </div>
                  ))}
              </div>
            </div>
            {isNotEmptyArray(availableLocations) && (
              <div className={styles.locationsContainer}>
                <div className={styles.locationsTitle}>
                  Next Day Delivery Available at:
                </div>
                <div className={styles.locationsList}>{availableLocations}</div>
              </div>
            )}
            <div className={styles.productShareOptionsWrapper}>
              <h5>Share With Friends</h5>
              <div className={styles.productShareOptions}>
                {Array.isArray(shareOptions) &&
                  shareOptions.map((icon) => (
                    <a
                      aria-label={`Share on ${icon.name}`}
                      className={styles.productShareOption}
                      href={
                        icon.name === "twitter"
                          ? //eslint-disable-next-line max-len
                            `${icon.link}${encodeURIComponent(
                              pagePath
                            )}&text=${getBrandedProductName(
                              newProduct
                            )}&via=shopKonga`
                          : icon.name === "whatsapp"
                          ? `${icon.link}text=${getBrandedProductName(
                              newProduct
                            )}
                                                        ${encodeURIComponent(
                                                          `${URL}/online-shopping/product-detail/${CATEGORY_ID}/${SKU}`
                                                        )}`
                          : `${icon.link}${encodeURIComponent(
                              `${URL}/online-shopping/product-detail/${FACEBOOK_PRODUCT_URL}`
                            )}`
                      }
                      key={icon.name}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon name={icon.name} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productDetail_right}>
          <div>
            <DeliveryReturns />
          </div>
          <div
            className={composeClasses(styles.buyNowUnfixed, styles.show)}
            id="buy-now-unfixed"
          >
            {buyNowButton}
          </div>
          <div
            className={composeClasses(
              styles.sellerB,
              styles.tabletAndAboveOnly
            )}
          >
            <ProductSellerBand selectedProduct={selectedProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailInfo.defaultProps = {
  selectedProduct: undefined,
  foodCart: undefined,
  marketplaceCart: undefined,
  savedItems: [],
};

const mapStateToProps = (state: any) => ({
  marketplaceCart: state.cart.Marketplace,
  foodCart: state.cart.Food,
  savedItems: state?.cart?.SavedList?.items,
});

export default connect(mapStateToProps, {
  AddItemToCart,
  HideCartAlert,
  ManageCartAlert,
  SetCartToOpenAction,
  SelectMarketplaceProductAction,
  AddItemToSavedListAction,
  RemoveItemFromSavedList,
})(ProductDetailInfo);
