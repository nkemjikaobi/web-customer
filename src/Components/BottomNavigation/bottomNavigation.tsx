/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "Components/Icons";
import { connect } from "react-redux";
import { PersistUser, SignOutAction } from "Http/Redux/Actions/AuthAction";
import AuthService from "Http/Services/AuthService";
import styles from "./bottomNavigation.module.scss";
import { navigationData } from "./data";
import { composeClasses } from "libs/utils/utils";
import SideMenu from "Components/MobileNav/SideMenu/sideMenu";
import Search from "Components/MobileNav/Search/search";

import Cart from "Components/Cart/cart";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import IFoodCart from "dto/Cart/IFoodCart";
import ICartItem from "dto/Cart/ICartItem";
import CartService from "Http/Services/CartService";
import ICartProduct from "dto/Cart/ICartProduct";
import MobilePromos from "Components/MobilePromos/MobilePromos";

interface IIconText {
  icon: string;
  index: number;
  title: string;
  route: string;
  isCart: boolean;
}
interface IBottmNavigation {
  auth: any;
  foodCart?: IFoodCart | null;
  marketplaceCart?: IMarketplaceCart | null;
  PersistUser: Function;
  SignOutAction: Function;
}

const BottomNavigation: React.FunctionComponent<IBottmNavigation> = (
  properties: IBottmNavigation
) => {
  const [active, setActive] = useState(0);
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [ratingCardHidden, setRatingCardHidden] = useState(false);
  const [marketPlaceProducts, setMarketPlaceProducts] = useState<
    Array<ICartProduct>
  >([]);
  const [foodProducts, setFoodProducts] = useState<Array<ICartProduct>>([]);

  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [firstName, setFirstName] = useState<string>("");
  const target = document.getElementById("sidemenu");
  const handleActive = (index: number) => {
    setActive(index);
  };
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
  const handleSideMenuClose = () => {
    target && target?.classList.add(styles.removeSideBar);
    setRatingCardHidden(false);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsAuthenticated(properties.auth.IsAuthenticated);
    }
    return () => {
      mounted = false;
    };
  }, [properties]);

  const IconText = ({ icon, title, index, route, isCart }: IIconText) => {
    return (
      <Fragment>
        <Link to={route} />
        <div
          className={composeClasses(
            styles.btmNavIcon,
            styles.mobileOnly,
            active === index ? styles.active : styles.inActive
          )}
          onClick={() => handleActive(index)}
        >
          {isCart && (
            <div className={styles.badgeCounter}>
              <span>
                {marketPlaceProducts.length > 0 && foodProducts.length > 0
                  ? marketPlaceProducts.length + foodProducts.length
                  : 0}
              </span>
            </div>
          )}

          <Icon name={icon} />
          <p>{title}</p>
        </div>
      </Fragment>
    );
  };
  const navigationList = navigationData.map((e, i) => {
    return (
      <IconText
        icon={e.icon}
        index={i}
        isCart={e.isCart}
        key={e.icon}
        route={e.route}
        title={e.title}
      />
    );
  });

  return (
    <Fragment>
      <div className={styles.bottomNavigation}>{navigationList}</div>
      <div
        className={composeClasses(
          styles.promo,
          active === 1 ? styles.showPromo : styles.hidePromo
        )}
      >
        <div className={styles.promoWrapper}>
          <MobilePromos />
        </div>
      </div>
      <div
        className={composeClasses(
          styles.search,
          active === 2 ? styles.showSearch : styles.hideSearch
        )}
      >
        <Search
          setShowCart={true}
          showHideInputField={true}
          showInputField={true}
        />
      </div>
      <div
        className={composeClasses(
          styles.cart,
          active === 3 ? styles.showCart : styles.hideCart
        )}
      >
        <div className={styles.cartWrapper}>
          <Cart />
        </div>
      </div>
      <div
        className={composeClasses(
          styles.sideMenu,
          active === 4 ? styles.show : styles.hidden
        )}
        id="sidemenu"
      >
        <SideMenu
          className={"sideMenu"}
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
  BottomNavigation
);
