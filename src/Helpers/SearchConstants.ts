import { CURRENCIES } from "Helpers/Constants";

export const filterTypes = {
  single: "SINGLE",
  multiple: "MULTIPLE",
  sort: "SORT",
  menu: "MENU",
  range: "RANGE",
  string: "STRING",
  numeric: "NUMERIC",
  price: "PRICE",
};

export const searchAttributes: any = {
  "attributes.brand": {
    urlKey: "brand",
    filterKey: "attributes.brand",
    type: filterTypes.multiple,
  },
  "attributes.screen_size": {
    urlKey: "screen_size",
    filterKey: "attributes.screen_size",
    type: filterTypes.multiple,
  },
  "attributes.ram_gb": {
    urlKey: "ram_gb",
    filterKey: "attributes.ram_gb",
    type: filterTypes.multiple,
  },
  "attributes.sim": {
    urlKey: "sim",
    filterKey: "attributes.sim",
    type: filterTypes.multiple,
  },
  "attributes.sim_slots": {
    urlKey: "sim_slots",
    filterKey: "attributes.sim_slots",
    type: filterTypes.multiple,
  },
  "attributes.capacity": {
    urlKey: "capacity",
    filterKey: "attributes.capacity",
    type: filterTypes.multiple,
  },
  "attributes.battery": {
    urlKey: "battery",
    filterKey: "attributes.battery",
    type: filterTypes.multiple,
  },
  "attributes.connectivity": {
    urlKey: "connectivity",
    filterKey: "attributes.connectivity",
    type: filterTypes.multiple,
  },
  "attributes.hard_drive": {
    urlKey: "hard_drive",
    filterKey: "attributes.hard_drive",
    type: filterTypes.multiple,
  },
  "attributes.internal": {
    urlKey: "internal",
    filterKey: "attributes.internal",
    type: filterTypes.multiple,
  },
  "attributes.tv_screen_size": {
    urlKey: "tv_screen_size",
    filterKey: "attributes.tv_screen_size",
    type: filterTypes.multiple,
  },
  "attributes.operating_system": {
    urlKey: "operating_system",
    filterKey: "attributes.operating_system",
    type: filterTypes.multiple,
  },
  "attributes.kids_shoes": {
    urlKey: "kids_shoes",
    filterKey: "attributes.kids_shoes",
    type: filterTypes.multiple,
  },
  "attributes.heel_type": {
    urlKey: "heel_type",
    filterKey: "attributes.heel_type",
    type: filterTypes.multiple,
  },
  "attributes.heel_height": {
    urlKey: "heel_height",
    filterKey: "attributes.heel_height",
    type: filterTypes.multiple,
  },
  "attributes.leg_width": {
    urlKey: "leg_width",
    filterKey: "attributes.leg_width",
    type: filterTypes.multiple,
  },
  "attributes.fastening": {
    urlKey: "fastening",
    filterKey: "attributes.fastening",
    type: filterTypes.multiple,
  },
  "attributes.shirt_size": {
    urlKey: "shirt_size",
    filterKey: "attributes.shirt_size",
    type: filterTypes.multiple,
  },
  "attributes.shoe_size": {
    urlKey: "shoe_size",
    filterKey: "attributes.shoe_size",
    type: filterTypes.multiple,
  },
  "attributes.lingerie_size": {
    urlKey: "lingerie_size",
    filterKey: "attributes.lingerie_size",
    type: filterTypes.multiple,
  },
  "attributes.pants_size": {
    urlKey: "pants_size",
    filterKey: "attributes.pants_size",
    type: filterTypes.multiple,
  },
  "attributes.mainmaterial": {
    urlKey: "mainmaterial",
    filterKey: "attributes.mainmaterial",
    type: filterTypes.multiple,
  },
  konga_fulfilment_type: {
    urlKey: "konga_fulfilment_type",
    filterKey: "konga_fulfilment_type",
    type: filterTypes.multiple,
  },
  is_pay_on_delivery: {
    urlKey: "is_pay_on_delivery",
    filterKey: "is_pay_on_delivery",
    type: filterTypes.single,
  },
  is_free_shipping: {
    urlKey: "is_free_shipping",
    filterKey: "is_free_shipping",
    type: filterTypes.single,
  },
  pickup: {
    urlKey: "pickup",
    filterKey: "pickup",
    type: filterTypes.single,
  },
  "category.category_name": {
    urlKey: "category",
    filterKey: "category.category_name",
    type: filterTypes.multiple,
  },
  "attributes.color": {
    urlKey: "color",
    filterKey: "attributes.color",
    type: filterTypes.multiple,
  },
  price: {
    urlKey: "price",
    filterKey: "special_price",
    type: filterTypes.single,
  },
  "attributes.size": {
    urlKey: "size",
    filterKey: "attributes.size",
    type: filterTypes.multiple,
  },
  query: {
    urlKey: "search",
    filterKey: "",
    type: filterTypes.single,
  },
  sortBy: {
    urlKey: "sort",
    filterKey: "",
    type: filterTypes.sort,
  },
  hierarchicalMenu: {
    urlKey: "menu",
    filterKey: "",
    type: filterTypes.menu,
  },
  "category.category_id": {
    urlKey: "category_id",
    filterKey: "category.category_id",
    type: filterTypes.string,
  },
  min: {
    urlKey: "min",
    filterKey: "min",
    type: filterTypes.price,
    operator: ">",
  },
  max: {
    urlKey: "max",
    filterKey: "max",
    type: filterTypes.price,
    operator: "<",
  },
  special_price: {
    urlKey: "special_price",
    filterKey: "",
    type: filterTypes.range,
  },
  "rating.average_rating": {
    urlKey: "rating",
    filterKey: "rating.average_rating",
    type: filterTypes.range,
  },
  is_b2b: {
    urlKey: "is_b2b",
    filterKey: "is_b2b",
    type: filterTypes.single,
  },
};

export const priceArray = [
  {
    label: `Under ${CURRENCIES.NAIRA}2000`,
    min: 0,
    max: 2000,
  },
  {
    label: `${CURRENCIES.NAIRA}2000 - ${CURRENCIES.NAIRA}5000`,
    min: 2000,
    max: 5000,
  },
  {
    label: `${CURRENCIES.NAIRA}5000 - ${CURRENCIES.NAIRA}10000`,
    min: 5000,
    max: 10000,
  },
  {
    label: `${CURRENCIES.NAIRA}10000 - ${CURRENCIES.NAIRA}20000`,
    min: 10000,
    max: 20000,
  },
  {
    label: `${CURRENCIES.NAIRA}20000 - ${CURRENCIES.NAIRA}40000`,
    min: 20000,
    max: 40000,
  },
  {
    label: `Above ${CURRENCIES.NAIRA}40000`,
    min: 40000,
    max: 0,
  },
];
