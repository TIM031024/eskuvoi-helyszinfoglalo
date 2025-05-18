export interface Booking {
  id: string;
  venueId: string;
  userId: string;
  dateFrom: Date;
  dateTo: Date;
  totalPrice: number;
}