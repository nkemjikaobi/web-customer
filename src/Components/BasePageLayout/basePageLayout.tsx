/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect, Fragment } from "react";

import Footer from "Components/Footer/footer";
import Navigation from "PagesComponents/Navbar/NavbarComponent";
import {
  composeClasses,
  isNotEmptyArray,
  normalizeCards,
  normalizePageContent,
} from "libs/utils/utils";
import styles from "./basePageLayout.module.scss";
import { useLocation } from "react-router-dom";
import Modal from "Components/Modal/modal";
import Breadcrumb, { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import MobileNav from "Components/MobileNav/mobileNav";
import QuickActionsButton from "Components/QuickActionsButton/quickActionsButton";
import CableSubModal from "Pages/Quicklinks/CableSubModel/cableSubModal";
import BuyDataModal from "Pages/Quicklinks/BuyDataModal/buyDataModal";
import BuyElectricityModal from "Pages/Quicklinks/BuyElectricityModal/buyElectricityModal";
import BuyAirtimeModal from "Pages/Quicklinks/BuyAirtimeModal/buyAirtimeModal";
import { connect } from "react-redux";
import InternetModal from "Pages/Quicklinks/InternetModal/InternetModal";
import RewindButton from "Components/RewindButton/rewindButton";
import algoliasearch from "algoliasearch";
import { showFlashBannerAction } from "Http/Redux/Actions/FlashBannerActions/FlashBannerActions";
import ContentManagementService from "Http/Services/ContentManagementService";
import config from "Configurations/configurations";
import { InstantSearch } from "react-instantsearch-core";
import FlashBanner from "Components/FlashBanner/flashBanner";
import NotificationAlert from "Components/NotificationAlert/NotificationAlert";
import CategoriesCarousel from "Components/CategoriesCarousel/CategoriesCarousel";
import SubCategory from "Components/SubCategoriesSideMenu/subCategoriesSideMenu";
import ICategory from "dto/KongaOnline/ICategory";
import CategorySideMenu from "Components/CategoriesSideMenu/categoriesSideMenu";
import { Toaster } from "react-hot-toast";
import SessionTimeOut from "Components/SessionTimeOut/sessionTimeOut";
/**
 * Base page layout component that wraps other content
 */

interface IProps {
  children?: React.ReactNode;
  hideNavigation: number;
  hideFooterOnMobile?: string;
  showNavigation: string;
  breadCrumbClass?: string;
  breadcrumbs?: Array<IBreadcrumbProp>; // array of breadcrumb items
  breadcrumbTitle?: string;
  component?: string;
  flashShow?: boolean;
  showFlashBannerAction?: Function;
  hasLocation?: boolean;
}
const BasePageLayout: React.FunctionComponent<IProps> = ({
  children,
  showNavigation,
  breadcrumbs,
  breadcrumbTitle,
  breadCrumbClass,
  component,
  flashShow,
  showFlashBannerAction,
  hasLocation,
}) => {
  const [home, setHomeAddress] = useState(false);
  const [flashBanner, setFlashBanner] = useState<any>();
  const location = useLocation();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("mobile");

  const showSwitch = name !== null ? true : false;

  const algoliaClient = algoliasearch(
    config.general.algolia.appID,
    config.general.algolia.apiKey
  );

  const searchClient = {
    search: (requests: any) =>
      requests.some(({ params: { query } }: any) => query !== "")
        ? algoliaClient.search(requests)
        : Promise.resolve({
            results: [{ hits: [] }],
          }),
    searchForFacetValues: algoliaClient.searchForFacetValues,
  };

  let className = styles.pageContentWrapperContainer;
  if (location.pathname === "/") {
    className = styles.homePageContentWrapper;
    useEffect(() => {
      setHomeAddress(true);
      return () => {
        setHomeAddress(false);
      };
    }, []);
  }
  const fetchPageContent = async (slug: string) => {
    await ContentManagementService.GetPageContent(slug)
      .then(normalizePageContent)
      .then((response) => setFlashBanner(response));
  };
  const flashBannerProps: any = [];
  if (
    flashBanner &&
    flashBanner.hasOwnProperty("desktopFlashBanner") &&
    flashBanner.desktopFlashBanner !== null
  ) {
    flashBannerProps.push(flashBanner.desktopFlashBanner[0]);
  }

  if (
    flashBanner &&
    flashBanner.hasOwnProperty("mobileFlashBanner") &&
    flashBanner.mobileFlashBanner !== null
  ) {
    flashBannerProps.push(flashBanner.mobileFlashBanner[0]);
  }
  // Get the flash banner data
  const flashBannerData =
    isNotEmptyArray(flashBannerProps) &&
    flashBannerProps.reduce((acc: any, banner: any) => {
      acc[banner.title] = banner.content;
      return acc;
    }, {});

  const desktopFlashBanner =
    flashBannerData && normalizeCards(flashBannerData.desktopFlashBanner);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchPageContent("2-flash-banner");
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (desktopFlashBanner) {
      showFlashBannerAction && showFlashBannerAction(false);
    }
    return () => {
      showFlashBannerAction && showFlashBannerAction(true);
    };
  }, [flashBanner]);

  const renderModalContent = (component: any) => {
    switch (component) {
      case "buyData":
        return <BuyDataModal />;
      case "buyAirtime":
        return <BuyAirtimeModal />;
      case "buyElectricity":
        return <BuyElectricityModal />;
      case "cableSubscription":
        return <CableSubModal />;
      case "internetService":
        return <InternetModal />;
      default:
        return "";
    }
  };

  const [quickActionsCard, setQuickActionsCard] = useState(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const closePopUp: Function = (visible: boolean) => {
    setShowPopUp(visible);
  };
  const openPopUp: Function = (visible: boolean) => {
    setShowPopUp(visible);
  };
  const [ratingCardHidden, setRatingCardHidden] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);

  let backdropRef: HTMLDivElement | null;
  const target = document.getElementById("menu");
  const target2 = document.getElementById("sub-menu");

  useEffect(() => {
    if (target && target2) {
      target?.classList.remove(styles.moveSideBar);
      target?.classList.add(styles.removeSideBar);

      target2?.classList.remove(styles.addSubCategorySideBar);
      target2?.classList.add(styles.removeSubCategorySideBar);
    }
  }, [target, target2]);
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    backdropRef: any
  ) => {
    if (event.target && event.target === backdropRef) {
      setRatingCardHidden(false);
      target?.classList.remove(styles.moveSideBar);
      target?.classList.add(styles.removeSideBar);

      target2?.classList.remove(styles.addSubCategorySideBar);
      target2?.classList.add(styles.removeSubCategorySideBar);
    }
  };

  const handleSideMenuAction = () => {
    const target = document.getElementById("menu");
    target?.classList.remove(styles.removeSideBar);
    target?.classList.add(styles.moveSideBar);
    setRatingCardHidden(true);
  };

  const handleSubCategories = (event: any, category: ICategory) => {
    setSelectedCategory(category);
    const target = document.getElementById("sub-menu");
    target?.classList.add(styles.addSubCategorySideBar);
    target?.classList.remove(styles.removeSubCategorySideBar);

    const target2 = document.getElementById("menu");
    target2?.classList.add(styles.removeSideBar);
    target2?.classList.remove(styles.moveSideBar);
  };

  const handleHideSubCategories = () => {
    const target = document.getElementById("sub-menu");
    target?.classList.remove(styles.addSubCategorySideBar);
    target?.classList.add(styles.removeSubCategorySideBar);

    const target2 = document.getElementById("menu");
    target2?.classList.remove(styles.removeSideBar);
    target2?.classList.add(styles.moveSideBar);
    setRatingCardHidden(true);
  };

  return (
    <InstantSearch
      indexName={config.general.algolia.indexes.mainProductIndex}
      searchClient={searchClient}
    >
      {/* <SessionTimeOut> */}
      <section className={composeClasses(styles.basePageLayout)}>
        <Toaster position="top-right" />
        {showNavigation && (
          <>
            <div className={styles.tablet2}>
              <div className={styles.flashBanner}>
                {flashBannerProps && isNotEmptyArray(flashBannerProps) && (
                  <FlashBanner
                    content={desktopFlashBanner}
                    customClass=""
                    isMobile={true}
                    // setFlashShow={setFlashShow}
                  />
                )}
              </div>
              <Navigation flashShow={flashShow} />
            </div>
            <div
              className={composeClasses(styles.mobile, styles.fixedMobileNav)}
            >
              {location.pathname !== "/" && <MobileNav />}
            </div>
          </>
        )}
        {location.pathname !== "/" ||
          (showSwitch !== true && (
            <div
              className={composeClasses(
                flashShow ? styles.rewind : styles.rewind2
              )}
            >
              <RewindButton
                closePopUp={closePopUp}
                openPopUp={openPopUp}
                showPopUp={showPopUp}
              />
            </div>
          ))}

        <div className={composeClasses(styles.pageContentWrapper)}>
          <section
            className={composeClasses(
              !flashShow ? styles.pageContent2 : styles.pageContent
            )}
          >
            {showNavigation && breadcrumbs && (
              <div className={styles.breadcrumb}>
                <Breadcrumb
                  breadCrumbClass={breadCrumbClass ?? ""}
                  hasLocation={hasLocation}
                  props={breadcrumbs}
                  title={breadcrumbTitle ?? ""}
                />
              </div>
            )}
            <div className={"mt-0"}>
              <NotificationAlert />
            </div>
            {location.pathname === "/online-shopping" && (
              <>
                <div
                  className={ratingCardHidden ? styles.overlay : undefined}
                  onClick={(event) => handleBackdropClick(event, backdropRef)}
                  ref={(node) => (backdropRef = node)}
                />
                <div className={styles.categorySideMenuWrapper}>
                  <div className={styles.categorySideMenu} id="menu">
                    <CategorySideMenu
                      onOpenSubCategories={handleSubCategories}
                    />
                  </div>

                  <div className={styles.subCategorySideMenu} id="sub-menu">
                    <SubCategory
                      category={selectedCategory}
                      onCloseSubCateogries={handleHideSubCategories}
                      onOpenSubCategories={handleSubCategories}
                    />
                  </div>
                </div>
                <section
                  className={composeClasses(
                    styles.no_scrollbar,
                    styles.categoryCarousel
                  )}
                >
                  <CategoriesCarousel
                    handleClick={() => handleSideMenuAction()}
                  />
                </section>
              </>
            )}
            <main className={composeClasses(className)} id={"mainContent"}>
              <div>
                <QuickActionsButton
                  quickActionsCard={quickActionsCard}
                  setQuickActionsCard={setQuickActionsCard}
                />
              </div>
              <div className={styles.modal}>
                <div className={styles.modalWrapper}>
                  <Modal
                    header="Buy now"
                    onBackdropClick={() => console.log("food")}
                  >
                    {renderModalContent(component)}
                  </Modal>
                </div>
              </div>

              <div className={styles.children}>{children}</div>
            </main>

            <div
              className={composeClasses(
                styles.tablet,
                home ? styles.footerHome : ""
              )}
            >
              <Footer hideFooterOnMobile={"false"} />
            </div>
            {/* <div className={styles.mobile}>
              <MobileFooter hideFooterOnMobile={hideFooterOnMobile} />
            </div> */}
          </section>
        </div>
      </section>
      {/* </SessionTimeOut> */}
    </InstantSearch>
  );
};

BasePageLayout.defaultProps = {
  children: <Fragment />,
  breadCrumbClass: "",
  breadcrumbs: [],
  breadcrumbTitle: "",
  component: "",
  flashShow: false,
  showFlashBannerAction: undefined,
  hideFooterOnMobile: "false",
  hasLocation: false,
};

const mapStateToProps = (state: any) => ({
  component: state.modal.component,
  flashShow: state.flashBanner.show,
});
export default connect(mapStateToProps, { showFlashBannerAction })(
  BasePageLayout
);
