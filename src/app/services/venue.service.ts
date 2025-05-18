import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from '@angular/fire/firestore';
import type { CollectionReference, Query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Venue } from '../models/venue.model';

@Injectable({ providedIn: 'root' })
export class VenueService {
  private venuesCollection: CollectionReference<Venue>;

  constructor(private firestore: Firestore) {
    // init a kollekció referenciája
    this.venuesCollection = collection(this.firestore, 'venues') as CollectionReference<Venue>;
  }

  /** Összes helyszín lekérése ID-mezővel együtt */
  getVenues(): Observable<Venue[]> {
    return collectionData(this.venuesCollection, { idField: 'id' }) as Observable<Venue[]>;
  }

  /** Új helyszín létrehozása (ID-t a venue objektum tartalmazza) */
  createVenue(venue: Venue): Promise<void> {
    const ref = doc(this.firestore, 'venues', venue.id);
    return setDoc(ref, venue);
  }

  /** Helyszín frissítése */
  updateVenue(id: string, data: Partial<Venue>): Promise<void> {
    const ref = doc(this.firestore, 'venues', id);
    return updateDoc(ref, data);
  }

  /** Helyszín törlése */
  deleteVenue(id: string): Promise<void> {
    const ref = doc(this.firestore, 'venues', id);
    return deleteDoc(ref);
  }

  /** 4 komplex lekérdezés mintapélda */
  query1(): Observable<Venue[]> {
    const q = query(this.venuesCollection, where('capacity', '>=', 50), orderBy('capacity'));
    return collectionData(q as Query<Venue>, { idField: 'id' }) as Observable<Venue[]>;
  }

  query2(): Observable<Venue[]> {
    const q = query(this.venuesCollection, where('price', '<=', 300000), limit(5));
    return collectionData(q as Query<Venue>, { idField: 'id' }) as Observable<Venue[]>;
  }

  query3(date: string): Observable<Venue[]> {
    const q = query(
      this.venuesCollection,
      where('availableDates', 'array-contains', date),
      where('price', '<', 500000)
    );
    return collectionData(q as Query<Venue>, { idField: 'id' }) as Observable<Venue[]>;
  }

  query4(): Observable<Venue[]> {
    const q = query(
      this.venuesCollection,
      where('location', '==', 'Budapest'),
      where('price', '<', 600000),
      limit(10)
    );
    return collectionData(q as Query<Venue>, { idField: 'id' }) as Observable<Venue[]>;
  }
}
