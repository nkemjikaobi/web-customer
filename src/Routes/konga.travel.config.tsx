import RouteModel from "Models/IRouteModel";
import TravelHome from "../Pages/KTravel/TravelHome/travelHome";
import TravelerInfo from "../Pages/KTravel/TravelerInfo/travelInfo";
import TravelPayment from "../Pages/KTravel/TravelPayment/travelPayment";
import BookingConfirmation from "../Pages/KTravel/BookingConfirmation/bookinConfirmation";
import AdditionalServices from "../Pages/KTravel/AdditionalServices/services";
import BookingSearchResultPage from "Pages/KTravel/BookingResult/bookingSearchResult";
import BookingResult from "Pages/KTravel/BookingResult/bookingResult";
import FailedBooking from "Pages/KTravel/FailedBooking/FailedBooking";
import SuccessfulBooking from "Pages/KTravel/SuccessfulBooking/SuccessfulBooking";

const kongaTravelConfig: Array<RouteModel> = [
  {
    path: "/travel/booking",
    exact: true,
    auth: false,
    component: TravelHome,
  },
  {
    path: "/travel/booking-search-result",
    exact: true,
    auth: false,
    component: BookingSearchResultPage,
  },
  {
    path: "/travel/booking-result",
    exact: true,
    auth: false,
    component: BookingResult,
  },
  {
    path: "/travel/traveler-info",
    exact: true,
    auth: false,
    component: TravelerInfo,
  },
  {
    path: "/travel/travel-payment",
    exact: true,
    auth: false,
    component: TravelPayment,
  },
  {
    path: "/travel/booking-confirmation",
    exact: true,
    auth: false,
    component: BookingConfirmation,
  },
  {
    path: "/travel/services",
    exact: true,
    auth: false,
    component: AdditionalServices,
  },
  {
    path: "/travel/failed-booking",
    exact: true,
    auth: false,
    component: FailedBooking,
  },
  {
    path: "/travel/successful-booking",
    exact: true,
    auth: false,
    component: SuccessfulBooking,
  },
];
export default kongaTravelConfig;
