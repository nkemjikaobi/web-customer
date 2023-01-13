/* eslint-disable @typescript-eslint/ban-types */
import { showFlashBanner } from "../ActionCreators/FlashBannerActionCreator/flashBannerActionCreator";

export const showFlashBannerAction =
  (payload: any) =>
  (dispatch: Function): void => {
    return dispatch(showFlashBanner(payload));
  };
