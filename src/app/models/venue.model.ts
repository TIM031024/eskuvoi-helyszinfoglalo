export interface Venue {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  amenities: string[];
  imageUrl?: string;
  availableDates: Date[];
}
