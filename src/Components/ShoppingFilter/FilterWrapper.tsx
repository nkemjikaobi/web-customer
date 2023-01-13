/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";

interface IFilterWrapper {
  children: any;
  items: Array<any>;
  renderRightItem: Function;
  clearFilter: Function;
  title: string;
  titleStyle: string;
  ratingSelected: boolean;
}

const FilterWrapper: React.FunctionComponent<IFilterWrapper> = (
  properties: IFilterWrapper
) => {
  const [filterShown, setFilterShown] = useState<boolean>(false);

  const [items, setItems] = useState<Array<any>>([]);
  const [title, setTitle] = useState<string>("");
  const [titleStyle, setTitleStyle] = useState<string>("");
  const [children, setChildren] = useState<any>();
  const [ratingSelected, setRatingSelected] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    if (mounted && properties) {
      properties.items && setItems(properties.items);
      properties.children && setChildren(properties.children);
      properties.title && setTitle(properties.title);
      properties.ratingSelected && setRatingSelected(properties.ratingSelected);
    }

    return () => {
      mounted = false;
    };
  }, [properties]);

  const toggleVisibility = (event: any) => {
    setFilterShown(!filterShown);
  };

  return (
    <Fragment>
      <div onClick={toggleVisibility}>
        <h3>{title}</h3>
        {properties ? (
          <Fragment>
            <div>
              {properties && properties.renderRightItem && (
                <div>{properties.renderRightItem()}</div>
              )}
            </div>
            <div>{properties}</div>
          </Fragment>
        ) : (
          <Fragment />
        )}
      </div>

      <div>{properties && properties.children}</div>
    </Fragment>
  );
};

export default FilterWrapper;
