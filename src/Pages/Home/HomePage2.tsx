import React, { Fragment, useEffect, useState } from "react";

import ServicesCard from "Components/ServicesCard/servicesCard";
import CategoriesComponentModel from "Models/ComponentModels/Home/CategoriesComponentModel";
import CardListingContainer from "Components/CardListingContainer/cardListingContainer";
import Banner from "Components/Banner/banner";
import SeoText from "Components/SeoText/seoText";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import HomePageData from "Http/Data/HomePage.Data.json";
import styles from "./HomePage.module.scss";
import BannerImg1 from "Assets/images/png/banner1.png";
import BannerImg2 from "Assets/images/png/banner2.png";
import BannerImg3 from "Assets/images/png/banner3.png";
import BannerImage4 from "Assets/images/png/banner4.png";
import { featuredServicesData, servicesData, onlineShoppingData } from "./data";
import ServicesCard2 from "Components/ServicesCard/servicesCard2";
import { connect } from "react-redux";

const services = servicesData.map((e, i) => (
  <div className={styles.socialIcons} key={i}>
    <ServicesCard icon={e.icon} key={i} text={e.text} title={e.title} />
  </div>
));

interface IHomePage {
  kpay: any;
}

const HomePage: React.FunctionComponent<IHomePage> = (
  properties: IHomePage
) => {
  const [Categories, SetCategories]: Array<any> = useState([]);

  useEffect(() => {
    const categories = HomePageData.map((param) => {
      const Products: Array<CategoriesComponentModel> = param.children.map(
        (child: { Title: string; Icon: string }) => {
          const Product: CategoriesComponentModel =
            new CategoriesComponentModel();
          Product.Title = child.Title;
          Product.Icon = child.Icon;
          return Product;
        }
      );
      return { Title: param.Title, Products: Products };
    });

    // initialize Categories on componentDidMount
    SetCategories(categories);
  }, []);

  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.home}>
          <div className={styles.topBanners}>
            <div className={styles.rightSide}>
              <div>
                <Banner href={"#"} image={BannerImg1} isStaticBanner={"no"} />
              </div>
            </div>
            <div className={styles.leftSide}>
              <div>
                <Banner href={"#"} image={BannerImg2} isStaticBanner={"no"} />
              </div>
              <div>
                <Banner href={"#"} image={BannerImg3} isStaticBanner={"no"} />
              </div>
            </div>
          </div>
          <div className={styles.featuredServices}>
            <ServicesCard2
              data={featuredServicesData}
              title={"featured services"}
            />
          </div>
          {/* <div className={styles.featuredServices}>
            <ServicesCard2
              data={rechargeAndPayBillsData}
              title={"reacharge & pay bills"}
            />
          </div> */}
          <div className={styles.banner4}>
            <div>
              <Banner href={"#"} image={BannerImage4} isStaticBanner={"no"} />
            </div>
          </div>
          <div className={styles.featuredServices}>
            <ServicesCard2
              data={onlineShoppingData}
              title={"online shopping"}
            />
          </div>

          <section className={styles.latestDeals}>
            <CardListingContainer
              link={"#"}
              title={"latest Deals"}
              type={"konga"}
            />
          </section>

          <section className={styles.popularRestaurants}>
            <CardListingContainer
              link={"#"}
              title={"popular restaurant"}
              type={"food"}
            />
          </section>
          <section className={styles.flightDeals}>
            <CardListingContainer
              headerText={
                "Find out our cheapest flights for the top flight destinations around the world! "
              }
              link={"#"}
              title={"flight deals"}
              type={"travel"}
            />
          </section>
          {/* <section className={styles.gamingSection}>
            <ServicesCard2 data={gamingData} title={"gaming & vouchers"} />
          </section> */}
          <section className={styles.seoText}>
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
          </section>
          <div className={styles.servicesContent}>{services}</div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: { kpay: any }) => ({ kpay: state.kpay });

export default connect(mapStateToProps, null)(HomePage);
