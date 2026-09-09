export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  specialRequests: string;
}

export const validBooking: BookingData = {
  firstName: 'Ava',
  lastName: 'Tester',
  email: 'booking.user@example.test',
  phone: '+1 202 555 0147',
  country: 'United States',
  address: '100 Test Avenue',
  specialRequests: 'Late check-in requested.',
};

export const invalidBookings: BookingData[] = [
  { ...validBooking, firstName: '' },
  { ...validBooking, email: 'invalid-email' },
  { ...validBooking, phone: 'not-a-phone' },
  { ...validBooking, country: '' },
];

export const emptyBooking: BookingData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  address: '',
  specialRequests: '',
};

export const specialCharacterBooking: BookingData = {
  ...validBooking,
  firstName: "Anne-Marie",
  lastName: "O'Connor",
  address: '12 Rue de l\'Hotel, Apt #5',
  specialRequests: 'Allergic to nuts; use UTF-8: cafe, Sao Paulo.',
};

export const boundaryBooking: BookingData = {
  ...validBooking,
  firstName: 'A',
  lastName: 'B',
  specialRequests: '',
};

export const longBooking: BookingData = {
  ...validBooking,
  firstName: 'A'.repeat(100),
  lastName: 'B'.repeat(100),
  address: 'C'.repeat(250),
  specialRequests: 'D'.repeat(1000),
};
