/* eslint-disable @typescript-eslint/ban-types */
interface IPayViaKongapaySdk {
  hash: string;
  amount: number;
  description: string;
  email: string;
  merchantId: string;
  reference: string;
  phone: string;
  enableFrame?: boolean;
  callback: string;
  customerId: string;
  mode?: string;
  firstname?: string;
  lastname?: string;
  callbackURL?: string;
  selectedChannelIdentifier?: string;
  publicKey?: string;
  showSuccessPage?: number;
}

export default IPayViaKongapaySdk;
