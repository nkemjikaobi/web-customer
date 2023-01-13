import { SHOW_FLASHBANNER } from "Http/Redux/Types/FlashBanner/Types";

export const showFlashBanner = (value: boolean) => {
  return {
    type: SHOW_FLASHBANNER,
    payload: value,
  };
};
export interface IFlashBannerState {
  show: true | false | null;
}
