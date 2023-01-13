import RouteModel from "Models/IRouteModel";
import CustomPageHome from "Pages/CustomPage/Home/CustomPageHome";
import KongaFaq from "Pages/Konga/Faq/faq";
import PayFaq from "Pages/KPay/Faq/kfaq";

const kongaContentConfig: Array<RouteModel> = [
  {
    path: "/faq-konga",
    exact: true,
    auth: false,
    component: KongaFaq,
  },
  {
    path: "/faq-kongapay",
    exact: true,
    auth: false,
    component: PayFaq,
  },
  {
    path: "/content/:pageSlug",
    exact: true,
    auth: false,
    component: CustomPageHome,
  },
];

export default kongaContentConfig;
