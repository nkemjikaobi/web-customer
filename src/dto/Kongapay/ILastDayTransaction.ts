import ITransaction from "./ITransaction";

interface ILastDayTransaction {
  day: string;
  date: string;
  transactions: Array<ITransaction>;
}

export default ILastDayTransaction;
