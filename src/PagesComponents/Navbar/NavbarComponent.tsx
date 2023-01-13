/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../../Scss/Custom.scss";
import { CURRENCIES } from "Helpers/Constants";
import {
  PersistUser,
  SignOutAction,
  PopulateCartAction,
} from "Http/Redux/Actions/AuthAction";
import Icon from "Components/Icons/icon";
import AuthService from "Http/Services/AuthService";
import accounting from "accounting";
import { composeClasses } from "libs/utils/utils";
import styles from "./NavbarComponent.module.scss";
import Business from "Components/Business/business";
import FaqsDropDown from "Components/FaqsDropDown/faqsdropdown";
import { updateBodyScroll } from "libs/utils/domUtils";
import PredictiveSearch from "Components/PredictiveSearch/predictiveSearch";
import CustomSearchBox from "Components/CustomSearchBox/customSearchBox";
import useClickOutSide from "CustomHooks/useClickOutSide";
import config from "Configurations/configurations";
import NavItemData from "./NavItemData";
import CartService from "Http/Services/CartService";
import MarketplaceService from "Http/Services/MarketplaceService";
import FoodService from "Http/Services/FoodService";
import {
  AddToMarketplaceCart,
  removeCartItems,
} from "Http/Redux/Actions/ActionCreators/Cart/MarketPlaceCartCreator";
import { useDispatch } from "react-redux";
import { AddToFoodCartActionCreator } from "Http/Redux/Actions/ActionCreators/Cart/FoodCartCreator";
import CartDropdown from "./CartDropdown/CartDropdown";
import ICartProduct from "dto/Cart/ICartProduct";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import IFoodCart from "dto/Cart/IFoodCart";
import ICartItem from "dto/Cart/ICartItem";
import ISavedList from "dto/KongaOnline/ISavedList";
import { GetSavedListItemsAction } from "Http/Redux/Actions/Cart/ICartAction";
import UserService from "Http/Services/UserService";

interface INavbarComponent {
  auth: any;
  foodCart: any;
  marketplaceCart: any;
  GetSavedListItemsAction: Function;
  PersistUser: Function;
  SignOutAction: Function;
  PopulateCartAction: Function;
  flashShow?: any;
}

