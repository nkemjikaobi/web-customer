/* eslint-disable max-len */
import ICartAddress from "dto/Cart/ICartAddress";
import ICartAmount from "dto/Cart/ICartAmount";
import ICartItem from "dto/Cart/ICartItem";
import ICartProduct from "dto/Cart/ICartProduct";
import IFoodCart from "dto/Cart/IFoodCart";
import IPlaceOrder from "dto/Cart/IPlaceOrder";
import IPlaceOrderResult from "dto/Cart/IPlaceOrderResult";
import IUpdateCartItemQty from "dto/Cart/IUpdateCartItemQty";
import IAddress from "dto/KongaOnline/IAddress";
import IOptionAttributeParam from "dto/KongaOnline/IOptionAttributeParam";
import { SUB_TOTAL_FIELD_KEY } from "Helpers/Constants";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import {
  ADD_CUSTOMER_ADDRESS_URL,
  ADD_ITEM_TO_CART_URL,
  APPLY_GIFT_CARD_URL,
  DISABLE_CART_URL,
  EDIT_CUSTOMER_ADDRESS_URL,
  ENABLE_CART_URL,
  GET_CART_URL,
  GET_CUSTOMER_ADDRESSES,
  MERGE_CART_URL,
  PLACE_ORDER_URL,
  REMOVE_ITEM_FROM_CART_URL,
  SET_CART_ADDRESS_URL,
  UPDATE_CART_ITEM_QTY_URL,
} from "Http/Routes/Cart";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import IDeliveryAddressForm from "Models/FormModels/Marketplace/IDeliveryAddressForm";
import IMarketplaceCart from "../../dto/Cart/IMarketplaceCart";
import AuthService from "./AuthService";
import HttpService from "./HttpService";
import MarketplaceService from "./MarketplaceService";

export type CartHolders = IMarketplaceCart | IFoodCart | null | undefined;

class CartService extends HttpService {
  /**
   * Method to add an item to the shopping cart
   * @param form IMarketplaceCartForm
   * @returns cart IMarketplaceCart | null
   */
  public static AddItemToMarketplaceCart = async (
    form: IMarketplaceCartForm,
    store_id: number = MarketplaceService.STORE_ID
  ): Promise<IMarketplaceCart | null> => {
    const headers = await AuthService.SetRequestHeaders(store_id, false, true);
    const options = [];
    if (form && form.options) {
      options.push(`option_id: "${form.options.option_id}"`);
      options.push(`option_type_id: "${form.options.option_type_id}"`);
    }

    let param = `sku: ${form.product?.sku}`;

    if (form && form.cart_id) {
      param = `${param}, cart_id: ${form.cart_id}`;
    }

    param = `${param}, qty: ${form.quantity}, ${options.join(", ")}`;
    if (form && form.attributes && form.attributes.length > 0) {
      const attrs = form.attributes
        .map(
          (attr: IOptionAttributeParam) =>
            `{attribute_id: ${attr.attribute_id}, option_id: ${attr.option_id}}`
        )
        .join(",");
      param = `${param} attributes:[${attrs}]`;
    }

    const ADD_ITEM_TO_CART_QUERY = {
      param: param,
      content:
        "cart_id coupon_code giftcard_codes items{ can_ship fulfilment_type heavy_item_charge products { sku requested_quantity product_id name product_url small_image available_quantity min_sale_qty max_sale_qty price subtotal type weight brand is_konga_prime description pickup allow_installment is_bulk is_backorder is_in_stock allow_pod pickup express_delivery seller { id name url_key } categories { id name url_key position } } } shipping_address{ address_id address_type } amounts{ amount code title } messages",
    };
    let cart: IMarketplaceCart | null = null;
    try {
      const {
        data: {
          data: { addItemToCart },
        },
      } = await axios.post(ADD_ITEM_TO_CART_URL, ADD_ITEM_TO_CART_QUERY, {
        headers,
      });

      cart = {
        id: addItemToCart.cart_id,
        coupon_code: addItemToCart.coupon_code ?? null,
        giftcard_codes: addItemToCart.giftcard_codes ?? null,
        messages: addItemToCart.messages ?? null,
        amounts: addItemToCart.amounts ?? [],
        shipping_address: {
          address_id: addItemToCart.shipping_address.address_id,
          address_type: addItemToCart.shipping_address.address_type,
        },
        items: addItemToCart.items,
      };
    } catch (error: any) {}
    return cart;
  };

