/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Button from "Components/Button/button";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import ItemDetailsCard from "Components/ItemDetailsCard/itemDetailsCard";
import SavedListCard from "Components/SavedListCard/SavedListCard";
import styles from "./shoppingCart.module.scss";
import { useHistory, useParams } from "react-router-dom";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import IFoodCart from "dto/Cart/IFoodCart";
import MarketplaceService from "Http/Services/MarketplaceService";
import { connect } from "react-redux";
import FoodService from "Http/Services/FoodService";
import ICartProduct from "dto/Cart/ICartProduct";
import ICartItem from "dto/Cart/ICartItem";
import CartSummaryPageComponent from "PagesComponents/Cart/CartSummary/CartSummaryPageComponent";
import { SetCartToOpenAction } from "Http/Redux/Actions/Cart/ICartAction";
import { composeClasses } from "libs/utils/utils";
import CartService from "Http/Services/CartService";
import ISavedList from "dto/KongaOnline/ISavedList";
import ISavedListItem from "dto/KongaOnline/ISavedListItem";
import ItemDetailsTemplateCard from "Components/ItemDetailsCard/ItemDetailsTemplateCard";
import { range } from "lodash";
import ReactPaginate from "react-paginate";
interface IShoppingCart {
  foodCart?: IFoodCart;
  marketplaceCart?: IMarketplaceCart;
  SetCartToOpenAction: Function;
  savedListItems?: any;
}

