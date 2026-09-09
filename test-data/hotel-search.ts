export interface HotelSearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  nationality: string;
}

export const validHotelSearch: HotelSearchData = {
  destination: 'Dubai',
  checkIn: '2030-06-10',
  checkOut: '2030-06-15',
  adults: 2,
  children: 0,
  rooms: 1,
  nationality: 'United States',
};

export const invalidHotelSearches: HotelSearchData[] = [
  { ...validHotelSearch, destination: '' },
  { ...validHotelSearch, checkIn: '2020-01-01' },
  { ...validHotelSearch, checkIn: '2030-06-15', checkOut: '2030-06-10' },
  { ...validHotelSearch, adults: 0 },
  { ...validHotelSearch, rooms: -1 },
];

export const emptyHotelSearch: HotelSearchData = {
  destination: '',
  checkIn: '',
  checkOut: '',
  adults: 0,
  children: 0,
  rooms: 0,
  nationality: '',
};

export const specialCharacterHotelSearch: HotelSearchData = {
  ...validHotelSearch,
  destination: "O'ahu & Tokyo",
  nationality: 'Cote d\'Ivoire',
};

export const boundaryHotelSearch: HotelSearchData = {
  ...validHotelSearch,
  adults: 1,
  children: 0,
  rooms: 1,
};

export const maximumHotelSearch: HotelSearchData = {
  ...validHotelSearch,
  adults: 20,
  children: 10,
  rooms: 10,
};

export const longHotelSearch: HotelSearchData = {
  ...validHotelSearch,
  destination: 'A'.repeat(250),
  nationality: 'B'.repeat(100),
};
