import IPersonBankAccount from "dto/Authentication/IPersonBankAccount";
import { SELF_WITHDRAW } from "Http/Redux/Types/KPay/Types";

export const SelfWithdrawAction = (payload: IPersonBankAccount | null) => ({
  type: SELF_WITHDRAW,
  payload: payload,
});
