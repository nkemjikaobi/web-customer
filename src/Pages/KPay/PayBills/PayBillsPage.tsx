import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import ListItem from "Components/ListItem";
import Icon from "Components/Icons/icon";
import styles from "./payBillsPage.module.scss";
import { composeClasses } from "libs/utils/utils";
import Icons from "Components/Icons";
import {
  kpayServicesTab,
  benefitsData,
  kpayCategoriesTabs,
} from "Pages/Home/data";
import TransactionDetail from "PagesComponents/Kpay/Transactions/TransactionDetail";
import TransactionService from "Http/Services/TransactionService";
import ILastDayTransaction from "dto/Kongapay/ILastDayTransaction";
import ITransactionsResponse from "dto/Kongapay/ITransactionsResponse";
import { Link } from "react-router-dom";
import AuthService from "Http/Services/AuthService";
import UserService from "Http/Services/UserService";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Pay Bills" },
];

const PayBillsPage: React.FunctionComponent = () => {
  const [activeTabType, setActiveTabType] = useState("");
  const [activeCategoryTab, setActiveCategoryTab] = useState("");
  const [showKpayServices, setShowKpayServices] = useState(false);
  const [transactionToView, setTransactionInView] =
    useState<ILastDayTransaction | null>();
  //To be added when endpoint is available
  const [actUpdateStrip, setActUpdateStrip] = useState<boolean>(false);

  const getTransactions = async (): Promise<ITransactionsResponse | null> =>
    await TransactionService.loadKpayTransactions(10);

  const getWalletBallance = async () => {
    return await UserService.GetWalletBalance();
  };

  useEffect(() => {
    setActiveTabType("billsAndServices");
    //to be added when endpoint is available
    getTransactions().then((trxn: ITransactionsResponse | null) => {
      const transact: ILastDayTransaction | null =
        trxn &&
        trxn.items &&
        TransactionService.filterAndGetLastDayTransactions(trxn.items);
      setTransactionInView(transact);
    });
    getWalletBallance();
    if (!authenticatedUser) {
      setShowKpayServices(false);
    } else {
      setShowKpayServices(true);
    }

    return () => {
      setActiveTabType("");
    };
  }, []);

  useEffect(() => {
    (async () => {
      const person = await UserService.GetUserProfileFromKPay();
      if (person) {
        if (person.kyc_level !== "3") {
          setActUpdateStrip(true);
        }
      }
    })();
  }, []);

  //will be used when endpoint is ready
  const handleCloseStrip = () => {
    setActUpdateStrip(false);
  };

  const authenticatedUser = AuthService.GetLoggedInUser();

  const kpayServices = kpayServicesTab.map((kpayTab, i) => {
    return (
      <div
        className={styles.kpayservices}
        id={kpayTab.tabType}
        key={i}
        onClick={(e) => handleChangeTab(e, kpayTab.tabType)}
      >
        <span
          className={
            kpayTab.tabType === activeTabType
              ? composeClasses(styles.kpayservices, styles.active)
              : ""
          }
        >
          <Icons name={kpayTab.icon} /> {kpayTab.tabLabel}
        </span>
      </div>
    );
  });

  const unauthenticatedScreen = (
    <div className={styles.kpayServicesContainer}>
      <div className={styles.services}>
        <div className={styles.unauthentcatedMessage}>
          <Icon name="lockKpay" />
          <p>
            To use this feature, <br />
            please{" "}
            <Link className={styles.link} to="/login">
              {" "}
              <span>Login</span>
            </Link>{" "}
            to your account
          </p>
        </div>
      </div>
    </div>
  );

  const benefitsList = benefitsData.map((e, i) => {
    return (
      <div className={styles.benefitItem} key={i}>
        <div className={styles.iconWrapper}>
          <Icon name={e.icon} />
        </div>
        <h3>{e.heading}</h3>
        <p>{e.text}</p>
      </div>
    );
  });

  const handleChangeTab = (event: any, tabString: string) => {
    setActiveTabType(tabString);
  };

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        {/* 
        Will be displayed when endpoint is available to check the 
        KYC LEVEL OF CUSTOMER
         */}

        {actUpdateStrip && (
          <div className={styles.actUpgradeStrip}>
            <Icon name="caution" />
            <p>Limited access, Please upgrade your account</p>
            <Link to="/account/kycinfo">
              <span>Upgrade Account</span>
            </Link>
            <div onClick={handleCloseStrip} role="button">
              <Icon name="cancelDark" />
            </div>
          </div>
        )}
        <div className={styles.payBillsWrapper}>
          <div className={composeClasses(styles.payBills)}>
            <div className={styles.kpayServicesContainer}>
              <div className={styles.kpayservices}>{kpayServices}</div>
              {activeTabType === "billsAndServices" && (
                <div>
                  {showKpayServices === true ? (
                    <div className={styles.services}>
                      <ul className="list-group">
                        <ListItem
                          icon="kpay/airtime.svg"
                          route="/pay-bills/buy-airtime"
                          text="Airtime"
                        />
                        <ListItem
                          icon="kpay/data-bundle.svg"
                          route="/pay-bills/buy-data"
                          text="Mobile Data"
                        />
                        <ListItem
                          icon="kpay/tv-subscription.svg"
                          route="/pay-bills/cable-tv"
                          text="TV"
                        />
                        <ListItem
                          icon="kpay/internet-services.svg"
                          route="/pay-bills/internet-services"
                          text="Internet"
                        />
                        <ListItem
                          icon="kpay/electricity.svg"
                          route="/pay-bills/electricity"
                          text="Electricity"
                        />
                        {/* <ListItem
                          icon="kpay/e-pin.svg"
                          route="/pay-bills/e-pins"
                          text="E-Pin"
                        /> */}
                        <ListItem
                          icon="/kpay/other-bills.svg"
                          text="Other Bills"
                        />
                      </ul>
                    </div>
                  ) : (
                    unauthenticatedScreen
                  )}
                </div>
              )}
              <div>
                {activeTabType === "payment" && (
                  <div>
                    {showKpayServices === true ? (
                      <div className={styles.kpayServicesContainer}>
                        <div className={styles.services}>
                          <ul className="list-group">
                            <ListItem
                              icon="kpay/payments/fund-wallet.svg"
                              route="/fundwallet"
                              text="Fund Wallet"
                            />
                            <ListItem
                              icon="kpay/payments/send-money.svg"
                              route="/send-money"
                              text="Send Money"
                            />
                            <ListItem
                              icon="kpay/payments/cashout.svg"
                              route="/transfer/selfWithdraw"
                              text="Cashout From Wallet"
                            />
                            <ListItem
                              icon="kpay/payments/pay.svg"
                              route="/pay"
                              text="Pay"
                            />
                          </ul>
                        </div>
                      </div>
                    ) : (
                      unauthenticatedScreen
                    )}
                  </div>
                )}
                {activeTabType === "transaction" && (
                  <div>
                    {showKpayServices === true ? (
                      <div>
                        <div
                          className={styles.transactionNav}
                          id="transactionNav"
                        >
                          <div className={styles.recentLabel}>
                            <label>Recent Transactions</label>
                          </div>
                          <div className={styles.seeAll}>
                            <Link to="/transaction-history">
                              <label>See All</label>
                            </Link>
                          </div>
                        </div>
                        <div
                          className={composeClasses(
                            styles.kpayServicesContainer,
                            styles.kpayServicesContainer2
                          )}
                          id="servicesTab"
                        >
                          <div className={styles.transactionContainer}>
                            {transactionToView ? (
                              <TransactionDetail
                                transaction={transactionToView}
                              />
                            ) : (
                              <Fragment>
                                <p>You have not made any transaction yet.</p>
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      unauthenticatedScreen
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={composeClasses()}>
              <div className={""} />
              <div className={styles.benefits}>
                <h2>Benefits of using KongaPay</h2>
                <div className={styles.benefitsList}>{benefitsList}</div>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps, null)(PayBillsPage);
