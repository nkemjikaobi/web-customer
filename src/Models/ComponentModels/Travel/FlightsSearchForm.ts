/**
 * Model to manage FlightsSearchComponent
 */

class FlightsSearchForm {
  TripType: number | null = null;
  DepatureCity = "";
  DestinationCity = "";
  DepartureDate: Date = new Date();
  ReturnDate: Date = new Date();
  Travellers = 0;
}

export default FlightsSearchForm;
