interface IBookingResponse {
  app_reference: string;
  AirItinerary: string | null;
  PriceInfo: string | null;
  TravelerInfo: string | null;
  TicketDesignator: string | null;
  BookingReferenceID: string | null;
}

export default IBookingResponse;
