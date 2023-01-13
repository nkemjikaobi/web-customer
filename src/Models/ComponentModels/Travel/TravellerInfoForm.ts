/**
 * Model to manage TravellerInfoComponent
 */

class TravellerInfoForm {
  TripType: number | null = null;
  DepatureCity = "";
  DestinationCity = "";
  DepartureDate: Date = new Date();
  ReturnDate: Date = new Date();
  Travellers = 0;
}

export default TravellerInfoForm;
