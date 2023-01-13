import RouteModel from "Models/IRouteModel";
import FoodHome from "Pages/KFood/FoodHome/foodHome";
import FoodVendors from "Pages/KFood/Vendors/vendors";
import FoodVendorDetail from "Pages/KFood/VendorDetail/vendorDetail";
import ShoppingCart from "Pages/Checkout/ShoppingCart/shoppingCart";

const kongaFoodConfig: Array<RouteModel> = [
  {
    path: "/food/",
    exact: true,
    auth: false,
    component: FoodHome,
  },
  {
    path: "/food/restaurants/:area",
    exact: true,
    auth: false,
    component: FoodVendors,
  },
  {
    path: "/food/restaurant/:vendor_id",
    exact: true,
    auth: false,
    component: FoodVendorDetail,
  },
  {
    path: "/food/checkout/shopping-cart/:store_id",
    exact: true,
    auth: true,
    component: ShoppingCart,
  },
];

export default kongaFoodConfig;
