import React, { Fragment } from "react";
import { connectHierarchicalMenu } from "react-instantsearch-core";
import FilterWrapper from "./FilterWrapper";

const HierarchicalMenu: React.FunctionComponent<any> = (properties: any) => {
  // return <FilterWrapper
  // items={properties.items}
  // title={"Browse Categories"}>

  // </FilterWrapper>
  return <Fragment />;
};

export default connectHierarchicalMenu(HierarchicalMenu);