  /**
   * Method to get the customer saved addresses
   * @returns result Array<IAddress>
   */
  public static GetCustomerAddresses = async (): Promise<Array<IAddress>> => {
    const headers = await AuthService.SetRequestHeaders(
      MarketplaceService.STORE_ID,
      false,
      true
    );
    let result: Array<IAddress> = [];
    const payload = {
      content:
        "addresses { id firstname lastname is_active telephone country { id name} region { id name } city area { id name} postcode street landmark is_default created_at updated_at}",
    };
    try {
      const {
        data: {
          data: {
            getCustomerAddresses: { addresses },
          },
        },
      } = await axios.post(GET_CUSTOMER_ADDRESSES, payload, {
        headers,
      });
      result = addresses ?? [];
    } catch (error: any) {}
    return result;
  };

  /**
   * Method to edit the customer saved addresses
   * @returns result Array<IAddress>
   */
  public static EditCustomerAddress = async (
    id: number,
    address: IAddress
  ): Promise<Array<IAddress>> => {
    let result: Array<IAddress> = [];
    const payload = {
      param: `id: ${id}, first_name: "${address.firstname}", last_name: "${
        address.lastname
      }", email: "${address.email ?? ""}", phone: "${
        address.telephone
      }", country_code: "NG", street: "${address.street}", city: "${
        address.city
      }", landmark: "${address.landmark}", is_default:false`,
      content:
        "addresses { id firstname lastname is_active telephone country { id } region { id } city area { id } postcode street landmark is_default }",
    };

    if (address.region) {
      payload.param += `, region_id: ${address.region?.id}`;
    }

    if (address.area) {
      payload.param += `, area_id: ${address.area?.id}`;
    }

    const headers = await AuthService.SetRequestHeaders(
      MarketplaceService.STORE_ID,
      false,
      true
    );
    try {
      const {
        data: {
          data: {
            updateCustomerAddress: { addresses },
          },
        },
      } = await axios.post(EDIT_CUSTOMER_ADDRESS_URL, payload, { headers });
      result = addresses;
    } catch (error: any) {}
    return result;
  };

  /**
   * Method to add a customer address to the system
   * @param address IAddress
   * @returns saved boolean
   */
  public static AddCustomerAddress = async (
    address: IAddress
  ): Promise<Array<IAddress>> => {
    let result: Array<IAddress> = [];
    const payload = {
      param: `first_name: "${address.firstname}", last_name: "${
        address.lastname
      }", email: "${address.email ?? ""}", phone: "${
        address.telephone
      }", country_code: "NG", street: "${address.street}", city: "${
        address.city
      }", landmark: "${address.landmark}", is_default:false`,
      content:
        "addresses { id firstname lastname is_active telephone country { id } region { id } city area { id } postcode street landmark is_default }",
    };

    if (address.region) {
      payload.param += `, region_id: ${address.region?.id}`;
    }

    if (address.area) {
      payload.param += `, area_id: ${address.area?.id}`;
    }

    const headers = await AuthService.SetRequestHeaders(
      MarketplaceService.STORE_ID,
      false,
      true
    );
    try {
      const {
        data: {
          data: {
            createCustomerAddress: { addresses },
          },
        },
      } = await axios.post(ADD_CUSTOMER_ADDRESS_URL, payload, { headers });
      result = addresses;
    } catch (error: any) {}
    return result;
  };

  /**
   * Method that converts from IDeliveryAddressForm to IAddress
   * @param addressParam IDeliveryAddress
   * @returns address IAddress
   */
  public static ConvertIDeliveryAddressToIAddress = (
    addressForm: IDeliveryAddressForm
  ): IAddress => {
    return {
      firstname: addressForm.firstName,
      lastname: addressForm.lastName,
      is_default: "false",
      telephone: addressForm.phoneNumber,
      street: addressForm.deliveryAddress,
      city: addressForm.city,
      id: new Date().getTime(),
      is_active: true,
      country: null,
      region: { id: parseInt(addressForm.state), name: addressForm.state },
      area: { id: parseInt(addressForm.lga), name: addressForm.lga },
      postcode: "",
      landmark: "",
    };
  };

  /**
   * Method to place an order
   * @param cart_id number
   * @param payment_code string
   */
  public static PlaceOrder = async (
    order: IPlaceOrder,
    store_id = MarketplaceService.STORE_ID
  ): Promise<IPlaceOrderResult | null> => {
    const headers = await AuthService.SetRequestHeaders(store_id, false, true);
    const payload = {
      param: `cart_id: ${order.cart_id}, payment_code: "${order.payment_code}" use_wallet: false, app_version: "silk_road", source: "silk_road", comment: "${order.comment}"`,
      content:
        "grand_total order_id oid qid kpaygateway { merchant_id hash amount discount { amount channel channel_item } } kongapay { merchant_id hash amount } ",
    };
    let result: IPlaceOrderResult | null = null;
    try {
      const { data } = await axios.post(PLACE_ORDER_URL, payload, {
        headers: headers,
      });
      result = data;
    } catch (error: unknown) {}
    return result;
  };

