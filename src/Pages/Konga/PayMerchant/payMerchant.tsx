import React from "react";
import Button from "Components/Button/button";
import Icon from "Components/Icons/icon";
import MerchantInfoCard from "./MerchantInfoCard/merchantInfoCard";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Input from "Components/Form/inputs/Input/Input";
import Select from "Components/Form/inputs/Select/Select";
import styles from "./payMerchant.module.scss";
import SeoText from "Components/SeoText/seoText";
import { CURRENCIES } from "Helpers/Constants";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Pay" },
];
const PayMerchant: React.FunctionComponent = () => {
  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.payMerchant}>
        <div className={styles.payMerchant_Form}>
          <form>
            <Input
              label={`Enter amount to send (${CURRENCIES.NAIRA})`}
              type="number"
            />
            <Input label="Merchant ID" type="number" />
            <label htmlFor="textarea"> comment (optional) </label>
            <textarea id="textarea" />
            <div className={styles.button}>
              <Button btnClass={"btn-primary text-white"} title="Continue" />
            </div>
          </form>
        </div>
        <div className={styles.payMerchant_savedBeneficiary}>
          <div className={styles.heading}>
            <h1>Saved Beneficiary </h1>
          </div>
          <div className={styles.content}>
            {/* <div className={styles.info}>
            <Icon name="file" />
            <p>You do not have any saved beneficiary</p>
          </div> */}
            <MerchantInfoCard styles={styles} />
          </div>
        </div>
        <div className={styles.mobileOnly}>
          <SeoText
            text={
              "Konga.com is Nigeria’s number one online Shopping destination" +
              ".We pride ourselves in having everything you could possibly need " +
              "for life and living at the best prices than anywhere else." +
              "Our access to Original Equipment Manufacturers and premium sellers " +
              "gives us a wide range of products at very low prices. Some of our popular " +
              "categories include electronics, mobile phones, computers, fashion, beauty " +
              "products, home and kitchen, Building and construction materials and " +
              "a whole lot more from premium brands. Some of our other categories " +
              "include Food and drinks, automotive and industrial, books, musical " +
              "equipment, babies and kids items, sports and fitness, to mention a few. " +
              "To make your shopping experience swift and memorable, there are also " +
              "added services like gift vouchers, consumer promotion activities " +
              "across different categories and bulk purchases with hassle-free delivery. " +
              "Enjoy free shipping rates for certain products and with the bulk purchase " +
              "option, you can enjoy low shipping rates, discounted prices and flexible " +
              "payment. When you shop on our platform, you can pay with your debit card " +
              "or via KongaPay, which is a convenient and secured payment solution. " +
              "Get the best of lifestyle services online. Don't miss out on the biggest " +
              "sales online which takes place on special dates yearly"
            }
            title={
              "Online Shopping on Konga.com – Nigeria’s Largest Online Mall"
            }
          />
        </div>
      </div>
    </BasePageLayout>
  );
};

export default PayMerchant;
