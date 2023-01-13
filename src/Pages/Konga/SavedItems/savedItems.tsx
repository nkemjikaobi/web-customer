import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import CategoryListingCard from "Components/ProductCard/CategoryListingCard";
import MarketplaceService from "Http/Services/MarketplaceService";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./savedItems.module.scss";
import ReactPaginate from "react-paginate";
import { composeClasses } from "libs/utils/utils";

interface IsavedItem {
  savedListItems: any;
}

const SavedItems: React.FunctionComponent<IsavedItem> = (props: IsavedItem) => {
  const [pagenumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 8;

  const pagesVisited = pagenumber * itemsPerPage;

  const pageCount =
    props.savedListItems &&
    Math.ceil(props.savedListItems.length / itemsPerPage);

  const disablePagecount = pageCount - 1;

  const changePage = (data: any) => {
    //selected(page we want to move to) is from react-paginate
    setPageNumber(data.selected);
  };

  const savedItemsData =
    props.savedListItems &&
    props.savedListItems
      .filter((value: any) => {
        if (value?.product !== null) {
          return value;
        }
      })
      .slice(pagesVisited, pagesVisited + itemsPerPage)
      .map((savedItem: any, key: number) => (
        <div className={styles.items} key={key}>
          <CategoryListingCard
            product={savedItem.product}
            store_id={MarketplaceService.STORE_ID}
          />
        </div>
      ));

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online Shopping", Url: "/online-shopping" },
    { Text: "Saved Items", Url: "/favourites" },
  ];

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hasLocation={true}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.mainWrapper}>
        <div className={styles.main}>
          <div className={styles.container}>{savedItemsData}</div>
          <div className={styles.paginateWrapper}>
            <ReactPaginate
              activeClassName={styles.paginationActive}
              containerClassName={styles.paginationBttns}
              disabledClassName={styles.paginationDisabled}
              marginPagesDisplayed={0}
              nextClassName={composeClasses(
                styles.nextClassName,
                `${pagenumber === disablePagecount && styles.disabled}`
              )}
              nextLabel={"Next"}
              nextLinkClassName={"nextBttn"}
              onPageChange={changePage}
              pageCount={pageCount}
              pageRangeDisplayed={1}
              previousClassName={composeClasses(
                styles.previousClassName,
                `${pagenumber === 0 && styles.disabled}`
              )}
              previousLabel={"Previous"}
              previousLinkClassName={"previousBttn"}
            />
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};

const mapStateToProps = (state: any) => ({
  savedListItems: state?.cart?.SavedList?.items,
});

export default connect(mapStateToProps, null)(SavedItems);
