import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly collectionName = 'users';

  constructor(private afs: AngularFirestore) {}

  /**
   * Összes felhasználó lekérése Observable-ként.
   */
  getAll(): Observable<User[]> {
    return this.afs
      .collection<User>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  /**
   * Egy felhasználó lekérése ID alapján Promise-ként.
   */
  getById(id: string): Promise<User | undefined> {
    return this.afs
      .doc<User>(`${this.collectionName}/${id}`)
      .get()
      .toPromise()
      .then(doc => doc.exists ? ({ id: doc.id, ...doc.data() } as User) : undefined);
  }

  /**
   * Új felhasználó létrehozása.
   */
  create(user: Omit<User, 'id'>): Promise<void> {
    const id = this.afs.createId();
    return this.afs.doc(`${this.collectionName}/${id}`).set({ id, ...user });
  }

  /**
   * Felhasználó adatainak frissítése.
   */
  update(id: string, data: Partial<User>): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).update(data);
  }

  /**
   * Felhasználó törlése.
   */
  delete(id: string): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
