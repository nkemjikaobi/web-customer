import React, { Fragment, useEffect, useState } from "react";
import Banner from "Components/Banner/banner";
import SeoText from "Components/SeoText/seoText";
import ProductCard from "Components/ProductCard/listingCard4";
import ServicesCard from "Components/ServicesCard/servicesCard";
import PromoCard from "Components/PromoCards/promoCards";
import List from "Components/List/list";
import PromoAds from "Components/PromoAds/promoAds";
import StripBanner from "Components/StripBanner/stripBanner";
import { CONTENT } from "Helpers/Constants";
import ContentManagementService from "Http/Services/ContentManagementService";
import CategoriesCarousel from "Components/CategoriesCarousel/CategoriesCarousel";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./landingPage.module.scss";
import { servicesData } from "../../Home/data";
import {
  composeClasses,
  isNotEmptyArray,
  normalizePageContent,
  normalizeContentCards,
} from "libs/utils/utils";
import KongaServices from "Components/KongaServices/kongaServices";
import MarketplaceService from "Http/Services/MarketplaceService";
import { range } from "lodash";
import IProduct from "dto/KongaOnline/IProduct";
import RecommendationProductCard, {
  RecommendationProductCardTemplate,
} from "Components/ProductCard/RecommendationProductCard";
import CategorySideMenu from "Components/CategoriesSideMenu/categoriesSideMenu";
import ISponsoredProduct from "dto/KongaOnline/ISponsoredProduct";
import Carousel from "Components/Carousel/carousel";
import IDealProduct from "dto/KongaOnline/IDealProduct";
import IDeal from "dto/KongaOnline/IDeal";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import URLConfigurator from "Components/URLConfigurator";
import ICategory from "dto/KongaOnline/ICategory";
import SubCategory from "Components/SubCategoriesSideMenu/subCategoriesSideMenu";
import RecommendationProducts from "Components/ProductCard/RecommendedProducts/RecommendedProducts";
import TodaysDeals from "Components/ProductCard/TodaysDeals/TodaysDeals";
import SponsoredProducts from "Components/ProductCard/SponsoredProducts/SponsoredProducts";
import BestSellingProducts from "Components/ProductCard/BestSellingProducts/BestSellingProducts";
import { Link, useHistory } from "react-router-dom";
import CarouselSkeleton from "./CarouselSkeleton";
import BrandPartnerList from "Components/BrandPartnerList/BrandPartnerList";

