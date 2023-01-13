export interface IPassenger {
  IsLeadPax: string;
  Title: string;
  FirstName: string;
  LastName: string;
  PaxType: string;
  Gender: string;
  DateOfBirth: string;
  PassportNumber: string;
  PassportExpiry: string;
  passport_issuing_country: string;
  CountryCode: string;
  CountryName: string;
  ContactNo: string;
  City: string;
  PinCode: string;
  AddressLine1: string;
  AddressLine2: string;
  Email: string;
}

interface IBookingForm {
  AppReference: string;
  Passengers: Array<IPassenger>;
  search_id: string;
  token: string;
  token_key: string;
}

export default IBookingForm;
