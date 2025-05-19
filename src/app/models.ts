// Helyszín (Venue) entitás
export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
  imageUrl?: string;
}

// Foglalás (Reservation) entitás
export interface Reservation {
  id: string;
  venueId: string;
  userId: string;
  date: string; // ISO dátum string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  topicId?: string;
}

// Felhasználó (User) entitás
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

// Téma (Topic) entitás
export interface Topic {
  id: string;
  title: string;
  description?: string;
}
