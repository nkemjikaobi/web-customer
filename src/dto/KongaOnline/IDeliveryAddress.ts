import IDeliveryAddressForm from "Models/FormModels/Marketplace/IDeliveryAddressForm";
import IPickupAddressForm from "Models/FormModels/Marketplace/IPickupAddressForm";

interface IDeliveryAddress {
  type: string;
  form: IPickupAddressForm | IDeliveryAddressForm;
}

export default IDeliveryAddress;
