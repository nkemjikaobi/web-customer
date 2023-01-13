import ISubOrder from "./ISubOrder";

interface IOrderData {
  parent_id?: string;
  created_at?: string;
  parent_status?: string;
  grand_total?: string;
  sub_orders: Array<ISubOrder>;
}

export default IOrderData;
