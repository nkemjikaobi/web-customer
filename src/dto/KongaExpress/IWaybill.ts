/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */

interface IWaybill {
  shipper_firstname: string;
  shipper_lastname: string;
  shipper_state: string;
  shipper_city: string;
  shipper_lga: string;
  shipper_street: string;
  shipper_telephone: string;
  shipper_email: string;
  receiver_firstname: string;
  receiver_lastname: string;
  receiver_state: string;
  receiver_city: string;
  receiver_lga: string;
  receiver_street: string;
  receiver_telephone: string;
  receiver_email: string;
  package_weight: number;
  package_pieces: number;
  package_name: string;
  description: string;
  delivery_type: string;
}

export default IWaybill;
