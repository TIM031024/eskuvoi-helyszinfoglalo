// src/app/services/reservation.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation }      from '../models';
import { Observable }       from 'rxjs';
import { map }              from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly collectionName = 'reservations';

  constructor(private afs: AngularFirestore) {}

  /** Összes foglalás lekérése Observable-ként */
  getAll(): Observable<Reservation[]> {
    return this.afs
      .collection<Reservation>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Omit<Reservation, 'id'>;
            const id = a.payload.doc.id;
            return { ...data, id };
          })
        )
      );
  }

  /** Új foglalás létrehozása */
  create(reservation: Omit<Reservation, 'id'>): Promise<void> {
    const id = this.afs.createId();
    return this.afs.doc(`${this.collectionName}/${id}`).set({ id, ...reservation });
  }

  /** Foglalás frissítése */
  update(id: string, data: Partial<Reservation>): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).update(data);
  }

  /** Csak a státusz módosítása */
  updateStatus(
    id: string,
    status: Reservation['status']
  ): Promise<void> {
    return this.update(id, { status });
  }

  /** Foglalás törlése */
  delete(id: string): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
