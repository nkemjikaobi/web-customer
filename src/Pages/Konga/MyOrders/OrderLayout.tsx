import React, { Fragment, useEffect, useState } from "react";
import styles from "./OrderLayout.module.scss";
import { composeClasses, transformOrderHistoryArray } from "libs/utils/utils";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Icon from "Components/Icons";
import data from "./OrderHistoryData";
import { Link } from "react-router-dom";

const { onlineShopping, kongaFood } = data;

const breadCrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Online Shopping", Url: "/online-shopping" },
  { Text: "Order History", Url: "/online-shopping/my-orders" },
];

interface IProps {
  children: React.ReactNode;
  active: number;
}
const OrderLayout: React.FunctionComponent<IProps> = (props: IProps) => {
  const [showShoppingDetails, setShowShoppingDetails] =
    useState<boolean>(false);
  const [showFoodDetails, setShowFoodDetails] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (props.active === 1) {
        setShowShoppingDetails(true);
      } else if (props.active === 3) {
        setShowFoodDetails(true);
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  const shoppingInfo = onlineShopping.map((item, i) => {
    return (
      <div className={styles.infoMessage} key={i}>
        <li className={props.active === item.id ? styles.active : ""}>
          <Link to={item.route}>
            <Icon name={item.icon} /> {item.name}
          </Link>
        </li>
      </div>
    );
  });

  const kongaFoodInfo = kongaFood.map((item, i) => {
    return (
      <div className={styles.infoMessage} key={i}>
        <li className={props.active === item.id ? styles.active : ""}>
          <Link to={item.route}>
            <Icon name={item.icon} /> {item.name}
          </Link>
        </li>
      </div>
    );
  });

  const handleShowShoppingDetails = () => {
    setShowShoppingDetails(!showShoppingDetails);
  };

  const handleShowFoodDetails = () => {
    setShowFoodDetails(!showFoodDetails);
    setShowShoppingDetails(false);
  };

  return (
    <Fragment>
      <div className={styles.wrapper1}>
        <div className={styles.accountLayout}>
          <div className={composeClasses(styles.settingsWrapper, styles.hiden)}>
            <div className={styles.heading}>
              <Icon name="bagIcon" />
              <h6>My Orders</h6>
            </div>
            <div className={styles.InfoContainer}>
              <div
                className={styles.Info}
                onClick={() => handleShowShoppingDetails()}
              >
                <div className={styles.InfoLeft}>
                  <p>Online Shopping</p>
                </div>
                <div className={styles.infoIcon}>
                  <Icon
                    name={
                      showShoppingDetails === true ? "arrow-down" : "arrowRight"
                    }
                  />
                </div>
              </div>
              {showShoppingDetails && shoppingInfo}
            </div>
            <div className={styles.InfoContainer}>
              <div
                className={styles.Info}
                onClick={() => handleShowFoodDetails()}
              >
                <div className={styles.InfoLeft}>
                  <p>Konga Food</p>
                </div>
                <div className={styles.infoIcon}>
                  <Icon
                    name={
                      showFoodDetails === true ? "arrow-down" : "arrowRight"
                    }
                  />
                </div>
              </div>
              {showFoodDetails && kongaFoodInfo}
            </div>
            <div className={"pb-5 " + styles.heading}>
              <Icon name="addressBookIcon" />
              <h6>Address Book</h6>
            </div>
          </div>
          <div className={styles.wrapper}>{props.children}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default OrderLayout;
