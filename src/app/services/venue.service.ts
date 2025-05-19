import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { Venue } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private venuesColl;

  constructor(private firestore: Firestore) {
    // inicializáljuk itt, ne osztálymezőn
    this.venuesColl = collection(this.firestore, 'venues');
  }

  /** Összes helyszín lekérése Promise-ként */
  getAll(): Promise<Venue[]> {
    return firstValueFrom(
      collectionData(this.venuesColl, { idField: 'id' }) as Observable<Venue[]>
    );
  }

  /** Egy helyszín lekérése ID alapján */
  getById(id: string): Promise<Venue> {
    const ref = doc(this.venuesColl, id);
    return firstValueFrom(
      docData(ref, { idField: 'id' }) as Observable<Venue>
    );
  }

  /** Új helyszín létrehozása */
  async create(venue: Omit<Venue, 'id'>): Promise<void> {
    await addDoc(this.venuesColl, venue);
  }

  /** Helyszín frissítése */
  async update(id: string, data: Partial<Venue>): Promise<void> {
    const ref = doc(this.venuesColl, id);
    await updateDoc(ref, data as any);
  }

  /** Helyszín törlése */
  async delete(id: string): Promise<void> {
    const ref = doc(this.venuesColl, id);
    await deleteDoc(ref);
  }
}
