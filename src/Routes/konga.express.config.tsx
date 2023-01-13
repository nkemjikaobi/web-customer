import SendPackage from "Pages/KExpress/SendPackage/SendPackage";
import ShipNow from "Pages/KExpress/ShipNow/ShipNow";

import RouteModel from "Models/IRouteModel";
import TrackPackagePage from "Pages/KExpress/TrackPackagePage/TrackPackagePage";
import OurLocation from "Pages/KExpress/OurLocation/OurLocation";
import KxpressBusiness from "Components/KxpressBusiness/KxpressBusiness";
const kongaExpressConfig: Array<RouteModel> = [
  {
    path: "/send-package/",
    exact: true,
    auth: false,
    component: SendPackage,
  },
  {
    path: "/send-package/ship-now/",
    exact: true,
    auth: false,
    component: ShipNow,
  },
  {
    path: "/send-package/track-package/",
    exact: true,
    auth: false,
    component: TrackPackagePage,
  },
  {
    path: "/send-package/stores",
    exact: true,
    auth: false,
    component: OurLocation,
  },
  {
    path: "/send-package/our-locations",
    exact: true,
    auth: false,
    component: OurLocation,
  },
  {
    path: "/kxpress",
    exact: true,
    auth: false,
    component: KxpressBusiness,
  },
];

export default kongaExpressConfig;