const ShoppingCart: React.FunctionComponent<IShoppingCart> = (
  props: IShoppingCart
) => {
  const history = useHistory();
  const { store_id }: any = useParams();
  const [cart, setCart] = useState<IMarketplaceCart | IFoodCart | null>({});
  const [products, setProducts] = useState<Array<ICartProduct>>([]);
  const [savedList, setSavedList] = useState<ISavedList>();
  const [pagenumber, setPageNumber] = useState<number>(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [showPaginateButtons, setShowPaginateButtons] =
    useState<boolean>(false);
  const [currentItemsInCart, setCurrentItemsInCart] = useState<
    Array<ICartProduct>
  >([]);
  const storeId = parseInt(store_id) ?? 0;
  const setCartId = (): number | undefined => {
    props.SetCartToOpenAction(storeId);

    let cartId: number | undefined = undefined;
    if (
      storeId &&
      props.marketplaceCart &&
      storeId === MarketplaceService.STORE_ID
    ) {
      cartId = props.marketplaceCart.cart_id || props.marketplaceCart.id;
    } else if (storeId && props.foodCart && storeId === FoodService.STORE_ID) {
      cartId = props.foodCart.cart_id || props.foodCart.id;
    }
    return cartId;
  };

  useEffect(() => {
    let mounted = true;
    const cartId: number | undefined = setCartId();
    if (mounted && cartId) {
      loadCartData(cartId);
      setCartFromRedux();
    }

    if (mounted) {
      (async function () {
        try {
          await MarketplaceService.GetSavedList("default").then(setSavedList);
        } catch (error: unknown) {}
      })();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && (props.foodCart || props.marketplaceCart) && store_id) {
      const cartId: number | undefined = setCartId();
      if (cartId) {
        loadCartData(cartId);
      }
    }
    return () => {
      mounted = false;
    };
  }, [props.foodCart, props.marketplaceCart]);

  useEffect(() => {
    let prods: Array<ICartProduct> = [];
    if (cart && cart.items) {
      prods = cart.items.map((item: ICartItem) => item.products).flat(2);
    }
    setProducts(prods);
    return () => {
      prods = [];
    };
  }, [cart]);

  const proceedBtnClickEvent = (e: any) => {
    e.preventDefault();
    history.push(`/online-shopping/checkout/payment/${store_id}`);
  };

  const ctnShoppingBtnClickEvent = async (e: any) => {
    e.preventDefault();
    if (storeId === MarketplaceService.STORE_ID) {
      history.push("/online-shopping");
    } else {
      history.push("/food");
    }
  };

  const loadCartData = (cartId: number) => {
    if (cartId) {
      CartService.GetCart(cartId, store_id).then(
        (cartResponse: IMarketplaceCart | IFoodCart | null) =>
          setCart(cartResponse)
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && (props.foodCart || props.marketplaceCart)) {
      setCartFromRedux();
    }

    return () => {
      mounted = false;
    };
  }, [props.foodCart, props.marketplaceCart]);

  useEffect(() => {
    if (savedItemsData.length > 0) {
      setShowPaginateButtons(true);
    }
  }, [showPaginateButtons]);

  const setCartFromRedux = () => {
    const storeId = parseInt(store_id) ?? 0;
    let tempCurrentItemsInCart: any = [];

    switch (storeId) {
      case FoodService.STORE_ID:
        tempCurrentItemsInCart = props.foodCart && props.foodCart.items;
        break;
      case MarketplaceService.STORE_ID:
      default:
        tempCurrentItemsInCart =
          props.marketplaceCart && props.marketplaceCart.items;
        break;
    }
    setCurrentItemsInCart(
      tempCurrentItemsInCart
        ? tempCurrentItemsInCart.map((item: ICartItem) => item.products).flat(2)
        : []
    );
  };

  const itemsPerPage = 5;

  const pagesVisited = pagenumber * itemsPerPage;

  const pageCount =
    props.savedListItems &&
    Math.ceil(props.savedListItems.length / itemsPerPage);

  const disablePagecount = pageCount - 1;

  const changePage = (data: any) => {
    //selected(page we want to move to) is from react-paginate
    setPageNumber(data.selected);
  };

  const savedItemsData = props.savedListItems
    .filter((value: any) => {
      if (value?.product !== null) {
        return value;
      }
    })
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((savedItem: ISavedListItem, key: number) => (
      <SavedListCard key={key} savedItem={savedItem} />
    ));
  // const displayDispatchers =
  // allDispatchers &&
  // allDispatchers
  // 	.slice(pagesVisited, pagesVisited + dispatchersPerPage)
  // 	.map(dispatcher => (
  // 		<RiderItem dispatcher={dispatcher} key={dispatcher.id} />
  // 	));
  return (
    <BasePageLayout
      hideFooterOnMobile={"true"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.shoppingCart}>
        <div className={styles.left}>
          <p className={(styles.order, styles.mobileOnly)}>Shopping Cart</p>
          <div className={styles.itemDetails}>
            <div
              className={composeClasses(
                styles.header,
                styles.tabletAndAboveOnly
              )}
            >
              <div className={composeClasses("row w-100")}>
                <p
                  className={composeClasses(
                    styles.widthFiveHundred,
                    "col-md-5"
                  )}
                >
                  Items Details
                </p>
                <p
                  className={composeClasses(
                    styles.widthFiveHundred,
                    "col-md-2"
                  )}
                >
                  Quantitiy
                </p>
                <p
                  className={composeClasses(
                    styles.widthFiveHundred,
                    "col-md-2 text-end"
                  )}
                >
                  Item Price
                </p>
                <p className={composeClasses("col-md-3")} />
              </div>
            </div>
            {isLoadingProducts &&
              currentItemsInCart.length <= 0 &&
              range(5).map((key: number) => (
                <ItemDetailsTemplateCard key={key} />
              ))}
            {!isLoadingProducts &&
              currentItemsInCart &&
              currentItemsInCart.map((product: ICartProduct) => (
                <ItemDetailsCard key={product.sku} product={product} />
              ))}
          </div>
          <div className={styles.buttonOptions}>
            <div
              className={composeClasses(
                styles.button1,
                styles.tabletAndAboveOnly
              )}
            >
              <Button
                btnClass={composeClasses(
                  "btn-primary text-white",
                  styles.continue
                )}
                handleClick={ctnShoppingBtnClickEvent}
                title="Continue Shopping"
              />
            </div>
            {currentItemsInCart.length > 0 ? (
              <div className={styles.button2}>
                <Button
                  handleClick={proceedBtnClickEvent}
                  title="Proceed to Checkout"
                />
              </div>
            ) : (
              <Fragment />
            )}
          </div>
          {storeId === MarketplaceService.STORE_ID &&
            savedItemsData.length > 0 && (
              <div
                className={composeClasses(
                  styles.savedForLater,
                  styles.tabletAndAboveOnly
                )}
              >
                <h1 className={styles.headingText}>Saved for Later</h1>
                <div className="content">{savedItemsData}</div>
                {showPaginateButtons ? (
                  <div>
                    <ReactPaginate
                      activeClassName={styles.paginationActive}
                      containerClassName={styles.paginationBttns}
                      disabledClassName={styles.paginationDisabled}
                      marginPagesDisplayed={0}
                      nextClassName={composeClasses(
                        styles.nextClassName,
                        `${pagenumber === disablePagecount && styles.disabled}`
                      )}
                      nextLabel={"Next"}
                      nextLinkClassName={"nextBttn"}
                      onPageChange={changePage}
                      pageCount={pageCount}
                      pageRangeDisplayed={2}
                      previousClassName={composeClasses(
                        styles.previousClassName,
                        `${pagenumber === 0 && styles.disabled}`
                      )}
                      previousLabel={"Previous"}
                      previousLinkClassName={"previousBttn"}
                    />
                  </div>
                ) : null}
              </div>
            )}
        </div>
        <div className={styles.cartSummary}>
          <CartSummaryPageComponent />
        </div>
      </div>
    </BasePageLayout>
  );
};

ShoppingCart.defaultProps = {
  foodCart: undefined,
  marketplaceCart: undefined,
  savedListItems: [],
};

const mapStateToProps = (state: any) => ({
  foodCart: state.cart.Food,
  marketplaceCart: state.cart.Marketplace,
  savedListItems: state?.cart?.SavedList?.items,
});

export default connect(mapStateToProps, { SetCartToOpenAction })(ShoppingCart);
