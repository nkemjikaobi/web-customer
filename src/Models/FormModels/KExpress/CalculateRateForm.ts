interface ICalculateRateForm {
  toLocalGovernmentArea: string;
  fromLocalGovernmentArea: string;
  from_state: string;
  to_state: string;
  weight: number;
  clientId: number;
  description: string;
  deliveryType: string;
}

export default ICalculateRateForm;
