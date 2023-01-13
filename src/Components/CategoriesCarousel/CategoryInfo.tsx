import React, { useEffect, useState } from "react";
import Image from "Assets/images/svg/allcategories.svg";
import ICategory from "dto/KongaOnline/ICategory";
import { useHistory } from "react-router";
import config from "Configurations/configurations";
import { composeClasses, getSanitizedHtml } from "libs/utils/utils";

import styles from "./categoriesCarousel.module.scss";

interface CProps {
  category?: ICategory;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  SelectCategoryAction?: Function;
}

const CategoryInfo: React.FunctionComponent<CProps> = ({
  category,
  type,
  SelectCategoryAction,
}: CProps) => {
  const [image, setImage] = useState("");
  const history = useHistory();
  const handleClickEvent = (event: any) => {
    event.preventDefault();
    if (SelectCategoryAction !== undefined) {
      SelectCategoryAction(category);
      history.push(`/online-shopping/product-listing/${category?.category_id}`);
    }
  };

  useEffect(() => {
    let mounted = `${config.images.cloudinaryBaseImageUrl}${config.images.categoriesBaseImageUrl}${category?.icon_image}`;

    if (mounted) {
      setImage(`${mounted}`);
    }
    return () => {
      mounted = "";
    };
  }, []);

  return (
    <div
      className={`ms-3 mt-3 ${composeClasses(
        type === "home" ? styles.categoryInfoHome : styles.categoryInfo
      )}`}
      onClick={handleClickEvent}
    >
      <div className={styles.img}>
        <img src={image ? `${image}` : Image} />
      </div>
      <div className={"text-sm"}>
        <div
          className={styles.smallFont}
          dangerouslySetInnerHTML={getSanitizedHtml(category?.name ?? "")}
        />
      </div>
    </div>
  );
};

CategoryInfo.defaultProps = {
  SelectCategoryAction: () => null,
  category: undefined,
  type: undefined,
};

export default CategoryInfo;
