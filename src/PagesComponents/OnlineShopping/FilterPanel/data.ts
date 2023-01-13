import { CURRENCIES } from "Helpers/Constants";

export const categoriesFilterData = [
  "Men’s Accessories",
  "Men’s Shoes",
  "Men’s Wears",
];
export const priceFilterValues = [
  { max: 2000, min: null },
  { max: 5000, min: 2000 },
  { max: 10000, min: 5000 },
  { max: 20000, min: 10000 },
  { max: 40000, min: 20000 },
  { max: null, min: 40000 },
];

export const priceFilterData = [
  `Under ${CURRENCIES.NAIRA} 2000`,
  `${CURRENCIES.NAIRA} 2000 - ${CURRENCIES.NAIRA} 5000`,
  `${CURRENCIES.NAIRA} 5000 - ${CURRENCIES.NAIRA} 10000`,
  `${CURRENCIES.NAIRA} 10000 - ${CURRENCIES.NAIRA} 20000`,
  `${CURRENCIES.NAIRA} 20000 - ${CURRENCIES.NAIRA} 40000`,
  `Above ${CURRENCIES.NAIRA} 40000`,
];

export const brandsData = [
  "Abercrombie & Fitch",
  "Atmosphere",
  "AWW",
  "Boohoo",
  "Canill",
  "Collection London",
  "H&M",
  "Cotton",
  "Zara",
];

export const itemAvailabilityData = ["In Merchant store", "In Konga Warehouse"];

export const shippingData = ["Free Shipping", "Shipped by merchant"];
