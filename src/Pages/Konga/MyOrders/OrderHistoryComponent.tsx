import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";

import { composeClasses, transformOrderHistoryArray } from "libs/utils/utils";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import MarketplaceService from "Http/Services/MarketplaceService";
import KongaOnlineOrderHistory from "./OrderHistory/KongaOnlineOrderHistory";
import OrderLayout from "./OrderLayout";
import EmptyOrder from "./EmptyOrder/EmptyOrder";
import ReactPaginate from "react-paginate";
import styles from "./OrderHistoryComponent.module.scss";
import OrderHistorySkeleton from "./OrderHistorySkeleton/OrderHistorySkeleton";

const breadCrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Online Shopping", Url: "/online-shopping" },
  { Text: "Order History", Url: "/online-shopping/my-orders" },
];

interface IProps {
  children: React.ReactNode;
}
const OrderHistoryComponent: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [orderData, setOrderData] = useState<Array<any>>([]);
  const [paginate, setPaginate] = useState<Array<any>>([]);
  const [pagenumber, setPageNumber] = useState<number>(0);
  const [type, setType] = useState(MarketplaceService.STORE_ID);
  const [loadData, setLoadData] = useState<boolean>(true);

  const handleGetOrderHistory = async () => {
    const response = await MarketplaceService.GetOrderHistory(type);
    const paginate = transformOrderHistoryArray(response && response.paginate);
    const data = transformOrderHistoryArray(response && response.data);
    if (response) {
      setLoadData(false);
      setOrderData(data);
      setPaginate(paginate);
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

  const disablePagecount = pageCount - 1;

  const paginatedOrderData =
    orderData && orderData.slice(pagesVisited, pagesVisited + ordersPerPage);
  const changePage = (data: any) => {
    //selected(page we want to move to) is from react-paginate
    setPageNumber(data.selected);
  };

  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hasLocation={true}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <Fragment>
        <OrderLayout active={1}>
          {loadData ? (
            <OrderHistorySkeleton />
          ) : !loadData && orderData.length > 0 ? (
            <KongaOnlineOrderHistory
              orderData={paginatedOrderData}
              paginate={paginate}
            />
          ) : (
            <EmptyOrder />
          )}
          {!orderData && <EmptyOrder />}

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
        </OrderLayout>
      </Fragment>
    </BasePageLayout>
  );
};
export default OrderHistoryComponent;
