export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl: string;
  description?: string;
  availableDates: string[];
}