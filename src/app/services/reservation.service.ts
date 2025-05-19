import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly collectionName = 'reservations';

  constructor(private afs: AngularFirestore) {}

  /**
   * Összes foglalás lekérése Observable-ként.
   */
  getAll(): Observable<Reservation[]> {
    return this.afs
      .collection<Reservation>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Reservation;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  /**
   * Egy foglalás lekérése ID alapján.
   */
  getById(id: string): Promise<Reservation | undefined> {
    return this.afs
      .doc<Reservation>(`${this.collectionName}/${id}`)
      .get()
      .toPromise()
      .then(doc => (doc.exists ? ({ id: doc.id, ...doc.data() } as Reservation) : undefined));
  }

  /**
   * Új foglalás létrehozása.
   * @param reservation A mentendő objektum (id nélkül).
   */
  create(reservation: Omit<Reservation, 'id'>): Promise<void> {
    const id = this.afs.createId();
    return this.afs.doc(`${this.collectionName}/${id}`).set({ id, ...reservation });
  }

  /**
   * Foglalás frissítése.
   * @param id A dokumentum azonosítója.
   * @param data A frissítendő mezők.
   */
  update(id: string, data: Partial<Reservation>): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).update(data);
  }

  /**
   * Direkt státusz-frissítés.
   */
  updateStatus(id: string, status: string): Promise<void> {
    return this.update(id, { status });
  }

  /**
   * Foglalás törlése.
   */
  delete(id: string): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
