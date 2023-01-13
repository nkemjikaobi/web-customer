import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";

import { transformOrderHistoryArray } from "libs/utils/utils";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import MarketplaceService from "Http/Services/MarketplaceService";
import OrderLayout from "../OrderLayout";
import EmptyOrder from "../EmptyOrder/EmptyOrder";
import ReactPaginate from "react-paginate";
import styles from "../OrderHistoryComponent.module.scss";
import FoodOrderHistory from "./FoodOrderHistory/FoodOrderHistory";

const breadCrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Online Shopping", Url: "/online-shopping" },
  { Text: "Order History", Url: "/online-shopping/my-orders" },
];

interface IProps {
  children: React.ReactNode;
}
const FoodOrderHistoryComponent: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [orderData, setOrderData] = useState<Array<any>>([]);
  const [paginate, setPaginate] = useState<Array<any>>([]);
  const [pagenumber, setPageNumber] = useState<number>(0);

  const handleGetOrderHistory = async () => {
    const response = await MarketplaceService.GetOrderHistory(
      MarketplaceService.FOOD_STORE_ID
    );
    const data = transformOrderHistoryArray(response && response.data);
    if (response && response.data.length > 0) {
      setOrderData(data);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      handleGetOrderHistory();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const ordersPerPage = 5;

  const pagesVisited = pagenumber * ordersPerPage;

  const pageCount = orderData && Math.ceil(orderData.length / ordersPerPage);

  const paginatedOrderData =
    orderData && orderData.slice(pagesVisited, pagesVisited + ordersPerPage);
  const changePage = (data: any) => {
    //selected(page we want to move to) is from react-paginate
    setPageNumber(data.selected);
  };

  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <Fragment>
        <OrderLayout active={3}>
          {orderData.length > 0 ? (
            <FoodOrderHistory
              orderData={paginatedOrderData}
              paginate={paginate}
            />
          ) : (
            <EmptyOrder />
          )}
          <div className={styles.paginateWrapper}>
            <ReactPaginate
              activeClassName={styles.paginationActive}
              containerClassName={styles.paginationBttns}
              disabledClassName={styles.paginationDisabled}
              marginPagesDisplayed={0}
              nextClassName={styles.nextClassName}
              nextLabel={"Next"}
              nextLinkClassName={"nextBttn"}
              onPageChange={changePage}
              pageCount={pageCount}
              pageRangeDisplayed={1}
              previousClassName={styles.previousClassName}
              previousLabel={"Previous"}
              previousLinkClassName={"previousBttn"}
            />
          </div>
        </OrderLayout>
      </Fragment>
    </BasePageLayout>
  );
};
export default FoodOrderHistoryComponent;
