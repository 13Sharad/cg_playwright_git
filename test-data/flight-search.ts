export interface FlightSearchData {
  tripType: 'one-way' | 'round-trip';
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
}

export const validOneWayFlight: FlightSearchData = {
  tripType: 'one-way',
  origin: 'DXB',
  destination: 'CDG',
  departureDate: '2030-06-10',
  adults: 1,
  children: 0,
  infants: 0,
};

export const validRoundTripFlight: FlightSearchData = {
  ...validOneWayFlight,
  tripType: 'round-trip',
  returnDate: '2030-06-20',
};

export const invalidFlightSearches: FlightSearchData[] = [
  { ...validOneWayFlight, origin: '' },
  { ...validOneWayFlight, destination: '' },
  { ...validOneWayFlight, origin: 'DXB', destination: 'DXB' },
  { ...validRoundTripFlight, returnDate: '2030-06-01' },
  { ...validOneWayFlight, adults: 0 },
];

export const emptyFlightSearch: FlightSearchData = {
  tripType: 'one-way',
  origin: '',
  destination: '',
  departureDate: '',
  adults: 0,
  children: 0,
  infants: 0,
};

export const specialCharacterFlightSearch: FlightSearchData = {
  ...validOneWayFlight,
  origin: 'DXB<script>',
  destination: "CDG' OR '1'='1",
};

export const boundaryFlightSearch: FlightSearchData = {
  ...validOneWayFlight,
  adults: 1,
  children: 0,
  infants: 0,
};

export const maximumFlightSearch: FlightSearchData = {
  ...validOneWayFlight,
  adults: 9,
  children: 9,
  infants: 9,
};

export const longFlightSearch: FlightSearchData = {
  ...validOneWayFlight,
  origin: 'A'.repeat(100),
  destination: 'B'.repeat(100),
};
