import ProductDetail from "Pages/Konga/ProductDetail/productDetail";
import Checkout from "Pages/Checkout/checkout";
import ShoppingCart from "Pages/Checkout/ShoppingCart/shoppingCart";
import ProductListing from "Pages/Konga/ProductListing/ProductListing";
import SearchListing from "Pages/Konga/Search/searchListing";
import PayMerchant from "Pages/Konga/PayMerchant/payMerchant";

import KongaLandingPage from "Pages/Konga/LandingPage/landingPage";

import RouteModel from "Models/IRouteModel";
import TransactionSuccessful from "Pages/Konga/Payment/TransactionSuccessful";
import BrandListing from "Pages/Konga/BrandListing/brandListing";
import dealPage from "Pages/Konga/DealPage/dealPage";
import CategoryPage from "Pages/Konga/CategoryPage/CategoryPage";
import CustomPageHome from "Pages/CustomPage/Home/CustomPageHome";
import MerchantStore from "Components/MerchantStore/MerchantStore";
import ProductDetailByUrl from "Pages/Konga/ProductDetail/ProductDetailByUrl";
import OrderDetail from "Pages/Konga/MyOrders/OrderDetail/OrderDetail";
import OrderHistoryComponent from "Pages/Konga/MyOrders/OrderHistoryComponent";
import FoodOrderHistoryComponent from "Pages/Konga/MyOrders/FoodOrderHistoryComponent/FoodOrderHistoryComponent";
import FoodOrderDetail from "Pages/Konga/MyOrders/FoodOrderHistoryComponent/FoodOrderDetail/FoodOrderDetail";
import Recommendations from "Components/Recommendations/Recommendations";

const kongaShoppingConfig: Array<RouteModel> = [
  {
    path: "/online-shopping",
    exact: true,
    auth: false,
    component: KongaLandingPage,
  },
  {
    path: "/online-shopping/pay-merchant",
    exact: true,
    auth: false,
    component: PayMerchant,
  },
  {
    path: "/online-shopping/product/:productUrl",
    exact: true,
    auth: false,
    component: ProductDetailByUrl,
  },
  {
    path: "/online-shopping/product-detail/:category/:product",
    exact: true,
    auth: false,
    component: ProductDetail,
  },
  {
    path: "/online-shopping/checkout/payment/:store_id",
    exact: true,
    auth: true,
    component: Checkout,
  },
  {
    path: "/online-shopping/checkout/shopping-cart/:store_id",
    exact: true,
    auth: false,
    component: ShoppingCart,
  },
  {
    path: "/online-shopping/category/:categoryURL",
    exact: true,
    auth: false,
    component: CategoryPage,
  },
  {
    path: "/online-shopping/product-listing/:category?",
    exact: true,
    auth: false,
    component: ProductListing,
  },
  {
    path: "/online-shopping/cart/successful/:order_number",
    exact: true,
    auth: false,
    component: TransactionSuccessful,
  },
  {
    path: "/online-shopping/search",
    exact: true,
    auth: false,
    component: SearchListing,
  },
  {
    path: "/online-shopping/brand/:brand_name",
    exact: true,
    auth: false,
    component: BrandListing,
  },
  {
    path: "/online-shopping/all-deals",
    exact: true,
    auth: false,
    component: dealPage,
  },
  {
    path: "/online-shopping/deals/daily",
    exact: true,
    auth: false,
    component: dealPage,
  },
  {
    path: "/online-shopping/content/:pageSlug",
    exact: true,
    auth: false,
    component: CustomPageHome,
  },
  {
    path: "/online-shopping/my-orders",
    exact: true,
    auth: false,
    component: OrderHistoryComponent,
  },
  {
    path: "/online-shopping/orderDetail/:orderId",
    exact: true,
    auth: false,
    component: OrderDetail,
  },
  {
    path: "/online-shopping/food-orders",
    exact: true,
    auth: false,
    component: FoodOrderHistoryComponent,
  },
  {
    path: "/online-shopping/food-orders/:orderId",
    exact: true,
    auth: false,
    component: FoodOrderDetail,
  },
  {
    path: "/online-shopping/merchant/:merchantUrlKey",
    exact: true,
    auth: false,
    component: MerchantStore,
  },
  {
    path: "/online-shopping/recommendations",
    exact: true,
    auth: false,
    component: Recommendations,
  },
];

export default kongaShoppingConfig;
