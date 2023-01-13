import { IFlashBannerState } from "Http/Redux/Actions/ActionCreators/FlashBannerActionCreator/flashBannerActionCreator";
import { SHOW_FLASHBANNER } from "Http/Redux/Types/FlashBanner/Types";

export const FlashBannerInitalState: IFlashBannerState = {
  show: true,
};
const FlashBannerReducer = (
  state: IFlashBannerState = FlashBannerInitalState,
  action: { type: any; payload: any }
): IFlashBannerState => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_FLASHBANNER:
      return { ...state, show: payload };
    default:
      return {
        ...state,
      };
  }
};

export default FlashBannerReducer;
