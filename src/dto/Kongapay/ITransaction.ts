interface ITransaction {
  receipt_number: string;
  user_id: string;
  uuid: string;
  first_name: string;
  last_name: string;
  other_name?: string;
  email: string;
  phone: string;
  amount: number;
  closing_balance: number;
  opening_balance: number;
  payment_reference: string;
  channel: string;
  comment?: string;
  service_name: string;
  rate_id?: string;
  service_account_id?: string;
  t_created_at: Date;
  t_updated_at: Date;
  transaction_status: string;
  origin: number;
  destination: number;
  type: string;
  name: string;
  transaction_type_name: string;
  destination_name: string;
  destination_phone: string;
  title: string;
  description: string;
  origin_name: string;
  origin_phone: string;
  payment_media?: string;
  parent_transaction_name?: string;
}

export default ITransaction;
