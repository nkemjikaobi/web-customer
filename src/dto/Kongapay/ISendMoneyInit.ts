interface ISendMoneyInit {
  amount: number;
  group_bank_id: number;
  bank_type: number;
  use_only_otp: number;
}

export default ISendMoneyInit;
