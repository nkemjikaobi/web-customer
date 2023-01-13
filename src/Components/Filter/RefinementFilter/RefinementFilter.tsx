/* eslint-disable @typescript-eslint/ban-types */
import IRefinementFilterResponse from "dto/KongaOnline/IRefinementFilterResponse";
import React, { Fragment, useEffect, useState } from "react";
import { connectRefinementList } from "react-instantsearch-core";

interface IXRefinementFilter {
  items: Array<unknown>;
  indexContextValue?: unknown;
  isFromSearch: boolean;
  attribute: string;
  canRefine: boolean;
  currentRefinement: Array<any>;
  facetOrdering: boolean;
  limit: number;
  operator: string;
  searchable: unknown;
  showMore: boolean;
  showMoreLimit: number;

  refine: Function;
  createUrl: Function;
  searchForItems: Function;
}

const RefinementFilter: React.FunctionComponent<any> = (
  props: IXRefinementFilter
) => {
  const [refinementData, setRefinementData] =
    useState<IRefinementFilterResponse>();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setRefinementData({
        label: props.attribute.split(".").slice(-1)[0],
        count: props.items.length,
      });
    }

    return () => {
      mounted = false;
    };
  }, []);
  // console.log("props: ", props.attribute, props.items);
  return <Fragment />;
};

RefinementFilter.defaultProps = {
  indexContextValue: undefined,
};

export default connectRefinementList(RefinementFilter);
