import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation }      from '../models';
import { Observable }       from 'rxjs';
import { map }              from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly collectionName = 'reservations';

  constructor(private afs: AngularFirestore) {}

  /** Observable-ként szolgáltatja az összes foglalást */
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

  /** Egy foglalás lekérése Promise-ként, a Firestore .ref.get() API-val */
  getById(id: string): Promise<Reservation | undefined> {
    return this.afs
      .doc<Reservation>(`${this.collectionName}/${id}`)
      .ref
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          return undefined;
        }
        const data = snapshot.data() as Omit<Reservation, 'id'>;
        return { ...data, id: snapshot.id };
      });
  }

  /** Új foglalás */
  create(res: Omit<Reservation, 'id'>): Promise<void> {
    const id = this.afs.createId();
    return this.afs.doc(`${this.collectionName}/${id}`).set({ id, ...res });
  }

  /** Foglalás frissítése */
  update(id: string, data: Partial<Reservation>): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).update(data);
  }

  /** Csak státusz módosítása */
  updateStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'): Promise<void> {
    return this.update(id, { status });
  }

  /** Foglalás törlése */
  delete(id: string): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
