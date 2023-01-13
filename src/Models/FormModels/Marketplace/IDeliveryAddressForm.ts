interface IDeliveryAddressForm {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  deliveryAddress: string;
  landmarkDirections?: string;
  state: any;
  lga: any;
  city: string;
}

export default IDeliveryAddressForm;
