interface ITransfer {
  recipient_id: string;
  amount: number;
  payment_reference: string;
  comment: string;
  bank_id: number;
  account_name: string;
}

export default ITransfer;
