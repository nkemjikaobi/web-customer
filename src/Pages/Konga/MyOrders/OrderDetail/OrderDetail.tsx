import React, { Fragment, useEffect, useState } from "react";
import {
  dateToEpoch,
  formatDate2,
  isNotEmptyArray,
  isObjectEmpty,
} from "libs/utils/utils";
import OrderLayout from "../OrderLayout";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import MarketplaceService from "Http/Services/MarketplaceService";
import { Link, useParams } from "react-router-dom";
import Icon from "Components/Icons";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import styles from "./OrderDetails.module.scss";
import OrderItemCard from "../OrderItemCard/OrderItemCard2";
import constants from "Components/constants";

interface IProps {
  orderData: any;
}

const breadCrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Online Shopping", Url: "/online-shopping" },
  { Text: "Order History", Url: "/online-shopping/my-orders" },
];

const OrderDetail: React.FunctionComponent<IProps> = (props) => {
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const { orderId }: any = useParams();

  const orderDate =
    orderDetails &&
    isNotEmptyArray(orderDetails.items) &&
    orderDetails.items[0] &&
    orderDetails.items[0].created_at.replace(/-/g, "/");
  const dateCreatedEpoch = dateToEpoch(orderDate) + 3600000; //todo remove this fix ( + 3600000) when creation date time zone is corrected on Magento
  const delayBeforeExpire = constants.orderCancellationTimeLimit * 1000;
  const expireTime = dateCreatedEpoch + delayBeforeExpire;
  const currentTime = Date.now();

  let orderIsCancellable = true;
  // TODO add order cancellable condition
  if (expireTime < currentTime) {
    orderIsCancellable = false;
  }

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

  let orderStatusLabel = "";
  let orderStatusLabelStyle = "";

  if (!isObjectEmpty(orderDetails)) {
    const orderStatus = orderDetails && orderDetails.status;
    switch (true) {
      case orderStatus.includes("pending"):
        orderStatusLabel = "Pending";
        orderStatusLabelStyle = styles.pending;
        break;
      case orderStatus.includes("merchant_processing"):
        orderStatusLabel = "Processing";
        orderStatusLabelStyle = styles.processing;
        break;
      case orderStatus.includes("processed"):
        orderStatusLabel = "Processing";
        orderStatusLabelStyle = styles.processing;
        break;
      case orderStatus.includes("verified"):
        orderStatusLabel = "Verified";
        orderStatusLabelStyle = styles.verified;
        break;
      case orderStatus.includes("shipped"):
        orderStatusLabel = "Shipped";
        orderStatusLabelStyle = styles.shipped;
        break;
      case orderStatus.includes("complete"):
        orderStatusLabel = "Delivered";
        orderStatusLabelStyle = styles.delivered;
        break;
      case orderStatus.includes("canceled"):
        orderStatusLabel = "Cancelled";
        orderStatusLabelStyle = styles.cancelled;
        break;
      default: {
        orderStatusLabel = "Processing";
        orderStatusLabelStyle = styles.processing;
      }
    }
  }

  const merchantLink: any =
    orderDetails &&
    isNotEmptyArray(orderDetails.order_seller_details) &&
    orderDetails.order_seller_details[0].seller.replace(/\s/g, "-");

  const trackLink = `${constants.kongaTrack.url}?order_number=${orderId}`;
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
                  <Link to={"/online-shopping/my-orders"}>
                    <Icon name="arrowLeft" />
                  </Link>
                  <h1>Order Details</h1>
                </div>
              </div>
              <div className={styles.orderDetail_mainContent}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderInfo_header}>
                    <h2>Order Informations</h2>
                    <a
                      className={styles.shipmentHistory}
                      href={trackLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <p>Track Order</p>
                    </a>
                  </div>
                  <div className={styles.orderInfo_content}>
                    <div className={styles.infoItem}>
                      <p>Order Number</p>
                      <p>{orderId}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <p>Order Date</p>
                      <p>
                        {formatDate2(
                          isNotEmptyArray(orderDetails.items) &&
                            orderDetails.items[0].created_at.replace(/-/g, "/")
                        )}
                      </p>
                    </div>
                    <div className={styles.infoItem}>
                      <p>Sold by</p>
                      <Link to={`/online-shopping/merchant/${merchantLink}`}>
                        <p className={styles.merchantInfo}>
                          {isNotEmptyArray(orderDetails.order_seller_details) &&
                            orderDetails.order_seller_details[0].seller}
                        </p>
                      </Link>
                    </div>
                    <div className={styles.infoItem}>
                      <p>Tracking ID</p>
                      <p>{orderId}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <p>Delivery Fee</p>
                      <p>
                        {accounting.formatMoney(
                          orderDetails && orderDetails.shipping_amount,
                          CURRENCIES.NAIRA
                        )}
                      </p>
                    </div>
                    <div className={styles.infoItem}>
                      <p>Total Amount</p>
                      <p>
                        {accounting.formatMoney(
                          orderDetails && orderDetails.base_grand_total,
                          CURRENCIES.NAIRA
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.itemsOrderd}>
                  <div className={styles.itemsOrderd_header}>
                    <h3>Items Ordered </h3>
                    <p className={orderStatusLabelStyle}>{orderStatusLabel}</p>
                  </div>
                  <div className={styles.itemsOrderd_content}>
                    {isNotEmptyArray(orderDetails.items) &&
                      orderDetails.items.map((item: any, i: number) => {
                        return (
                          <OrderItemCard
                            item={item}
                            key={i}
                            orderId={orderId}
                            orderIsCancellable={orderIsCancellable}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className={styles.bottomInfo}>
                  <div className={styles.bottomInfo_payment}>
                    <div className={styles.header}>
                      <h4>Payment Informations </h4>
                    </div>
                    <div className={styles.content}>
                      <div className={styles.content_item}>
                        <p className={styles.title}>Payment Method</p>
                        <p className={styles.info}>
                          {orderDetails.payment && orderDetails.payment.method}
                        </p>
                      </div>
                      <div className={styles.content_item}>
                        <p className={styles.title}>Payment Details</p>
                        <p className={styles.info}>
                          Items Total:{" "}
                          <span>
                            {accounting.formatMoney(
                              orderDetails && orderDetails.base_grand_total,
                              CURRENCIES.NAIRA
                            )}
                          </span>
                        </p>
                        <p className={styles.info}>
                          Shipping Fee:{" "}
                          <span>
                            {accounting.formatMoney(
                              orderDetails && orderDetails.base_shipping_amount,
                              CURRENCIES.NAIRA
                            )}
                          </span>
                        </p>
                      </div>
                      <div className={styles.content_item}>
                        <p className={styles.title}>
                          Total:{" "}
                          <span>
                            {accounting.formatMoney(
                              orderDetails && orderDetails.base_grand_total,
                              CURRENCIES.NAIRA
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottomInfo_delivery}>
                    <div className={styles.header}>
                      <h5>Delivery Informations </h5>
                    </div>
                    <div className={styles.content}>
                      <div className={styles.content_customer}>
                        <p className={styles.customerName}>
                          {orderDetails &&
                            `${
                              orderDetails.shipping_address &&
                              orderDetails.shipping_address.firstname
                            } ${
                              orderDetails.shipping_address &&
                              orderDetails.shipping_address.lastname
                            }`}
                        </p>
                        <p className={styles.customerAddress}>
                          {orderDetails &&
                            orderDetails.shipping_address &&
                            orderDetails.shipping_address.street}
                        </p>
                        <p className={styles.cutomerNumber}>
                          {(orderDetails &&
                            orderDetails.billing_address &&
                            orderDetails.billing_address.telephone) ||
                            "N/A"}
                        </p>
                      </div>
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

export default OrderDetail;
