import IPerson from "dto/Authentication/IPerson";
import IPersonBankAccount from "dto/Authentication/IPersonBankAccount";
import ILastDayTransaction from "dto/Kongapay/ILastDayTransaction";
import ITransaction from "dto/Kongapay/ITransaction";
import ITransactionsResponse from "dto/Kongapay/ITransactionsResponse";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import { TRANSACTIONS_URL } from "Http/Routes/Kpay";
import { dateIsToday } from "libs/utils/utils";
import AuthService from "./AuthService";
import HttpService from "./HttpService";
import UserService from "./UserService";

class TransactionService extends HttpService {
  /**
   * Method to fetch the transactions of a customer
   * @param listLimit: number - the limit for fetching
   * @param pageNumber: number - the current page number
   * @returns transactions: Array<ITransaction>
   */
  public static loadKpayTransactions = async (
    listLimit: number,
    pageNumber = 0
  ): Promise<ITransactionsResponse | null> => {
    let transactions: Array<ITransaction> = [];
    const headers = await AuthService.CreateTempHeaders();
    try {
      const {
        data: {
          data: {
            items,
            total_items,
            limit,
            first,
            previous,
            current,
            next,
            last,
          },
        },
      } = await axios.get(TRANSACTIONS_URL, {
        params: { limit: listLimit, page: pageNumber },
        headers: headers,
      });
      transactions = items.map((item: ITransaction) => ({
        ...item,
        t_created_at: new Date(item.t_created_at),
        t_updated_at: new Date(item.t_updated_at),
      }));

      return {
        items: transactions,
        pagination: {
          total_items,
          limit,
          first,
          previous,
          current,
          next,
          last,
        },
      };
    } catch (exception: unknown) {}
    return null;
  };

  /**
   * Method to format the transactions into last date format
   * @param transactions: Array<ITransaction>
   * @param result: Array<ILastDayTransaction>
   * @returns result: Array<ILastDayTransaction>
   */
  public static loadFormattedTransactions = (
    transactions: Array<ITransaction>,
    result: Array<ILastDayTransaction> = []
  ): Array<ILastDayTransaction> => {
    if (transactions.length <= 0) {
      return result;
    }

    const trxns =
      TransactionService.filterAndGetLastDayTransactions(transactions);
    const reminader = transactions.filter(
      (trxn: ITransaction) => !trxns?.transactions.includes(trxn)
    );

    // check if trxns exists then push it to the array
    trxns && result.push(trxns);

    return TransactionService.loadFormattedTransactions(reminader, result);
  };

  /**
   * Method to fet ths user's bank accounts and or cards.
   *
   * @param userIdentifier: string - is a unique property of the user e.g E-mail, Phone Number, Id
   *
   * @return userBankAccounts: Array<IBankAccount>
   */
  public static GetUserAccounts = async (): Promise<
    Array<IPersonBankAccount>
  > => {
    // fetch the bank accounts
    const userDetails: IPerson | null =
      await UserService.GetUserProfileFromKPay();

    return userDetails !== null
      ? TransactionService.filterBankAccounts(userDetails)
      : [];
  };

  /**
   * Method to filter and format the returned banks and bank accounts
   * belonging to a user.
   *
   * @param accounts: IPerson | null - the response from the server
   */
  protected static filterBankAccounts = (
    userDetails: IPerson
  ): Array<IPersonBankAccount> => {
    const userBankAccounts: Array<IPersonBankAccount> = userDetails.banks;
    /***
     * KINDLY REQUEST FOR THE END POINT FROM SILKROAD
     */
    return userBankAccounts;
  };

  /**
   * Method to filter and format the last dated transaction, by the most recent day
   * @param transactions: Array<ITransaction>
   * @returns lastDayTransaction: ILastDayTransaction | null
   */
  public static filterAndGetLastDayTransactions = (
    transactions: Array<ITransaction>
  ): ILastDayTransaction | null => {
    let lastDayTransaction: ILastDayTransaction | null = null;

    try {
      const t_created_at = transactions[0].t_created_at;
      const children = transactions.filter(
        (trxn: ITransaction) =>
          trxn.t_created_at.getFullYear() === t_created_at.getFullYear() &&
          trxn.t_created_at.getMonth() === t_created_at.getMonth() &&
          trxn.t_created_at.getDate() === t_created_at.getDate()
      );

      const formattedCreatedAt = `${t_created_at.getFullYear()}-${
        t_created_at.getMonth() + 1
      }-${t_created_at.getDate()}`;
      const isToday: string = dateIsToday(t_created_at)
        ? "Today"
        : formattedCreatedAt;

      lastDayTransaction = {
        date: isToday,
        day: formattedCreatedAt,
        transactions: [...children],
      };
    } catch (error: unknown) {}

    return lastDayTransaction;
  };
}

export default TransactionService;
