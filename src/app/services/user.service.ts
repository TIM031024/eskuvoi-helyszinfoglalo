import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User }          from '../models';
import { Observable }    from 'rxjs';
import { map }           from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly collectionName = 'users';

  constructor(private afs: AngularFirestore) {}

  /** Összes felhasználó */
  getAll(): Observable<User[]> {
    return this.afs
      .collection<User>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            // először spreadeljük a data-t, utána adjuk hozzá az id-t
            return { ...(data as Omit<User, 'id'>), id };
          })
        )
      );
  }

  /** Egy felhasználó lekérése ID alapján */
  getById(id: string): Promise<User | undefined> {
    return this.afs
      .doc<User>(`${this.collectionName}/${id}`)
      .get()
      .toPromise()
      .then(snapshot => {
        if (!snapshot || !snapshot.exists) {
          return undefined;
        }
        const data = snapshot.data()!;
        return { ...(data as Omit<User, 'id'>), id: snapshot.id };
      });
  }

  /** Új felhasználó */
  async create(user: Omit<User, 'id'>): Promise<void> {
    const id = this.afs.createId();
    await this.afs.doc(`${this.collectionName}/${id}`).set({ id, ...user });
  }

  /** Felhasználó frissítése */
  async update(id: string, data: Partial<User>): Promise<void> {
    await this.afs.doc(`${this.collectionName}/${id}`).update(data);
  }

  /** Felhasználó törlése */
  async delete(id: string): Promise<void> {
    await this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
