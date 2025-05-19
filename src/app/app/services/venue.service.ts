// src/app/services/venue.service.ts

import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { Venue } from '../../models';

@Injectable({ providedIn: 'root' })
export class VenueService {
  private venuesColl: CollectionReference<Venue>;

  constructor(private firestore: Firestore) {
    this.venuesColl = collection(
      this.firestore,
      'venues'
    ) as CollectionReference<Venue>;
  }

  /** 1. Összes helyszín lekérése */
  getAll(): Promise<Venue[]> {
    return firstValueFrom(
      collectionData(this.venuesColl, { idField: 'id' }) as Observable<Venue[]>
    );
  }

  /** 2. Egy helyszín lekérése ID alapján */
  getById(id: string): Promise<Venue> {
    const ref = doc(this.venuesColl, id);
    return firstValueFrom(
      docData(ref, { idField: 'id' }) as Observable<Venue>
    );
  }

  /** 3. Új helyszín létrehozása */
  async create(venue: Omit<Venue, 'id'>): Promise<void> {
    await addDoc(this.venuesColl, venue);
  }

  /** 4. Helyszín frissítése */
  async update(id: string, data: Partial<Venue>): Promise<void> {
    const ref = doc(this.venuesColl, id);
    await updateDoc(ref, data as DocumentData);
  }

  /** 5. Helyszín törlése */
  async delete(id: string): Promise<void> {
    const ref = doc(this.venuesColl, id);
    await deleteDoc(ref);
  }

  /** --- Komplex lekérdezések (#12) --- */

  /** A) capacity > 50 */
  getLargeVenues(): Promise<Venue[]> {
    const q = query(this.venuesColl, where('capacity', '>', 50));
    return firstValueFrom(
      collectionData(q, { idField: 'id' }) as Observable<Venue[]>
    );
  }

  /** B) ABC sorrend (név szerint) */
  getVenuesOrderedByName(): Promise<Venue[]> {
    const q = query(this.venuesColl, orderBy('name'));
    return firstValueFrom(
      collectionData(q, { idField: 'id' }) as Observable<Venue[]>
    );
  }

  /** C) limit: első 10 helyszín */
  getFirstTenVenues(): Promise<Venue[]> {
    const q = query(this.venuesColl, limit(10));
    return firstValueFrom(
      collectionData(q, { idField: 'id' }) as Observable<Venue[]>
    );
  }

  /** D) Pagination: következő oldal név szerinti rendezéssel */
  async getNextPage(lastDocId: string, pageSize = 5): Promise<Venue[]> {
    // lekérjük a page töréspontját
    const lastSnapshot = await firstValueFrom(
      docData(doc(this.venuesColl, lastDocId), { idField: 'id', refField: 'ref' })
    ) as any; // refField adja a DocumentReference-t
    const q = query(
      this.venuesColl,
      orderBy('name'),
      startAfter(lastSnapshot.ref),
      limit(pageSize)
    );
    return firstValueFrom(
      collectionData(q, { idField: 'id' }) as Observable<Venue[]>
    );
  }
}
