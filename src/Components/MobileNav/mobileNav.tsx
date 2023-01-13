/* eslint-disable @typescript-eslint/ban-types */
import Icon from "Components/Icons";
import React, { Fragment, useEffect, useState } from "react";
import SideMenu from "./SideMenu/sideMenu";
import styles from "./mobileNav.module.scss";
import img from "Assets/images/png/logo.png";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { PersistUser, SignOutAction } from "Http/Redux/Actions/AuthAction";
import AuthService from "Http/Services/AuthService";
import Search from "./Search/search";
import MobileCart from "PagesComponents/Navbar/MobileCart/mobileCart";
import CartService from "Http/Services/CartService";
import IFoodCart from "dto/Cart/IFoodCart";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import ICartProduct from "dto/Cart/ICartProduct";
import ICartItem from "dto/Cart/ICartItem";
import { composeClasses } from "libs/utils/utils";

interface INavbarComponent {
  auth: any;
  foodCart?: IFoodCart | null;
  marketplaceCart?: IMarketplaceCart | null;
  PersistUser: Function;
  SignOutAction: Function;
}

const mobileNav: React.FunctionComponent<INavbarComponent> = (
  properties: INavbarComponent
) => {
  const target = document.getElementById("sidemenu");
  const [ratingCardHidden, setRatingCardHidden] = useState(false);
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [firstName, setFirstName] = useState<string>("");
  const [cartSize, setCartSize] = useState<number>(0);
  const [marketPlaceProducts, setMarketPlaceProducts] = useState<
    Array<ICartProduct>
  >([]);
  const [foodProducts, setFoodProducts] = useState<Array<ICartProduct>>([]);
  const history = useHistory();
  const [showCart, setShowCart] = useState<boolean>(true);
  const [showHideInputField, setShowHideInputField] = useState<boolean>(false);

  useEffect(() => {
    let marketplaceCart = properties.marketplaceCart;
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

    return () => {
      marketplaceCart = null;
    };
  }, [properties]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      properties.PersistUser();
      setAccountBalance(AuthService.GetUserBalance());
      setFirstName(AuthService.GetFirstName());
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsAuthenticated(properties.auth.IsAuthenticated);
    }
    return () => {
      mounted = false;
    };
  }, [properties]);

  const handleSideBarAction = () => {
    target?.classList.remove(styles.removeSideBar);
    target?.classList.add(styles.moveSideBar);
    setRatingCardHidden(true);
  };
  let backdropRef: HTMLDivElement | null;
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    backdropRef: any
  ) => {
    if (event.target && event.target === backdropRef) {
      setRatingCardHidden(false);
      target?.classList.add(styles.removeSideBar);
    }
  };
  const handleSideMenuClose = () => {
    target?.classList.add(styles.removeSideBar);
    setRatingCardHidden(false);
  };

  const handleShowCart = () => {
    setShowCart(false);
  };

  const handleRemoveSearch = () => {
    setShowCart(true);
  };

  const handleShowInputField = () => {
    setShowHideInputField(true);
  };

  const handleHideInputField = () => {
    setShowHideInputField(false);
  };

  return (
    <Fragment>
      <nav className={styles.mobileNav}>
        <div className={styles.left}>
          {location.pathname === "/" ? (
            <Icon name="mobileBurgerMenu" />
          ) : (
            <div onClick={() => history.goBack()}>
              <Icon name="arrowLeft" />
            </div>
          )}
          <div className={styles.logo}>
            <Link to={"/"}>
              <img src={img} />
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <Search
            hideInputField={handleHideInputField}
            setRemoveCart={handleRemoveSearch}
            setShowCart={handleShowCart}
            showHideInputField={showHideInputField}
            showInputField={handleShowInputField}
          />
          {showCart && (
            <MobileCart
              cartSize={
                cartSize + marketPlaceProducts.length + foodProducts.length
              }
            />
          )}
          <div onClick={handleSideBarAction}>
            <Icon name="btmNav-more" />
          </div>
        </div>
      </nav>
      <div>
        <div
          className={ratingCardHidden ? styles.overlay : undefined}
          onClick={(event) => handleBackdropClick(event, backdropRef)}
          ref={(node) => (backdropRef = node)}
        />
      </div>
      <div className={composeClasses(styles.sideMenu)} id="sidemenu">
        <SideMenu
          className={styles.sideMenu2}
          closeSideMenu={handleSideMenuClose}
          firstName={firstName}
          isLoggedIn={IsAuthenticated}
          walletBalance={accountBalance}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  foodCart: state.cart.Food,
  marketplaceCart: state.cart.Marketplace,
});
export default connect(mapStateToProps, { PersistUser, SignOutAction })(
  mobileNav
);
