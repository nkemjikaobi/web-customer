/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */

export interface ISearchFormSegment {
  Origin: string;
  Destination: string;
  OriginAirport?: string;
  DestinationAirport?: string;
  DepartureDate: Date | string | undefined;
  ReturnDate: Date | string | undefined;
}

interface ISearchForm {
  AdultCount: number;
  ChildCount: number;
  InfantCount: number;
  JourneyType: string;
  PreferredAirlines: Array<any>;
  CabinClass: string;
  Segments: Array<ISearchFormSegment>;
  tripType?: boolean;
}

export default ISearchForm;
