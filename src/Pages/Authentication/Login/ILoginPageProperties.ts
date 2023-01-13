import IMarketplaceCart from "dto/Cart/IMarketplaceCart";

export interface ILoginPageProperties {
  current_cart?: IMarketplaceCart;
  Error: string;
  IsAuthenticated: boolean;
  SignInAction: (
    values: any,
    currentCart: IMarketplaceCart | null
  ) => Promise<void>;
  AuthenticatedUser: boolean;
}
