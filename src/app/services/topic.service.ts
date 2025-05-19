import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Topic } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private readonly collectionName = 'topics';

  constructor(private afs: AngularFirestore) {}

  /**
   * Összes téma lekérése Observable-ként.
   */
  getAll(): Observable<Topic[]> {
    return this.afs
      .collection<Topic>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Topic;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  /**
   * Egy téma lekérése ID alapján Promise-ként.
   */
  getById(id: string): Promise<Topic | undefined> {
    return this.afs
      .doc<Topic>(`${this.collectionName}/${id}`)
      .get()
      .toPromise()
      .then(doc => doc.exists ? ({ id: doc.id, ...doc.data() } as Topic) : undefined);
  }

  /**
   * Új téma létrehozása.
   */
  create(topic: Omit<Topic, 'id'>): Promise<void> {
    const id = this.afs.createId();
    return this.afs.doc(`${this.collectionName}/${id}`).set({ id, ...topic });
  }

  /**
   * Téma adatainak frissítése.
   */
  update(id: string, data: Partial<Topic>): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).update(data);
  }

  /**
   * Téma törlése.
   */
  delete(id: string): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
