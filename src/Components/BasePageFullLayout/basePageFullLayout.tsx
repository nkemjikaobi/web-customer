/* eslint-disable no-console */
import React from "react";
import Footer from "Components/Footer/footer";
import MobileFooter from "Components/MobileFooter/mobileFooter";
import Navigation from "PagesComponents/Navbar/NavbarComponent";
import { composeClasses } from "libs/utils/utils";
import styles from "./basePageFullLayout.module.scss";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Breadcrumb, { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import MobileNav from "Components/MobileNav/mobileNav";

import config from "Configurations/configurations";
import { InstantSearch } from "react-instantsearch-core";
import algoliasearch from "algoliasearch";

/**
 * Base page layout component that wraps other content
 */

interface IProps {
  children: React.ReactNode;
  showNavigation: string;
  hideFooterOnMobile: string;
  flashShow: boolean;
  breadcrumbs?: Array<IBreadcrumbProp>; // array of breadcrumb items
  breadcrumbTitle?: string;
}

const BasePageFullLayout: React.FunctionComponent<IProps> = (props: IProps) => {
  const location = useLocation();

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
  }
  return (
    <InstantSearch
      indexName={config.general.algolia.indexes.mainProductIndex}
      searchClient={searchClient}
    >
      <section className={composeClasses(styles.basePageFullLayout)}>
        {props.showNavigation && (
          <>
            <div className={styles.tabletAndAboveOnly}>
              <Navigation flashShow={props.flashShow} />
            </div>
            <div className={styles.mobileOnly}>
              <MobileNav />
            </div>
          </>
        )}
        {props.showNavigation && props.breadcrumbs && (
          <Breadcrumb
            props={props.breadcrumbs}
            title={props.breadcrumbTitle ?? ""}
          />
        )}

        <div className={composeClasses(styles.pageContentWrapper)}>
          <section className={styles.pageContent}>
            <main className={className} id={"mainContent"}>
              <div>
                {/* <QuickActionsButton
                quickActionsCard={quickActionsCard}
                setQuickActionsCard={setQuickActionsCard}
              /> */}
              </div>
              {props.children}
            </main>

            <div className={styles.tabletAndAboveOnly}>
              <Footer hideFooterOnMobile={props.hideFooterOnMobile} />
            </div>
            <div className={styles.mobileOnly}>
              <MobileFooter />
            </div>
          </section>
        </div>
      </section>
    </InstantSearch>
  );
};

BasePageFullLayout.defaultProps = {
  breadcrumbs: [],
  breadcrumbTitle: "",
};

const mapStateToProps = (state: any) => ({
  component: state.modal.component,
  flashShow: state.flashBanner.show,
});
export default connect(mapStateToProps)(BasePageFullLayout);
