/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import BasePageFullLayout from "Components/BasePageFullLayout/basePageFullLayout";
import BreadCrumbComponent, {
  IBreadCrumbComponent,
} from "PagesComponents/KTravel/BreadCrumb/BreadCrumbComponent";
import Banner from "Components/Banner/banner";
import styles from "./vendorDetail.module.scss";
import { CURRENCIES } from "Helpers/Constants";
import VendorDetailBanner from "Assets/images/png/vendorDetailBanner.png";
import FoodVendorListingCard from "Components/ProductCard/foodVendorListingCard";
import { composeClasses } from "libs/utils/utils";
import { connect } from "react-redux";
import { AddFoodItemCartAction } from "Http/Redux/Actions/Cart/IFoodCartAction";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import {
  SetCartToOpenAction,
  UpdateCartItemQtyAction,
} from "Http/Redux/Actions/Cart/ICartAction";
import FoodService from "Http/Services/FoodService";
import Icon from "Components/Icons/icon";
import CartService from "Http/Services/CartService";
import IProduct from "dto/KongaOnline/IProduct";
import PaginationComponent from "Components/Pagination/pagination";
import ISearchByStore from "dto/KongaOnline/ISearchByStore";
interface IProps {
  AddFoodItemToCart: any;
  AddFoodItemCartAction: Function;
  UpdateCartItemQtyAction: Function;
}

const breadCrumbs: Array<IBreadCrumbComponent> = [
  { text: "Home", url: "/" },
  { text: "Konga Food", url: "/food" },
  { text: "Restaurant" },
];

