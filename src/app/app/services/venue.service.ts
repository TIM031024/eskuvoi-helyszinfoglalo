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
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venue } from '../models/venue.model';

/**
 * 1) Definiáljuk a Venue-konvertert:
 *    - toFirestore: Venue -> DocumentData (id nélkül)
 *    - fromFirestore: QueryDocumentSnapshot<DocumentData> -> Venue
 */
const venueConverter: FirestoreDataConverter<Venue> = {
  toFirestore(modelObject: Omit<Venue, 'id'>): DocumentData {
    // itt mindig bracket notation-t (modelObject['prop']) használunk a TS4111 miatt
    return {
      name: modelObject['name'],
      location: modelObject['location'],
      price: modelObject['price'],
      capacity: modelObject['capacity'],
      amenities: modelObject['amenities'],
      availableDates: modelObject['availableDates']
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Venue {
    const data = snapshot.data();
    // Firestore Timestamp -> JS Date
    const raw = (data['availableDates'] as any[]) || [];
    const availableDates: Date[] = raw.map(ts =>
      ts && typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts)
    );

    return {
      id: snapshot.id,
      name: data['name'],
      location: data['location'],
      price: data['price'],
      capacity: data['capacity'],
      amenities: data['amenities'],
      availableDates
    };
  }
};

@Injectable({ providedIn: 'root' })
export class VenueService {
  private venuesRef: CollectionReference<Venue>;

  constructor(private firestore: Firestore) {
    // 2) Init: típusos gyűjtemény konverterrel
    this.venuesRef = collection(this.firestore, 'venues').withConverter(venueConverter) as CollectionReference<Venue>;
  }

  /** 3) Összes helyszín lekérése Observable-Venue tömbként */
  getVenues(): Observable<Venue[]> {
    return collectionData(this.venuesRef, { idField: 'id' }).pipe(
      // collectionData már Venue[]-t ad a konverter miatt, de biztosítsuk a típust
      map(items => items as Venue[])
    );
  }

  /** 4) Új helyszín létrehozása (id nélkül) */
  addVenue(venue: Omit<Venue, 'id'>): Promise<DocumentReference<Venue>> {
    return addDoc(this.venuesRef, venue) as Promise<DocumentReference<Venue>>;
  }

  /** 5) Meglévő helyszín frissítése ID alapján */
  updateVenue(id: string, partial: Partial<Omit<Venue, 'id'>>): Promise<void> {
    const ref = doc(this.venuesRef, id);
    // partial as any kell, mert a konverter WithFieldValue-t vár
    return updateDoc(ref, partial as any);
  }

  /** 6) Helyszín törlése ID alapján */
  deleteVenue(id: string): Promise<void> {
    const ref = doc(this.venuesRef, id);
    return deleteDoc(ref);
  }
}
