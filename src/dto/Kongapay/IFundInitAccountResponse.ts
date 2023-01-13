import IFundInitAccountRequest from "./IFundInitAccountRequest";

interface IFundInitAccountResponse {
  request_id: string;
  request: IFundInitAccountRequest;
}

export default IFundInitAccountResponse;
