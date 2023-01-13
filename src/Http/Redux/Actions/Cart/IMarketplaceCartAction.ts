/* eslint-disable @typescript-eslint/ban-types */
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import INotification from "dto/Notification/INotification";
import CartService from "Http/Services/CartService";
import MarketplaceService from "Http/Services/MarketplaceService";
import IErrorMessage from "Models/FormModels/Cart/Marketplace/IErrorMessage";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import {
  IAddToMarketplaceCart,
  AddToMarketplaceCart,
  IShowCartAlert,
  IRemoveCartItems,
} from "../ActionCreators/Cart/MarketPlaceCartCreator";
import {
  NotifyUserActionCreator,
  UnNotifyUserActionCreator,
} from "../ActionCreators/NotificationActionCreator/NotificationActionCreator";

/**
 * Method to add an item to the cart
 * @param form IMarketplaceCartForm
 * @returns Promise<boolean>
 */
export const AddItemToCart =
  (form: IMarketplaceCartForm) =>
  async (dispatch: Function): Promise<boolean> => {
    let response = false;
    try {
      if (form === null) {
        dispatch(AddToMarketplaceCart(null));
        response = true;
      }
      const data: IMarketplaceCart | null =
        await CartService.AddItemToMarketplaceCart(form);
      if (data) {
        dispatch(AddToMarketplaceCart(data));
        ManageCartAlert(form);
        response = true;
      }
    } catch (error: any) {}
    return response;
  };

const ManageAlert = async (
  notification: INotification,
  dispatch: Function
): Promise<void> => {
  await dispatch(NotifyUserActionCreator(notification));
  setTimeout(() => {
    dispatch(UnNotifyUserActionCreator(notification));
  }, 3000);
};

export const ManageCartAlert =
  (
    form?: IMarketplaceCartForm,
    error?: IErrorMessage,
    type?: string,
    title?: string
  ) =>
  async (dispatch: Function): Promise<void> => {
    let notification: INotification | null = null;
    if (form?.product) {
      notification = {
        title: title ?? "Shopping Cart",
        type: NotificationAlertType.Success,
        // eslint-disable-next-line max-len
        body: `<div><p>${form.product.name} has been added to your cart<p></div>`,
        ishtml: true,
        show: true,
      };
    }
    if (error) {
      if (error.message) {
        notification = {
          title: title ?? "Shopping Cart Error",
          type: type ?? NotificationAlertType.Info,
          body: `<div><p>${error.message}<p></div>`,
          ishtml: true,
          show: true,
        };
      }
    }

    notification !== null && ManageAlert(notification, dispatch);
  };

export const LoadCarts =
  () =>
  async (dispatch: Function): Promise<any> => {
    try {
      const marketplaceCart: IMarketplaceCart | null =
        await CartService.GetCart(undefined, MarketplaceService.STORE_ID);
      if (marketplaceCart) {
        dispatch(AddToMarketplaceCart(marketplaceCart));
      }
    } catch (error: any) {}
  };

export const HideCartAlert =
  () =>
  async (dispatch: Function): Promise<void> => {
    const notification: INotification = {
      body: "",
      title: "",
      type: "",
      show: false,
    };
    await dispatch(NotifyUserActionCreator(notification));
  };

export type IMarketplaceCartAction =
  | IAddToMarketplaceCart
  | IShowCartAlert
  | IRemoveCartItems;
