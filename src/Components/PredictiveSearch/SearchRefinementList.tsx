/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { connectRefinementList } from "react-instantsearch-core";

interface ISearchRefinementList {
  items: Array<any>;
  currentRefinement: Array<string>;
  refine: Function;
  isFromSearch: boolean;
  searchForItems: Function;
  createURL: Function;
}

const SearchRefinementList: React.FunctionComponent<any> = (
  parameters: any
) => {
  const propsConverter = (props: any): ISearchRefinementList => props;
  const properties: ISearchRefinementList = propsConverter(parameters);

  return (
    <>
      <ul>
        {properties.items.map((item) => (
          <li key={item.label}>
            <a href="#">
              {item.label} ({item.count})
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default connectRefinementList(SearchRefinementList);
