// src/app/services/venue.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  CollectionReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venue } from '../models/venue.model';

/**
 * 1) Converter a Firestore és a Venue Modell között
 */
const venueConverter: FirestoreDataConverter<Venue> = {
  // Firestore-ba íráskor (id nélkül)
  toFirestore(modelObject: Omit<Venue, 'id'>): DocumentData {
    return {
      name:           modelObject['name'],
      location:       modelObject['location'],
      price:          modelObject['price'],
      capacity:       modelObject['capacity'],
      amenities:      modelObject['amenities'],
      availableDates: modelObject['availableDates']
    };
  },
  // Firestore-ból olvasáskor (Snapshot → Venue)
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>
  ): Venue {
    const data = snapshot.data();
    // Timestamp vagy string tömb → JS Date tömb
    const raw: any[] = data['availableDates'] || [];
    const availableDates: Date[] = raw.map(ts =>
      ts && typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts)
    );

    return {
      id:             snapshot.id,
      name:           data['name'],
      location:       data['location'],
      price:          data['price'],
      capacity:       data['capacity'],
      amenities:      data['amenities'],
      availableDates
    };
  }
};

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private venuesRef: CollectionReference<Venue>;

  constructor(private firestore: Firestore) {
    // 2) Inicializáljuk a CollectionReference-et a converterrel
    this.venuesRef = collection(this.firestore, 'venues')
      .withConverter<Venue>(venueConverter as any);
  }

  /** 3) Összes helyszín lekérdezése Observable tömbként */
  getVenues(): Observable<Venue[]> {
    return collectionData(this.venuesRef, { idField: 'id' }).pipe(
      map(items => items as Venue[])
    );
  }

  /** 4) Új helyszín létrehozása (id nélkül) */
  addVenue(venue: Omit<Venue, 'id'>): Promise<void> {
    return addDoc(this.venuesRef, venue)
      .then(() => {}); // ha csak a Promise<void>-ra van szükség
  }

  /** 5) Meglévő helyszín frissítése ID alapján */
  updateVenue(id: string, partial: Partial<Omit<Venue, 'id'>>): Promise<void> {
    const ref = doc(this.venuesRef, id);
    return updateDoc(ref, partial as any);
  }

  /** 6) Helyszín törlése ID alapján */
  deleteVenue(id: string): Promise<void> {
    const ref = doc(this.venuesRef, id);
    return deleteDoc(ref);
  }
}
