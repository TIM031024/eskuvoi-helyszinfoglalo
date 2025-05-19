import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Venue } from '../models';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private readonly collectionName = 'venues';

  constructor(private afs: AngularFirestore) {}

  /** Összes helyszín lekérése Promise-ként */
  getAll(): Promise<Venue[]> {
    return firstValueFrom(
      this.afs
        .collection<Venue>(this.collectionName)
        .valueChanges({ idField: 'id' })
    );
  }

  getById(id: string): Promise<Venue | undefined> {
    return this.afs
      .collection<Venue>(this.collectionName)
      .doc(id)
      .get()
      .toPromise()
      .then(snapshot =>
        snapshot.exists
          ? ({ id: snapshot.id, ...snapshot.data()! } as Venue)
          : undefined
      );
  }

  /** Új helyszín létrehozása */
  create(venue: Omit<Venue, 'id'>): Promise<void> {
    const id = this.afs.createId();
    return this.afs.doc<Venue>(`${this.collectionName}/${id}`).set({ id, ...venue });
  }

  /** Helyszín frissítése */
  update(id: string, data: Partial<Venue>): Promise<void> {
    return this.afs.doc<Venue>(`${this.collectionName}/${id}`).update(data);
  }

  /** Helyszín törlése */
  delete(id: string): Promise<void> {
    return this.afs.doc<Venue>(`${this.collectionName}/${id}`).delete();
  }
}
