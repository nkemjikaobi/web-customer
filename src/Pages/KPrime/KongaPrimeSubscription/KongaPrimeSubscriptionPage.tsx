import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import IPrimeProduct from "dto/Prime/IPrimeProduct";
import MarketplaceService from "Http/Services/MarketplaceService";
import PrimeService from "Http/Services/PrimeService";
import { addMonthToDate, isNotEmptyArray, parseDate } from "libs/utils/utils";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./KongaPrimeSubscriptionPage.module.scss";

/**
 * @param {*} props{
 * @param {string} icon This is the icon data
 * @param {string} content This is the content data
 * @param {heading} heading This is the heading data
 * }
 * @returns {div} This returns the KongaPrimeInfoCard
 */
const KongaPrimeSubscriptionPage = (props: any) => {
  const [hasComponentLoaded, setComponentHasLoaded] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<any>({});
  const [primeProducts, setKongaPrimePageData] = useState<any>([]);

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Konga Prime", Url: "/prime/" },
  ];

  useEffect(() => {
    async function fetchCustomerDetails() {
      const customerDetails = await MarketplaceService.GetCustomerDetails();
      setComponentHasLoaded(true);
      setCustomerDetails(customerDetails);
      userSubscriptions();
    }
    fetchCustomerDetails();
  }, []);

  useEffect(() => {
    async function fetchPrimeService() {
      const prime: IPrimeProduct[] = await PrimeService.GetAllPrimeProducts();
      setComponentHasLoaded(true);
      setKongaPrimePageData(prime);
    }
    fetchPrimeService();
  }, []);

  /**
   * Method to return user subscriptions
   * @param {string} product_id product_id
   * @param {string} option_id option_id
   * @returns {*} subscriptions
   */
  const primeDataDetails = (product_id: any, option_id: any) => {
    const product =
      primeProducts &&
      primeProducts.find(
        (product: any) => product.sku === parseInt(product_id)
      );
    const details =
      product &&
      product.custom_options &&
      product.custom_options.values &&
      product.custom_options.values.find(
        (item: any) => item.option_type_id === parseInt(option_id)
      );
    return {
      plan_name: product && product.name,
      ...details,
    };
  };

  const userSubscriptions = () => {
    const { konga_prime_data } = customerDetails || [];
    const subscriptions =
      konga_prime_data &&
      konga_prime_data.map((data: any) => {
        return {
          ...data,
          ...primeDataDetails(data.product_id, data.option_id),
        };
      });

    return subscriptions;
  };

  /**
   * Method to convert duration in days to month
   * @param {string} duration duration in days
   * @returns {*} duration converted to months
   */
  const durationToMonth = (duration: any) => {
    return parseInt(duration) / 30;
  };
  /**
   * Method to display next rewal date
   * @param {string} date in string
   * @param {number} duration in string
   * @returns {*} duration converted to months
   */
  const renderNextRenewal = (date: any, duration: any) => {
    const month = durationToMonth(duration);
    const newDate = addMonthToDate(new Date(date), month);

    return parseDate(newDate);
  };

  const subscriptions = userSubscriptions();
  const planInfo = isNotEmptyArray(subscriptions) ? (
    subscriptions.map((ele: any) => {
      return (
        <tr className={styles.kongaPrimeTableRow} key={ele.option_id}>
          <td className={styles.tableRow__td}>
            {`Konga Prime - ${ele.plan_name}`}
          </td>
          <td className={styles.tableRow__td}>
            {`${durationToMonth(ele.duration)} Months`}
          </td>
          <td className={styles.tableRow__td}>
            {ele.created_at && parseDate(new Date(ele.created_at))}
          </td>
          <td className={styles.tableRow__td}>
            {`${ele.orders_used} of ${ele.orders_available}`}
          </td>
          <td className={styles.tableRow__td}>
            {ele.created_at && renderNextRenewal(ele.created_at, ele.duration)}
          </td>
          <td className={styles.tableRow__td}>
            {ele.price &&
              `${ele.base_currency_code} ${parseInt(ele.price).toFixed(2)}`}
          </td>
        </tr>
      );
    })
  ) : (
    <tr className={styles.kongaPrimeTableRow}>
      <td className={styles.tableRow__td} colSpan={6}>
        <p className={styles.kongaPrimeFallBack__Text}>
          You don’t have any active subscription, subscribe to a Konga Prime
          plan to enjoy free shipping
        </p>
      </td>
    </tr>
  );

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.SubscriptionWrapper}>
          <div className={styles.SubscriptionWrapper__main}>
            {/* <div className={styles.expiredCardWrapper}>
              <div className={styles.expiredCardWrapper__container}>
                <div className={styles.expiredCardWrapper__text}>
                  Your Konga prime subscription is about to expire renew!
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    className={styles.buttonWrapper_subscribeButton}
                    title="
                    Renew subscription"
                  />
                </div>
              </div>
            </div> */}
            <div className={styles.tableWrapper}>
              <p className={styles.tableWrapper__text}>Current Plans</p>
              <div className={styles.tableWrapper__body}>
                <table className={styles.table}>
                  <thead className={styles.tableHead}>
                    <tr>
                      <th className={styles.tableHead__th}>Plan Name</th>
                      <th className={styles.tableHead__th}>
                        Subscription Period
                      </th>
                      <th className={styles.tableHead__th}>Order Count</th>
                      <th className={styles.tableHead__th}>Start Date</th>
                      <th className={styles.tableHead__th}>
                        Next Renewal Date
                      </th>
                      <th className={styles.tableHead__th}>Next Amount</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tableRow}>{planInfo}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default KongaPrimeSubscriptionPage;
