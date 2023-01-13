/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

export interface IPaginationComponent {
  pageCount?: number;
  onPageChange: Function;
  resetCounterListener?: boolean;
}

const PaginationComponent: React.FunctionComponent<IPaginationComponent> = (
  props: IPaginationComponent
) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageRange, setPageRange] = useState<number>(2);

  const onPageChange = (newPage: any) => {
    let pageNumber = 0;

    if (newPage && newPage.selected) {
      pageNumber = newPage.selected;
    }

    setCurrentPage(pageNumber);
    props.onPageChange(pageNumber);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && props.pageCount) {
      setPageCount(props.pageCount);
    }

    if (mounted && props.resetCounterListener) {
      if (props.resetCounterListener === true) {
        setCurrentPage(0);
      }
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        setPageRange(2);
      } else {
        setPageRange(2);
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ReactPaginate
      activeClassName={"active text-white"}
      activeLinkClassName={"active text-white"}
      breakClassName={"break-me"}
      breakLabel={"..."}
      containerClassName={"pagination w-50 mx-auto my-4"}
      disabledClassName={styles.disabled}
      forcePage={currentPage}
      initialPage={0}
      marginPagesDisplayed={2}
      nextClassName={"page-item"}
      nextLabel={"Next"}
      nextLinkClassName={"page-link"}
      onPageChange={onPageChange}
      pageClassName={"page-item"}
      pageCount={pageCount}
      pageLinkClassName={"page-link border-0"}
      pageRangeDisplayed={pageRange}
      previousClassName={"page-item"}
      previousLabel={"Previous"}
      previousLinkClassName={"page-link"}
    />
  );
};

PaginationComponent.defaultProps = {
  pageCount: 0,
  resetCounterListener: false,
};

export default PaginationComponent;