const FoodVendorDetail: React.FunctionComponent<IProps> = ({
  AddFoodItemToCart,
  AddFoodItemCartAction,
  UpdateCartItemQtyAction,
}) => {
  const { vendor_id }: any = useParams();
  const categoryRefs = useRef([]);
  const history = useHistory();

  const [restaurantDetails, setRestaurantDetails] = useState<any>("");
  const [productList, setProductList] = useState<Array<any>>();
  const [categoryMenu, setCategoryMenu] = useState<any>();
  const [orderContent, setOrderContent] = useState<any>(
    <div className={styles.orderContainer}>
      <div className={styles.orderContent}>
        <div className={styles.defaultText}>
          <h6>
            Your Order List is Empty. <br /> Add your favourite Meal to List
          </h6>
        </div>
      </div>
    </div>
  );
  const [cart, setCart] = useState<IMarketplaceCartForm>({
    cart_id: null,
    product: null,
    quantity: 1,
  });
  const [selected, setSelected] = useState<any>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [pageChangesCount, setPageChangesCount] = useState<number>();
  const [resetCounter, setResetCounter] = useState<boolean>(false);

  const storeTimeStatus = (product: IProduct) => {
    let status = false;
    const openTime = stringToHour(product.seller.opening_time!.toLowerCase());
    const closeTime = stringToHour(product.seller.closing_time!.toLowerCase());
    const currentTime = new Date().getTime();

    if (openTime < currentTime && currentTime < closeTime) {
      status = true;
    }
    return status;
  };

  const stringToHour = (time: string) => {
    const today = new Date();
    const timeSplit = time.split(":");
    const timePeriod = timeSplit[1].substr(-2).toLowerCase();
    let timeHour = parseInt(timeSplit[0]);

    timeHour += timePeriod === "pm" && timeHour < 12 ? 12 : 0;
    return today.setHours(timeHour);
  };

  const handleCartIncrement = async (event: any, product: any) => {
    event.preventDefault();
    setCart({ ...cart, product: product });
  };

  const addCartItem = async () => {
    if (!cart.cart_id && AddFoodItemToCart?.id) {
      setCart({ ...cart, cart_id: AddFoodItemToCart.id });
    }

    if (cart.product !== null) {
      const response = await AddFoodItemCartAction(cart);
      if (response === true) {
        SetCartToOpenAction(FoodService.STORE_ID);
      }
    }
  };

  const handleCartDecrement = async (event: any, product: any) => {
    event.preventDefault();
    SetCartToOpenAction(FoodService.STORE_ID);
    const cart_id =
      typeof AddFoodItemToCart.id === "undefined"
        ? AddFoodItemToCart.cart_id
        : AddFoodItemToCart.id;
    await UpdateCartItemQtyAction(
      {
        cart_id: cart_id,
        sku: product.sku,
        qty: --product.requested_quantity,
      },
      FoodService.STORE_ID
    );
  };

  const fetchRestaurantDetails = async (paginatedData?: ISearchByStore) => {
    const productList = paginatedData
      ? paginatedData
      : await FoodService.GetProductsByCategory(
          FoodService.CATEGORY,
          FoodService.STORE_ID,
          FoodService.PAGINATION_INIT,
          FoodService.PAGINATION_LIMIT,
          vendor_id
        );

    const handleCheckout = (event: any) => {
      event.preventDefault();
      history.push(`/food/checkout/shopping-cart/${AddFoodItemToCart.id}`);
    };

    const merchantInfo = productList?.products[FoodService.FIRST_INDEX]?.seller;
    const merchantProductByCat: any = {};

    const mapItemsToCat = productList?.products.map((item) => {
      item.open_store = storeTimeStatus(item);
      const productCat =
        item.categories?.reverse()![FoodService.FIRST_INDEX].name;
      if (typeof merchantProductByCat[productCat!] === "undefined") {
        merchantProductByCat[productCat!] = [];
      }
      return merchantProductByCat[productCat!].push(item);
    });

    const merchantCatKeys = Object.keys(merchantProductByCat);

    const catMenu = merchantCatKeys
      .filter((elem, indx) => {
        return indx < 5;
      })
      .map((e, i: any) => {
        return (
          <div
            className={composeClasses(
              selected === i ? styles.activeList : styles.list
            )}
            key={i}
            onClick={() => setSelected(i)}
          >
            {e}
          </div>
        );
      });
    setCategoryMenu(catMenu);

    const restaurant = Object.keys(merchantProductByCat)?.map((catName) => (
      <FoodVendorListingCard
        key={catName}
        products={merchantProductByCat[catName]}
        store_id={FoodService.STORE_ID}
      />
    ));

    setProductList(restaurant);
    setRestaurantDetails(merchantInfo);
  };

  const cartInfoUpdate = async () => {
    const cart_id =
      typeof AddFoodItemToCart.id === "undefined"
        ? AddFoodItemToCart.cart_id
        : AddFoodItemToCart.id;
    const getCart = await CartService.GetCart(cart_id, FoodService.STORE_ID);
    const cartProducts = getCart?.items?.map((item) => {
      return item.products;
    });

    if (typeof cartProducts !== "undefined") {
      const orderItems: any = [];
      cartProducts.forEach((productObj) => {
        const allItems = productObj.map((product) => (
          <div className={styles.orderItems} key={product.sku}>
            <div className={styles.darkFont}>
              <span onClick={(event) => handleCartDecrement(event, product)}>
                <Icon className={"me-2"} name={"minusButton"} />
              </span>
              {product.requested_quantity}
              <span onClick={(event) => handleCartIncrement(event, product)}>
                <Icon className={"ms-2 me-4"} name={"plusButton"} />
              </span>
              {product.name}
            </div>
            <div className={styles.darkFont}>
              {CURRENCIES.NAIRA + product.subtotal}
            </div>
          </div>
        ));
        orderItems.push(allItems);
      });

      const orderSubTotal: any = getCart?.amounts?.filter((amount) => {
        if (amount.code === "subtotal") {
          return amount;
        }
      });

      const orderGrandTotal: any = getCart?.amounts?.filter((amount) => {
        if (amount.code === "grand_total") {
          return amount;
        }
      });

      const orderContent = (
        <div className={styles.orderContent}>
          <div className={styles.orderDetails}>{orderItems}</div>
          <div className={styles.orderItems}>
            <small className={styles.lightFont}>{orderSubTotal[0].title}</small>
            <small className={styles.lightFont}>
              {CURRENCIES.NAIRA + orderSubTotal[0].amount}
            </small>
          </div>
          <div className={styles.orderItems}>
            <small className={styles.lightFont}>Delivery Fee</small>
            <small className={styles.lightFont}>{CURRENCIES.NAIRA} 0.00</small>
          </div>
          <div className={composeClasses(styles.orderItems, "pb-3")}>
            <span>{orderGrandTotal[0].title}</span>
            <span>{CURRENCIES.NAIRA + orderGrandTotal[0].amount}</span>
          </div>
          <div>
            <Link to={`/food/checkout/shopping-cart/${FoodService.STORE_ID}`}>
              <button className={"btn btn-block btn-primary w-100 text-white"}>
                View Cart and Checkout
              </button>
            </Link>
          </div>
        </div>
      );

      setOrderContent(orderContent);
    }
  };

  const handleApiCall = (searchByRestaurant: ISearchByStore | null) => {
    if (searchByRestaurant) {
      fetchRestaurantDetails(searchByRestaurant);
      setPageCount(searchByRestaurant.pagination.total_number_pages);
      setResetCounter(false);
    }
  };

  const makeApiCall = async (
    pageNumber: number = FoodService.PAGINATION_INIT
  ) => {
    const response =
      (await FoodService.GetProductsByCategory(
        FoodService.CATEGORY,
        FoodService.STORE_ID,
        pageNumber,
        FoodService.PAGINATION_LIMIT,
        vendor_id
      )) || null;

    // handle the promise response
    handleApiCall(response);
  };

  const onPageChange = (pageNumber: any) => {
    const counter = pageChangesCount ?? 0;

    if (counter > 0) {
      makeApiCall(pageNumber);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setPageChangesCount(pageChangesCount ?? 0 + 1);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchRestaurantDetails();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (AddFoodItemToCart) {
      cartInfoUpdate();
    }

    return () => {
      mounted = false;
    };
  }, [AddFoodItemToCart]);

  useEffect(() => {
    let mounted = true;

    if (!cart.cart_id && AddFoodItemToCart?.id) {
      setCart({ ...cart, cart_id: AddFoodItemToCart.id });
    }

    addCartItem();

    return () => {
      mounted = false;
    };
  }, [cart]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const target = document.getElementById("order-content");
      const target2 = document.getElementById("vendor-menu");

      window.addEventListener(
        "scroll",
        () => {
          const scrolled = document.body.scrollTop;
          if (scrolled >= 344) {
            target?.classList.add(styles.fixedOrderContainer);
            target2?.classList.add(styles.fixedMenu);
          } else {
            target?.classList.remove(styles.fixedOrderContainer);
            target2?.classList.remove(styles.fixedMenu);
          }
        },
        true
      );
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fragment>
      <BasePageFullLayout
        breadcrumbTitle={""}
        hideFooterOnMobile={"false"}
        showNavigation={"no"}
      >
        <div className={styles.vendor}>
          <section className={styles.vendor_header}>
            <Banner
              href={"#"}
              image={VendorDetailBanner}
              isStaticBanner={"no"}
            />
            <section className={styles.vendor_bannerCard}>
              <div className={"ms-0" + styles.breadCrumbWrapper}>
                <BreadCrumbComponent
                  breadcrumbs={breadCrumbs}
                  className={"pt-0"}
                />
              </div>
              <div className={styles.detail}>
                <div>
                  <h4>{restaurantDetails?.name}</h4>
                  <p className={styles.list + " " + styles.lightText}>
                    {/* British • Breakfast • Burger • Vegan • Drinks • Nigerian •
                    International • Min. delivery fee {CURRENCIES.NAIRA} 450.0 */}
                  </p>
                </div>
                <div className={styles.storeInfo}>
                  <div>
                    <p
                      className={composeClasses(
                        styles.infoFont,
                        styles.rightBorder
                      )}
                    >
                      Estimated Delivery Time
                    </p>
                    <small className={styles.lightText}>
                      {restaurantDetails?.average_delivery_time}
                    </small>
                  </div>
                  <div className={styles.infoFont}>
                    <small className={styles.ratingText}>4.6</small>
                    (50+ ratings)
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className={styles.vendorMenu}>
            <div className={styles.vendor_subHeader} id="vendor-menu">
              <div className={styles.subCategories}>
                <div className={styles.categoryContainer}> {categoryMenu} </div>
              </div>
              <div className={styles.ordersHeading}>
                <p className={styles.header}>Your Order</p>
              </div>
              <div className={styles.virtual}>&nbsp;</div>
            </div>
          </section>
          <section className={styles.vendor_container}>
            <div className={styles.productList}>
              <div className={styles.listContainer}>{productList}</div>
            </div>
            <div className={styles.orderContainer} id="order-content">
              {orderContent}
            </div>
            <div className={styles.virtual}>&nbsp;</div>
          </section>
          {pageCount > 20 && (
            <div className={styles.paginateWrapper}>
              <PaginationComponent
                onPageChange={onPageChange}
                pageCount={pageCount}
                resetCounterListener={resetCounter}
              />
            </div>
          )}
        </div>
      </BasePageFullLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    AddFoodItemToCart: state.cart.Food,
  };
};

export default connect(mapStateToProps, {
  AddFoodItemCartAction,
  UpdateCartItemQtyAction,
  SetCartToOpenAction,
})(FoodVendorDetail);
