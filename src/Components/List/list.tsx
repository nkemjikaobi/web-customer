/* eslint-disable max-len */
import React from "react";
import { composeClasses, isNotEmptyArray } from "libs/utils/utils";
import styles from "./list.module.scss";

export interface IProps {
  fourColumn: boolean;
  fourColumnShrunk: boolean;
  wrapperClassName: string;
  horizontal: boolean;
  items: any;
  itemClassName: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderItem: Function;
  isPromoCard: boolean;
  isStatic: boolean;
  isMobile: boolean;
  isTablet: boolean;
}
const List: React.FunctionComponent<IProps> = ({
  fourColumn,
  fourColumnShrunk,
  wrapperClassName,
  horizontal,
  items,
  itemClassName,
  renderItem,
  isPromoCard,
  isStatic,
  isMobile,
  isTablet,
}) => {
  // Prevent list from rendering empty
  if (!isNotEmptyArray(items)) return null;
  return (
    <section
      className={composeClasses(
        styles.listContainer,
        wrapperClassName,
        isPromoCard ? styles.promoCardWrapper : " ",
        isMobile ? styles.mobileOnly : " ",
        isTablet ? styles.tabletAndAboveOnly : " "
      )}
    >
      <section>
        {
          <ul
            className={composeClasses(
              styles.list,
              fourColumn ? styles.fourColumn : " ",
              fourColumnShrunk ? styles.fourColumnShrunk : " ",
              horizontal ? styles.horizontalContainer : " "
            )}
          >
            {isNotEmptyArray(items) &&
              items.map((item: any, index: any) => (
                <li
                  className={composeClasses(
                    styles.listItem,
                    isStatic ? styles.staticListItem : " ",
                    itemClassName
                  )}
                  key={
                    item.sku ||
                    item.product_id ||
                    item.id ||
                    item.objectID ||
                    index
                  }
                >
                  {renderItem(item)}
                </li>
              ))}
          </ul>
        }
      </section>
    </section>
  );
};

export default List;
