import { composeClasses } from "libs/utils/utils";
import React from "react";
import styles from "./categoriesCarousel.module.scss";
import Icon from "Components/Icons";

interface IAllCategoriesInfo {
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleClick: Function;
}

const AllCategoriesInfo: React.FunctionComponent<IAllCategoriesInfo> = (
  props: IAllCategoriesInfo
) => {
  const handleClickEvent = (event: any) => {
    event.preventDefault();
    props.handleClick();
  };

  return (
    <div
      className={`ms-3 mt-3 ${composeClasses(styles.categoryInfoHome)}`}
      onClick={handleClickEvent}
    >
      <div className={styles.img}>
        <Icon name="gridRadius" />
      </div>
      <div className={"text-sm"}>
        <div className={styles.smallFont + " text-center"}>All Categories</div>
      </div>
    </div>
  );
};

export default AllCategoriesInfo;
