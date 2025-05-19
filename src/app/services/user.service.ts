import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersColl: CollectionReference<User>;

  constructor(private firestore: Firestore) {
    this.usersColl = collection(this.firestore, 'users') as CollectionReference<User>;
  }

  getAll(): Promise<User[]> {
    return firstValueFrom(
      collectionData(this.usersColl, { idField: 'id' }) as Observable<User[]>
    );
  }

  getById(id: string): Promise<User> {
    const ref = doc(this.usersColl, id);
    return firstValueFrom(docData(ref, { idField: 'id' }) as Observable<User>);
  }

  /** Most már teljes User-t várunk, így használhatjuk az Auth UID-t */
  async create(user: User): Promise<void> {
    const ref = doc(this.usersColl, user.id);
    await setDoc(ref, user);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const ref = doc(this.usersColl, id);
    await updateDoc(ref, data as DocumentData);
  }

  async delete(id: string): Promise<void> {
    const ref = doc(this.usersColl, id);
    await deleteDoc(ref);
  }
}