const KongaLandingPage: React.FunctionComponent = () => {
  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online-Shopping" },
  ];

  const [kongaHomePageData, setHomeContentData] = useState<any>([]);
  const [ratingCardHidden, setRatingCardHidden] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);

  const [sponsoredProducts, setSponsoredProducts] = useState<
    Array<ISponsoredProduct>
  >([]);

  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<
    Array<IProduct>
  >([]);

  const [recommendedProducts, setRecommendedProducts] =
    useState<Array<IProduct> | null>(null);
  const [bestSellingProducts, setBestSellingProducts] =
    useState<Array<IProduct> | null>(null);

  const [inspiredCartProducts, setInspiredCartProducts] =
    useState<Array<IProduct> | null>(null);

  const [productDeals, setProductDeals] = useState<Array<IDealProduct> | null>(
    null
  );
  const [platformBenefits, setPlatformBenefits] = useState<Array<any>>([]);
  const [brandList, setBrandList] = useState<Array<any>>([]);

  const fetchProductDeals = async () => {
    const deal: IDeal | null = await MarketplaceService.GetDeals();
    if (deal && deal.top_offers) {
      setProductDeals(deal.top_offers);
    }
  };

  const fetchSponsoredProducts = async () => {
    const productsResponse: Array<ISponsoredProduct> =
      await MarketplaceService.GetSponsoredProducts();
    setSponsoredProducts(productsResponse);
  };

  const fetchRecentlyViewedProducts = async () => {
    const productsResponse: Array<IProduct> =
      await MarketplaceService.GetRecentlyViewedProducts();
    setRecentlyViewedProducts(productsResponse);
  };

  const fetchinspiredProductsByCart = async () => {
    const productsResponse: Array<IProduct> =
      await MarketplaceService.GetInspiredByYourCartRecommendation();
    setInspiredCartProducts(productsResponse);
  };

  const fetchBestSellingProducts = async () => {
    const data = await MarketplaceService.GetBestSellingProducts();
    setBestSellingProducts(data);
  };

  const fetchRecommendedProducts = async () => {
    const products = await MarketplaceService.GetRecommendedProducts(
      undefined,
      undefined,
      16
    );
    setRecommendedProducts(products.splice(0, 6));
  };

  const fetchPageContent = async (slug: string) => {
    await ContentManagementService.GetPageContent(slug).then((res) => {
      const normalizedSectionData = normalizePageContent(res, false);

      const platFormBenefits = normalizeContentCards(
        normalizedSectionData.PlatFormBenefits
      );
      const brandList = normalizeContentCards(normalizedSectionData.BrandsList);
      setBrandList(brandList);
      setPlatformBenefits(platFormBenefits);
    });
  };

  const services = platformBenefits.map((e, i) => (
    <div className={styles.socialIcons} key={i}>
      <ServicesCard icon={e.image} text={e.description} title={e.title} />
    </div>
  ));

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // fetch the sponsored products
      fetchSponsoredProducts();

      // fetch the best selling products
      fetchBestSellingProducts();

      // fetch recommended products
      fetchRecommendedProducts();

      // fetch recommended products
      fetchRecentlyViewedProducts();

      // fetch deals
      fetchProductDeals();

      // fet all products inspired by the customer's cart
      fetchinspiredProductsByCart();

      // fetch page content
      fetchPageContent("2-pwahome");
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const kongaHomeSlug = CONTENT.KONGAHOMESLUG;
    async function fetchHomePageContent() {
      // eslint-disable-next-line prettier/prettier
      const contentData = await ContentManagementService.GetPageContent(kongaHomeSlug)
        .then((res) => {
          const normalizedSectionData = normalizePageContent(res, false);
          return {
            carousel: normalizeContentCards(normalizedSectionData.carousel),
            kongaServices: normalizeContentCards(
              normalizedSectionData.kongaServices
            ),
            stripBanners: normalizedSectionData.stripBanners,
            banners: normalizedSectionData.banners,
            carouselAds: normalizeContentCards(
              normalizedSectionData.carouselAds
            ),
            promos: normalizeContentCards(normalizedSectionData.promos),
            brandLogos: normalizeContentCards(normalizedSectionData.brands),
            promoCards: normalizeContentCards(normalizedSectionData.promoCards),
          };
        })
        .catch((err) => null);
      setHomeContentData(contentData);
    }
    fetchHomePageContent();
  }, []);

  const primarySlideDuration = 8000;
  const kongaServiceData = kongaHomePageData.kongaServices;
  const stripBanners = kongaHomePageData.stripBanners;
  const banners = kongaHomePageData.banners;
  const brandLogos = kongaHomePageData.brandLogos;
  const promoCards = kongaHomePageData.promoCards;
  const carouselAds = kongaHomePageData.carouselAds;
  const carouselSlides = kongaHomePageData.carousel;
  const promos = kongaHomePageData.promos;
  const stripsMap =
    isNotEmptyArray(stripBanners) &&
    stripBanners.reduce((acc: any, banner: any) => {
      acc[banner.title] = banner.content;
      return acc;
    }, {});

  const topDesktopBanner = stripsMap.desktopStripOne;
  const topMobileBanner = stripsMap.mobileStripOne;

  const history = useHistory();

  const goToBrandsPage = (link: string) => {
    history.push(`/online-shopping/brand/${link}`);
  };

  const carouselSideAds =
    carouselAds &&
    isNotEmptyArray(carouselAds) &&
    carouselAds.map((e: any, index: any) => {
      return (
        <div className={styles.banner_2} key={index}>
          <Banner href={e.link} image={e.image} isStaticBanner={"no"} />
        </div>
      );
    });

  const renderMainContent = (slide: any) => (
    <img
      alt={slide.alt}
      className={styles.headerImage}
      src={slide.image || slide.filename || slide.background_image_desktop}
    />
  );

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.home}>
        <section className={styles.banner}>
          <div className={styles.banner_1}>
            {carouselSlides ? (
              <Carousel
                arrowClass=""
                autoSlide
                autoSlideDuration={primarySlideDuration}
                customCarouselInlineWrapper=" "
                indicatorActiveClass=""
                indicatorClass=""
                indicatorsComposedClass={styles.headerContainerIndicators}
                indicatorsWrapperClass=""
                isAutoSlide={true}
                itemClass=""
                mode={"fullWidth"}
                renderIndicator=""
                renderSlide={(slide: any) => {
                  const { background_link } = slide;

                  return (
                    <section className={styles.bannerContainer}>
                      {background_link ? (
                        <URLConfigurator to={background_link}>
                          {renderMainContent(slide)}
                        </URLConfigurator>
                      ) : (
                        renderMainContent(slide)
                      )}
                    </section>
                  );
                }}
                showIndicators={true}
                showLeftArrow={true}
                showRightArrow={true}
                slides={carouselSlides}
                wrapperClass={styles.headerContainer}
              />
            ) : (
              <CarouselSkeleton />
            )}
          </div>
          <div className={styles.sideBannerWrappers}>{carouselSideAds}</div>
          <div />
        </section>
        <section className={styles.kongaServices}>
          <KongaServices services={kongaServiceData} />
        </section>
        <section>
          <PromoAds ads={promos} />
        </section>
        <RecommendationProducts recommendedProducts={recommendedProducts} />
        {inspiredCartProducts?.length !== 0 && (
          <section
            className={composeClasses(
              styles.no_scrollbar,
              styles.home_recomendation
            )}
          >
            <div className={styles.heading}>
              <h1>Recommended by cart for you</h1>
            </div>
            <div className={styles.recommendationContentWrapper}>
              <div className={styles.recommendationContent}>
                {inspiredCartProducts === null
                  ? range(7).map((index: number) => (
                      <RecommendationProductCardTemplate key={index} />
                    ))
                  : inspiredCartProducts.map(
                      (product: IProduct, index: number) => {
                        return (
                          <div
                            className={styles.recomendationCardWrapper}
                            key={index}
                          >
                            <RecommendationProductCard product={product} />
                          </div>
                        );
                      }
                    )}
              </div>
            </div>
          </section>
        )}
        <TodaysDeals productDeals={productDeals} />
        <SponsoredProducts sponsoredProducts={sponsoredProducts} />
        {recentlyViewedProducts && recentlyViewedProducts.length > 0 ? (
          <section
            className={composeClasses(
              styles.no_scrollbar,
              styles.home_sponsoredProducts
            )}
          >
            <div className={styles.heading}>
              <h2>Your Browsing History</h2>
            </div>
            <div className={styles.content}>
              {recentlyViewedProducts.map(
                (recentlyViewedProduct: IProduct, index: number) => (
                  <ProductCard key={index} product={recentlyViewedProduct} />
                )
              )}
            </div>
          </section>
        ) : (
          <Fragment />
        )}
        <section className={styles.home_midBanner}>
          {topDesktopBanner && (
            <StripBanner content={topDesktopBanner} isMobile={false} />
          )}
          {/* <Banner href={"#"} image={LongBanner} isStaticBanner={"no"} /> */}
        </section>
        {/* Banners */}
        {isNotEmptyArray(banners) && (
          <section className={styles.lowerBannersWrapper}>
            <section className={styles.lowerBanners}>
              {banners.map((banner: any, index: any) => {
                const image =
                  banner &&
                  banner.content &&
                  banner.content[0] &&
                  banner.content[0].data;
                const alternativeText =
                  banner &&
                  banner.content &&
                  banner.content[1] &&
                  banner.content[1].data;
                let link =
                  banner &&
                  banner.content &&
                  banner.content[2] &&
                  banner.content[2].data;

                const categoryId = link.split("-").slice(-1);
                if (categoryId[0].includes("merchant")) {
                  link = categoryId[0];
                }
                if (
                  categoryId !== undefined &&
                  !categoryId[0].includes("merchant")
                ) {
                  link = "/category/" + categoryId[0];
                }

                return (
                  <div className={styles.homepageBanner} key={banner.id}>
                    <Banner
                      alternativeText={alternativeText}
                      href={link}
                      image={image}
                      isStaticBanner={"no"}
                    />
                  </div>
                );
              })}
            </section>
          </section>
        )}
        <BestSellingProducts bestSellingProducts={bestSellingProducts} />

        {promoCards && isNotEmptyArray(promoCards) && (
          <List
            fourColumn={true}
            fourColumnShrunk={false}
            horizontal
            isMobile={false}
            isPromoCard
            isStatic={true}
            isTablet={true}
            itemClassName=""
            items={promoCards}
            renderItem={(promoCard: any) => {
              const categoryId = promoCard.link.split("-").slice(-1);
              const splitPromos = promoCard.link.split("/");
              const categoryNames = splitPromos[splitPromos.length - 1];
              const splitCategoryNames = categoryNames.split("-");
              splitCategoryNames.pop();
              const category = splitCategoryNames.join(" ");
              let link = "";
              if (categoryId !== undefined) {
                link = "/online-shopping/product-listing/" + categoryId[0];
              }
              return (
                <PromoCard
                  alternativeText={`${promoCard.title}.`}
                  category={category}
                  description={promoCard.description}
                  image={promoCard.image}
                  key={promoCard.id}
                  link={link}
                  title={promoCard.title}
                />
              );
            }}
            wrapperClassName=""
          />
        )}
        <section>
          <BrandPartnerList brandList={brandList} />
        </section>
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
        <div
          className={composeClasses(
            styles.servicesContent,
            styles.tabletAndAboveOnly
          )}
        >
          {services}
        </div>
      </div>
    </BasePageLayout>
  );
};

export default KongaLandingPage;