  /**
   * Method to set the cart address
   * @param payload ICartAddress
   * @returns response boolean
   */
  public static SetCartAddress = async (
    cart: ICartAddress
  ): Promise<boolean> => {
    const headers = await AuthService.SetRequestHeaders(
      MarketplaceService.STORE_ID,
      false,
      true
    );
    let response = false;
    try {
      const payload = {
        param: `cart_id: ${cart.cart_id}, address_id: ${cart.address_id}, address_type: "${cart.address_type}"`,
        content: "ok",
      };
      const {
        data: {
          data: { ok },
        },
      } = await axios.post(SET_CART_ADDRESS_URL, payload, { headers });
      response = ok;
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to get a cart
   * @param cart_id? number
   * @returns cart IMarketplaceCart
   */
  public static GetCart = async (
    cart_id?: number,
    store_id: number = MarketplaceService.STORE_ID
  ): Promise<IMarketplaceCart | null> => {
    let cart: IMarketplaceCart | null = null;
    try {
      const headers = await AuthService.SetRequestHeaders(
        store_id,
        false,
        true
      );
      const payload = {
        param: cart_id ? `(cart_id: ${cart_id})` : "",
        content:
          "cart_id amounts {amount,code,title} coupon_code giftcard_codes items{ can_ship fulfilment_type heavy_item_charge products { sku requested_quantity product_id name product_url small_image available_quantity min_sale_qty max_sale_qty price subtotal type weight brand is_konga_prime description pickup allow_installment is_bulk is_backorder is_in_stock allow_pod pickup express_delivery seller { id name url_key } categories { id name url_key position } } } messages",
      };
      const {
        data: {
          data: { getCart },
        },
      } = await axios.post(GET_CART_URL, payload, { headers });
      if (getCart) cart = getCart;
    } catch (error: any) {}
    return cart;
  };

  /**
   * Method to merge the unauthenticated user's cart
   * to an authenticated user's cart.
   *
   * @param cart_id number
   * @returns cart IMarketplaceCart
   */
  public static MergeCart = async (
    cart_id: number
  ): Promise<IMarketplaceCart | null> => {
    let cart: IMarketplaceCart | null = null;
    try {
      const headers = await AuthService.SetRequestHeaders(
        MarketplaceService.STORE_ID,
        false,
        true
      );
      const payload = {
        cart_id: cart_id,
        content:
          "cart_id coupon_code giftcard_codes items{ can_ship fulfilment_type heavy_item_charge products { sku requested_quantity product_id name product_url small_image available_quantity min_sale_qty max_sale_qty price subtotal type weight brand is_konga_prime description pickup allow_installment is_bulk is_backorder is_in_stock allow_pod pickup express_delivery seller { id name url_key } categories { id name url_key position } } } shipping_address{ address_id address_type } amounts{ amount code title } messages",
      };
      const {
        data: {
          data: { mergeCart },
        },
      } = await axios.post(MERGE_CART_URL, payload, { headers });
      cart = mergeCart;
    } catch (error: any) {}
    return cart;
  };

  /**
   * Method to apply gift card
   * @param giftCard string
   * @param cart_id number
   * @returns done boolean
   */
  public static ApplyGiftCard = async (
    giftCard: string,
    cart_id: number
  ): Promise<boolean> => {
    let done = false;
    try {
      const payload = {
        param: `cart_id: ${cart_id}, coupon_code: "${giftCard}"`,
        content: "ok",
      };
      const headers = await AuthService.SetRequestHeaders(
        MarketplaceService.STORE_ID,
        false,
        true
      );
      const {
        data: {
          data: { ok },
        },
      } = await axios.post(APPLY_GIFT_CARD_URL, payload, { headers });
      done = ok;
    } catch (error: any) {}
    return done;
  };

  /**
   * Method to enable a cart
   * @param cart_id number
   * @param store_id number
   * @returns done boolean
   */
  public static EnableCart = async (
    cart_id: number,
    store_id?: number
  ): Promise<boolean> => {
    let done = false;
    const headers = await AuthService.SetRequestHeaders(store_id, false, true);
    const payload = {
      param: `cart_id: ${cart_id}, store_id: ${store_id}`,
    };
    try {
      await axios.post(ENABLE_CART_URL, payload, { headers });
      done = true;
    } catch (error: any) {}
    return done;
  };

  /**
   * Method to diable a cart
   * @param cart_id number
   * @param store_id number
   * @returns done boolean
   */
  public static DisableCart = async (
    cart_id: number,
    store_id?: number
  ): Promise<boolean> => {
    let done = false;
    const headers = await AuthService.SetRequestHeaders(store_id, false, true);
    const payload = {
      param: `cart_id: ${cart_id}, store_id: ${store_id}`,
    };
    try {
      await axios.post(DISABLE_CART_URL, payload, { headers });
      done = true;
    } catch (error: any) {}
    return done;
  };

  /**
   * Method to extract the subtotal from the cart
   * @param cart: CartHolders
   * @param field: string - the field to query
   * @returns sub_total: number - the extracted sub total
   */
  public static ExtractValuesFromCartAmountsField = (
    cart: CartHolders,
    field = SUB_TOTAL_FIELD_KEY
  ): number => {
    let sub_total = 0;
    if (cart && cart.amounts) {
      const cartAmounts = cart.amounts;
      const cartAmount: ICartAmount | undefined = cartAmounts.find(
        (currentAmount: ICartAmount) =>
          currentAmount.code.toLowerCase().trim() === field.trim().toLowerCase()
      );
      sub_total = cartAmount?.amount ?? 0;
    }
    return sub_total;
  };

  /**
   * Method to extract the products from the provided cart
   * @param cart: CartHolders
   * @returns cart_products: Array<ICartProduct>
   */
  public static ExtractProductsFromCart = (
    cart: CartHolders
  ): Array<ICartProduct> => {
    let cart_products: Array<ICartProduct> = [];
    if (cart && cart.items) {
      cart_products = cart.items
        .map((item: ICartItem) => item.products)
        .flat(2);
    }
    return cart_products;
  };

  /**
   * Method to update the cart
   * @param cart: IUpdateCartItemQty
   * @returns CartHolders
   */
  public static UpdateCartItemQty = async (
    cart: IUpdateCartItemQty,
    store_id: number = MarketplaceService.STORE_ID
  ): Promise<CartHolders> => {
    let response: CartHolders = null;
    const headers = await AuthService.SetRequestHeaders(store_id, false, true);
    const payload = {
      param: `cart_id: ${cart.cart_id}, sku: ${cart.sku}, qty: ${cart.qty}`,
      content:
        "cart_id coupon_code giftcard_codes items{ can_ship fulfilment_type heavy_item_charge products { sku requested_quantity product_id name product_url small_image available_quantity min_sale_qty max_sale_qty price subtotal type weight brand is_konga_prime description pickup allow_installment is_bulk is_backorder is_in_stock allow_pod pickup express_delivery seller { id name url_key } categories { id name url_key position } } } shipping_address{ address_id address_type } amounts{ amount code title } messages",
    };
    try {
      const {
        data: {
          data: { updateCartItemQty },
        },
      } = await axios.post(UPDATE_CART_ITEM_QTY_URL, payload, { headers });
      response = updateCartItemQty;
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to remove a/an item from the shopping cart
   * @param cart_id: number
   * @param sku: number
   * @returns response: CartHolders
   */
  public static RemoveItemFromCart = async (
    cart_id: number,
    sku: number,
    cart_to_update: number
  ): Promise<CartHolders> => {
    let response = null;
    const headers = await AuthService.SetRequestHeaders(
      cart_to_update,
      false,
      true
    );
    const payload = {
      param: `cart_id: ${cart_id}, sku: ${sku}`,
      content:
        "cart_id coupon_code giftcard_codes items{ can_ship fulfilment_type heavy_item_charge products { sku requested_quantity product_id name product_url small_image available_quantity min_sale_qty max_sale_qty price subtotal type weight brand is_konga_prime description pickup allow_installment is_bulk is_backorder is_in_stock allow_pod pickup express_delivery seller { id name url_key } categories { id name url_key position } } } shipping_address{ address_id address_type } amounts{ amount code title } messages",
    };
    try {
      const {
        data: {
          data: { removeItemFromCart },
        },
      } = await axios.post(REMOVE_ITEM_FROM_CART_URL, payload, {
        headers,
      });
      response = removeItemFromCart;
    } catch (error: any) {}
    return response;
  };
}

export default CartService;
