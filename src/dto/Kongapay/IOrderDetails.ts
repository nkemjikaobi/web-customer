import IFundInitAccountResponse from "./IFundInitAccountResponse";
import ITransferDetails from "./ITransferDetails";

export interface IOrderDetails {
  phoneNumber: string;
  operator: string;
  amount: number;
  saveBeneficiary?: boolean;
}

export interface IOrderResponseData {
  order_id: string;
  provider_id: string;
  owner: number;
}

export interface IOrderResponse {
  code?: string;
  status: string;
  message?: string;
  data?: IOrderResponseData;
}

export interface WalletReducer {
  FundingInit: IFundInitAccountResponse | null;
}

export interface TransferReducer {
  TransferDetails: ITransferDetails | null;
}
