import ISearchFilter from "dto/KongaOnline/ISearchFilter";

export const generic_filters: Array<ISearchFilter> = [
  {
    attribute: "attributes.screen_size",
    title: "Screen Size",
  },
  {
    attribute: "attributes.tv_screen_size",
    title: "Screen Size (TV)",
  },
  {
    attribute: "attributes.ram_gb",
    title: "RAM Size",
  },
  {
    attribute: "attributes.sim",
    title: "Sim Type",
  },
  {
    attribute: "attributes.",
    title: "Sim Slot",
  },
  {
    attribute: "attributes.capacity",
    title: "Capacity",
  },
  {
    attribute: "attributes.battery",
    title: "Battery Capacity",
  },
  {
    attribute: "attributes.connectivity",
    title: "Connectivity",
  },
  {
    attribute: "attributes.hard_drive",
    title: "Hard Drive",
  },
  {
    attribute: "attributes.internal",
    title: "Internal Memory",
  },
  {
    attribute: "attributes.operating_system",
    title: "Operating System",
  },
  {
    attribute: "attributes.kids_shoes",
    title: "Babies Shoes",
  },
  {
    attribute: "attributes.heel_type",
    title: "Heel Type",
  },
  {
    attribute: "attributes.heel_height",
    title: "Heel Height",
  },
  {
    attribute: "attributes.leg_width",
    title: "Shoe Fit",
  },
  {
    attribute: "attributes.fastening",
    title: "Fastening",
  },
  {
    attribute: "attributes.mainmaterial",
    title: "Material",
  },
  {
    attribute: "attributes.konga_fulfilment_type",
    title: "Item availability",
  },
  {
    attribute: "attributes.brands",
    title: "Brand",
  },
];

export const color_filters = [
  {
    attribute: "attributes.color",
    title: "Color",
  },
];

export const size_filters = [
  {
    attribute: "attributes.shirt_size",
    title: "Shirt Size",
  },
  {
    attribute: "attributes.shoe_size",
    title: "Shoe Size",
  },
  {
    attribute: "attributes.lingerie_size",
    title: "Lingerie Size",
  },
  {
    attribute: "attributes.pant_size",
    title: "Pant Size",
  },
  {
    attribute: "attributes.size",
    title: "Size",
  },
];

export const shopping_filter = [
  {
    attribute: "is_pay_on_delivery",
    title: "Pay on Delivery",
  },
  {
    attribute: "is_free_shipping",
    title: "Free Shipping",
  },
  {
    attribute: "pickup",
    title: "Pickup Available",
  },
];