const NavbarComponent: React.FunctionComponent<INavbarComponent> = (
  properties: INavbarComponent
) => {
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [savedList, setSavedList] = useState<ISavedList>();
  const [firstName, setFirstName] = useState<string>("");
  const [showBusiness, setShowBusiness] = useState<boolean>(false);
  const [showFaqs, setShowFaqs] = useState<boolean>(false);
  const [showAuthMyAccount, setShowAuthMyAccount] = useState<boolean>(false);
  const [showPredictiveSearch, setShowPredictiveSearch] = useState(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [activeDropDown, setActiveDropDown] = useState<number>(0);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [cartSize, setCartSize] = useState<number>(0);
  const [marketPlaceProducts, setMarketPlaceProducts] = useState<
    Array<ICartProduct>
  >([]);
  const [foodProducts, setFoodProducts] = useState<Array<ICartProduct>>([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const checkCart = async () => {
    if (properties.marketplaceCart === null) {
      const cartData = await CartService.GetCart();
      dispatch(AddToMarketplaceCart(cartData));
    }
  };

  const setUserWalletBalance = async () => {
    setAccountBalance(
      (await UserService.GetWalletBalance()) || AuthService.GetUserBalance()
    );
  };

  const getSavedList = async () => {
    try {
      const data = await MarketplaceService.GetSavedList("default");
      properties.GetSavedListItemsAction(data);
    } catch (error: unknown) {}
  };

  const loadCartsData = async (cartId: number, store_id: number) => {
    try {
      const cartData = await CartService.GetCart(cartId, store_id);
      if (cartData?.items && cartData?.items.length) {
        dispatch(AddToMarketplaceCart(cartData));
      }

      if (cartData?.items && cartData?.items.length <= 0) {
        dispatch(removeCartItems());
      }
      properties.PopulateCartAction(cartData);
    } catch (error: unknown) {}
  };

  const loadFoodCartsData = async (cartId: number, store_id: number) => {
    try {
      const cartData = await CartService.GetCart(cartId, store_id);
      if (cartData?.items && cartData?.items.length) {
        dispatch(AddToFoodCartActionCreator(cartData));
      }

      if (cartData === null || cartData?.cart_id === null) {
        dispatch(AddToFoodCartActionCreator(null));
      }
      if (cartData?.items && cartData?.items.length <= 0) {
        dispatch(removeCartItems());
      }
      properties.PopulateCartAction(cartData);
    } catch (error: unknown) {}
  };

  const getCarts = async () => {
    // TODO: load for marketplace and food
    try {
      const cart_id =
        properties.marketplaceCart.id || properties.marketplaceCart.cart_id;
      await loadCartsData(cart_id, MarketplaceService.STORE_ID);
    } catch (error: unknown) {}

    try {
      loadFoodCartsData(
        properties.foodCart.id || properties.foodCart.cart_id,
        FoodService.STORE_ID
      );
    } catch (error: unknown) {}
  };

  const handleFood = () => {
    const marketplaceCart = properties.marketplaceCart;
    if (properties.marketplaceCart?.cart_id) {
      CartService.GetCart(properties.marketplaceCart?.cart_id, 1);
    }
    if (marketplaceCart) {
      if (marketplaceCart.items) {
        setMarketPlaceProducts(
          marketplaceCart.items.map((item: ICartItem) => item.products).flat(2)
        );
      }
    }
    if (properties.foodCart) {
      if (properties.foodCart.items) {
        setFoodProducts(
          properties.foodCart.items
            .map((item: ICartItem) => item.products)
            .flat(2)
        );
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      properties.PersistUser();
      setUserWalletBalance();
      setFirstName(AuthService.GetFirstName());
      getCarts();
      checkCart();
      getSavedList();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      handleFood();
      setUserWalletBalance();
      setIsAuthenticated(properties.auth.IsAuthenticated);
    }

    return () => {
      mounted = false;
    };
  }, [properties]);

  /**
   * Set the Predictive search visibility
   * @param {*} visible [Whether or not to show the search]
   * @returns {undefined}
   */
  const setPredictiveSearchState: Function = (visible: boolean) => {
    if (!showPredictiveSearch && visible) updateBodyScroll(true);
    else if (showPredictiveSearch && !visible) updateBodyScroll(false);

    setShowPredictiveSearch(visible);
  };

  const logoutUser = (event: any) => {
    event.preventDefault();
    properties.SignOutAction(history, pathname);
  };

  const faqDomNode = useClickOutSide(() => {
    setShowFaqs(false);
  });
  const businessDomNode = useClickOutSide(() => {
    setShowBusiness(false);
  });

  const NavItems = NavItemData.map((navElement, i) => {
    return (
      <li key={i}>
        <Link
          className={`${
            navElement.children && "dropdown-toggle"
          } d-flex align-items-center ${styles.standardFont}`}
          onClick={() => {
            setShowDropDown(!showDropDown);
            setActiveDropDown(i);
          }}
          to={navElement.link ? navElement.link : "#"}
        >
          <div className={styles.icon}>
            <Icon name={navElement.icon} />
          </div>
          {navElement.name}
        </Link>
        <ul className={styles.children}>
          {showDropDown &&
            activeDropDown === i &&
            navElement.children &&
            navElement.children.map((e, i) => {
              return (
                <li key={i}>
                  <Link
                    className={
                      "dropdown-item d-flex align-items-center " +
                      styles.standardFont
                    }
                    to={e.link}
                  >
                    <div className={styles.icon}>
                      <Icon name={e.icon} />
                    </div>
                    {e.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </li>
    );
  });

  return (
    <Fragment>
      <nav
        className={composeClasses(
          "navbar navbar-expand-lg navbar-light bg-light",
          properties.flashShow ? styles.navigation2 : styles.navigation
        )}
      >
        <div
          className={composeClasses(
            "container-fluid p-0 d-flex justify-content-between",
            styles.navigation_container
          )}
        >
          <Link className={"navbar-brand mb-0 me-5"} to={"/"}>
            <img
              alt={"Konga Logo"}
              className={"nav-logo"}
              src={config.web.public_url + "/logo.svg"}
            />
          </Link>
          <button
            aria-controls={"navbarScroll"}
            aria-expanded={"false"}
            aria-label={"Toggle navigation"}
            className={"navbar-toggler"}
            data-bs-target={"#navbarScroll"}
            data-bs-toggle={"collapse"}
            type={"button"}
          >
            <span className={"navbar-toggler-icon"} />
          </button>
          <div
            className={composeClasses(
              "collapse navbar-collapse",
              styles.flexBasis
            )}
            id={"navbarScroll"}
          >
            <ul
              className={`navbar-nav my-2 my-lg-0 ${styles.businessContainer}`}
              onMouseLeave={() => setShowBusiness(false)}
            >
              <li className={`nav-item dropdown ${styles.businessList}`}>
                <Link
                  aria-expanded={"false"}
                  className={"nav-link dropdown-toggle " + styles.standardFont}
                  data-bs-toggle={"dropdown"}
                  id={"business-dropdown"}
                  onClick={() => setShowBusiness(!showBusiness)}
                  onMouseEnter={() => setShowBusiness(true)}
                  role={"button"}
                  to={"#"}
                >
                  For Business
                </Link>
                {showBusiness && (
                  <div className={styles.business} ref={businessDomNode}>
                    <Business />
                  </div>
                )}
              </li>
            </ul>

            <div className={"w-50"}>
              <div
                className={composeClasses(
                  "input-group",
                  styles.search,
                  styles.searchWrapper,
                  styles.standardFont
                )}
              >
                <CustomSearchBox
                  isMobileSearch={false}
                  setPredictiveSearchState={setPredictiveSearchState}
                  showHideInputField={true}
                />
                <PredictiveSearch
                  dismissHandler={() => setPredictiveSearchState(false)}
                  show={showPredictiveSearch}
                />
              </div>
            </div>

            <ul className={composeClasses("navbar-nav", styles.ipads)}>
              <div
                className={styles.faqContainer}
                onMouseLeave={() => setShowFaqs(false)}
              >
                <li
                  className={composeClasses(
                    "nav-item dropdown me-0",
                    styles.faqList,
                    styles.standardFont
                  )}
                >
                  <Link
                    aria-expanded={"false"}
                    className={composeClasses(
                      "nav-link dropdown-toggle",
                      styles.standardFont
                    )}
                    data-bs-toggle={"dropdown"}
                    id={"help-dropdown"}
                    onClick={() => setShowFaqs(!showFaqs)}
                    onMouseEnter={() => setShowFaqs(true)}
                    role={"button"}
                    to={"#"}
                  >
                    <img
                      alt={""}
                      className={"icon nav-icon me-1"}
                      src={config.web.public_url + "/icons/Help.svg"}
                    />{" "}
                    Help
                  </Link>
                  {showFaqs && (
                    <div className={styles.faqs} ref={faqDomNode}>
                      <FaqsDropDown />
                    </div>
                  )}
                </li>
              </div>

              {IsAuthenticated === true ? (
                <ul className={styles.myAccountWrapper}>
                  <li
                    className={composeClasses(
                      styles.walletManagerWrapper,
                      "nav-item dropdown"
                    )}
                    onMouseLeave={() => setShowAuthMyAccount(false)}
                  >
                    <Link
                      aria-expanded={"false"}
                      className={composeClasses(
                        styles.standardFont,
                        "nav-link dropdown-toggle"
                      )}
                      data-bs-toggle={"dropdown"}
                      id={"wallet-manager-dropdown"}
                      onClick={() => setShowAuthMyAccount(!showAuthMyAccount)}
                      onMouseEnter={() => setShowAuthMyAccount(true)}
                      role={"button"}
                      to={"#"}
                    >
                      <Icon name="user" />
                      <span>My Account</span>
                    </Link>
                    {showAuthMyAccount && (
                      <ul
                        aria-labelledby={"wallet-manager-dropdown"}
                        className={composeClasses(styles.walletManger)}
                      >
                        <li>
                          <div
                            className={composeClasses(
                              styles.standardFont,
                              styles.firstNameContainer,
                              "dropdown-item"
                            )}
                          >
                            <span
                              className={composeClasses(
                                styles.firstName,
                                "align-items-center"
                              )}
                            >
                              Hi {firstName}
                            </span>
                          </div>
                        </li>
                        <li
                          className={composeClasses(
                            styles.bgColor,
                            "dropdown-item d-flex align-items-center"
                          )}
                        >
                          <span>Wallet Balance</span>
                        </li>

                        <li
                          className={composeClasses(
                            styles.bgColor,
                            styles.balanceWrapper,
                            "dropdown-item d-flex align-items-center"
                          )}
                        >
                          {showBalance ? (
                            <Fragment>
                              <span className={styles.fontBold}>
                                {accounting.formatMoney(
                                  accountBalance,
                                  CURRENCIES.NAIRA
                                )}
                              </span>

                              <div
                                className={styles.balance}
                                onClick={() => setShowBalance(false)}
                              >
                                <Icon name="eyeOff" />
                              </div>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <span>{"************"}</span>
                              <div
                                className={styles.balance}
                                onClick={() => setShowBalance(true)}
                              >
                                <Icon name="eye" />
                              </div>
                            </Fragment>
                          )}
                        </li>
                        <div className={styles.walletItemList}>
                          <ul>
                            {NavItems}
                            <li>
                              <Link
                                className={`"dropdown-toggle"
                                } d-flex align-items-center ${styles.standardFont}`}
                                onClick={(e) => logoutUser(e)}
                                to="#"
                              >
                                <div className={styles.icon}>
                                  <Icon name="signOut" />
                                </div>
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </ul>
                    )}
                  </li>
                </ul>
              ) : (
                <li
                  className={composeClasses("nav-item me-0", styles.paddings)}
                >
                  <Link
                    className={composeClasses(
                      styles.standardFont,
                      "nav-link mt-1"
                    )}
                    role={"button"}
                    to={"/login"}
                  >
                    <img
                      alt={""}
                      className={"icon nav-icon me-1"}
                      src={config.web.public_url + "/icons/User-profile.svg"}
                    />{" "}
                    Sign In / Sign Up
                  </Link>
                </li>
              )}
              <CartDropdown
                cartSize={
                  cartSize + marketPlaceProducts.length + foodProducts.length
                }
              />
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

NavbarComponent.defaultProps = {
  flashShow: undefined,
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  foodCart: state.cart.Food,
  marketplaceCart: state.cart.Marketplace,
});

export default connect(mapStateToProps, {
  PersistUser,
  SignOutAction,
  PopulateCartAction,
  GetSavedListItemsAction,
})(NavbarComponent);
