interface IPersonWallet {
  wallet_id: number;
  external_account_no: number;
  internal_account_no: string;
  wallet_status: string;
  amount: number;
  wallet_type_id: number;
  wallet_type_name: string;
  wallet_type_status: string;
  account_type_name: string;
}
export default IPersonWallet;
