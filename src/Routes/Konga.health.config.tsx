import RouteModel from "Models/IRouteModel";
import HealthHomePage from "Pages/KHealth/HealthHomePage";
const KongaHealthConfig: Array<RouteModel> = [
  {
    path: "/health/:pageSlug",
    exact: true,
    auth: false,
    component: HealthHomePage,
  },
];

export default KongaHealthConfig;
