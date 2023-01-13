import RouteModel from "Models/IRouteModel";
import Personal from "../Pages/KBusiness/Personal/personal";
import Sell from "../Pages/KBusiness/SellOnKonga/sell";
import Agent from "../Pages/KBusiness/Agent/agent";
import Merchants from "../Pages/KBusiness/Merchants/merchant";

const kongaBusinessConfig: Array<RouteModel> = [
  {
    path: "/business/personal",
    exact: true,
    auth: false,
    component: Personal,
  },
  {
    path: "/business/sell-on-konga",
    exact: true,
    auth: false,
    component: Sell,
  },
  {
    path: "/business/become-an-agent",
    exact: true,
    auth: false,
    component: Agent,
  },
  {
    path: "/business/merchant",
    exact: true,
    auth: false,
    component: Merchants,
  },
];
export default kongaBusinessConfig;
