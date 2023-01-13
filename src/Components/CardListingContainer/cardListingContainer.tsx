/* eslint-disable react/require-default-props */
import React from "react";
import Listingcard from "Components/ProductCard/listingCard";
import ListingCard2 from "Components/ProductCard/listingCard2";
import styles from "./cardListingContainer.module.scss";
import IProductList from "dto/KongaTravel/IProductList";
import TravelCard from "Components/ProductCard/TravelCard/TravelCard";
import { composeClasses } from "libs/utils/utils";
import { whyUsData } from "./data";
import Icon from "Components/Icons/icon";

interface IProps {
  deal?: any;
  title: string;
  link?: string;
  headerText?: string;
  type: string;
}

const data = [1, 2, 3, 4, 5, 6];

const productList = data.map((e) => <Listingcard key={e} />);
const foodProductList = data.map((e) => (
  <ListingCard2
    foodType={"Fast food"}
    key={e}
    percentage={"15"}
    title={"Bungalow Restaurant Ikeja"}
  />
));

const whyUsContent = (
  <div className={styles.whyUsWrapper}>
    {whyUsData.map((data: any, i: number) => (
      <div className={styles.whyUs} key={i}>
        <Icon name={data.icon} />
        <span>{data.title}</span>
        <p>{data.text}</p>
      </div>
    ))}
  </div>
);

const CardListingComponent: React.FunctionComponent<IProps> = ({
  deal,
  title,
  link,
  type,
  headerText,
}) => {
  const data = deal ? deal.length : 0;
  let travelProductList: any;

  if (data && data > 0) {
    travelProductList = deal.map((e: IProductList, i: React.Key) => (
      <TravelCard
        adult_count={e.adult_count}
        child_count={e.child_count}
        class_type={e.class_type}
        date={e.date}
        destination={e.destination}
        direction={e.direction}
        image={e.image}
        infant_count={e.infant_count}
        key={i}
        origin={e.origin}
        price={e.price}
        return_date={e.return_date}
        traveler_number={e.traveler_number}
        traveler_type={e.traveler_type}
      />
    ));
  }

  return (
    <div className={styles.cardListingContainer}>
      <div className={composeClasses(styles.cardListingContainer_Top)}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <hr className={styles.horizontalRule} />
        </div>
        {headerText && <p className={styles.headerText}>{headerText}</p>}
      </div>
      <div className={styles.cardListingContainer_Bottom}>
        {type === "konga"
          ? productList
          : type === "food"
          ? foodProductList
          : type === "why-us"
          ? whyUsContent
          : travelProductList}
      </div>
      <div />
    </div>
  );
};

CardListingComponent.defaultProps = {
  deal: undefined,
  link: "",
  headerText: "",
};
export default CardListingComponent;
