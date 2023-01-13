import ITransfer from "./ITransfer";

interface ITransferDetails {
  transfer: ITransfer;
  bank_name: string;
  charges: number;
  request_id?: string;
}

export default ITransferDetails;
