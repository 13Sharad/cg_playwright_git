export interface TourSearchData {
  destination: string;
  startDate: string;
  guests: number;
  durationDays?: number;
}

export const validTourSearch: TourSearchData = {
  destination: 'Dubai',
  startDate: '2030-06-10',
  guests: 2,
  durationDays: 5,
};

export const invalidTourSearches: TourSearchData[] = [
  { ...validTourSearch, destination: '' },
  { ...validTourSearch, startDate: '2020-01-01' },
  { ...validTourSearch, guests: 0 },
  { ...validTourSearch, durationDays: -1 },
];

export const emptyTourSearch: TourSearchData = {
  destination: '',
  startDate: '',
  guests: 0,
};

export const specialCharacterTourSearch: TourSearchData = {
  ...validTourSearch,
  destination: "Sao Paulo & O'ahu",
};

export const boundaryTourSearch: TourSearchData = {
  ...validTourSearch,
  guests: 1,
  durationDays: 1,
};

export const maximumTourSearch: TourSearchData = {
  ...validTourSearch,
  guests: 50,
  durationDays: 365,
};

export const longTourSearch: TourSearchData = {
  ...validTourSearch,
  destination: 'A'.repeat(250),
};
