import RouteModel from "Models/IRouteModel";
import kongaPrimeDetail from "Pages/KPrime/KongaPrimeDetail/kongaPrimeDetail";
import KongaPrimeSubscriptionPage from "Pages/KPrime/KongaPrimeSubscription/KongaPrimeSubscriptionPage";
import PrimeHome from "Pages/KPrime/PrimeHome/primeHome";

const kongaPrimeConfig: Array<RouteModel> = [
  {
    path: "/konga-prime/",
    exact: true,
    auth: false,
    component: PrimeHome,
  },
  {
    path: "/konga-prime/:kongaPrimeSubscriptionID/:customOptionSku/",
    exact: true,
    auth: false,
    component: kongaPrimeDetail,
  },
  {
    path: "/prime-plan",
    exact: true,
    auth: false,
    component: KongaPrimeSubscriptionPage,
  },
];

export default kongaPrimeConfig;
