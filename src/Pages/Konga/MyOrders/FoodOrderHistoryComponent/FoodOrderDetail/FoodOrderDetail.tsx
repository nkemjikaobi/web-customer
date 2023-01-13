import React, { Fragment, useEffect, useState } from "react";
import { formatDate2, isNotEmptyArray } from "libs/utils/utils";
import OrderLayout from "../../OrderLayout";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import MarketplaceService from "Http/Services/MarketplaceService";
import { Link, useParams } from "react-router-dom";
import Icon from "Components/Icons";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import styles from "./FoodOrderDetail.module.scss";

interface IProps {
  orderData: any;
}

const breadCrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Online Shopping", Url: "/online-shopping" },
  { Text: "Order History", Url: "/online-shopping/food-orders" },
];

const FoodOrderDetail: React.FunctionComponent<IProps> = (props) => {
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const { orderId }: any = useParams();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      handleGetOrderDetails();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleGetOrderDetails = async () => {
    const response: any = await MarketplaceService.getOrderDetails(orderId);
    setOrderDetails(response);
  };

  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <Fragment>
        <OrderLayout active={1}>
          <div className={styles.accountLayoutContent}>
            <div className={styles.orderDetail}>
              <div className={styles.orderDetail_header}>
                <div className={styles.content}>
                  <Link to={"/online-shopping/food-orders"}>
                    <Icon name="arrowLeft" />
                  </Link>
                  <p>Order Details</p>
                </div>
              </div>
              <div className={styles.orderNumber}>
                <p>Order {orderId}</p>
                <p className={styles.status}>
                  {orderDetails && orderDetails.status}
                </p>
              </div>
              <div className={styles.orderDetail_mainContent}>
                <div className={styles.details}>
                  <div className={styles.restaurantDetails}>
                    <h1>RESTAURANT DETAILS</h1>
                    <p>
                      {isNotEmptyArray(orderDetails.order_seller_details) &&
                        orderDetails.order_seller_details[0].seller}
                    </p>
                    {/* <span>address</span> */}
                  </div>
                  <div className={styles.customerDetails}>
                    <div>
                      <h1>CUSTOMER DETAILS</h1>
                      <p>
                        {orderDetails &&
                          `${
                            orderDetails.shipping_address &&
                            orderDetails.shipping_address.firstname
                          } ${
                            orderDetails.shipping_address &&
                            orderDetails.shipping_address.lastname
                          }`}
                      </p>
                      <span>
                        {(orderDetails &&
                          orderDetails.billing_address &&
                          orderDetails.billing_address.telephone) ||
                          "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.orderedItemDetail}>
                  <div className={styles.delivery}>
                    <div>
                      <h1>DELIVERY ADDRESS</h1> <br />
                      <span>
                        {orderDetails &&
                          orderDetails.shipping_address &&
                          orderDetails.shipping_address.street}
                      </span>
                    </div>
                  </div>
                  <div className={styles.date}>
                    <div>
                      <h1>ORDER DATE</h1> <br />
                      <span>
                        {formatDate2(
                          isNotEmptyArray(orderDetails.items) &&
                            orderDetails.items[0].created_at.replace(/-/g, "/")
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.items}>
                  <h1>MENU ITEM</h1>
                  <div className={styles.itemDetail}>
                    <div>
                      {isNotEmptyArray(orderDetails.items) &&
                        orderDetails.items.map((item: any, i: number) => {
                          return (
                            <div className={styles.item} key={i}>
                              <span>{item.name}</span>
                              <span>
                                {accounting.formatMoney(
                                  item.row_total,
                                  CURRENCIES.NAIRA
                                )}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div>
                      <p>Subtotal</p>
                    </div>
                    <div>
                      <p>
                        {accounting.formatMoney(
                          orderDetails && orderDetails.subtotal,
                          CURRENCIES.NAIRA
                        )}
                      </p>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div>
                      <span>Delivery Fee</span>
                    </div>
                    <div>
                      <span>
                        {accounting.formatMoney(
                          orderDetails && orderDetails.shipping_amount,
                          CURRENCIES.NAIRA
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div>
                      <p>Total</p>
                    </div>
                    <div>
                      <p>
                        {accounting.formatMoney(
                          orderDetails && orderDetails.base_grand_total,
                          CURRENCIES.NAIRA
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OrderLayout>
      </Fragment>
    </BasePageLayout>
  );
};

export default FoodOrderDetail;
