import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { User } from '../../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly collectionName = 'users';

  constructor(private afs: AngularFirestore) {}

  getAll(): Promise<User[]> {
    return firstValueFrom(
      this.afs
        .collection<User>(this.collectionName)
        .valueChanges({ idField: 'id' })
    );
  }

  getById(id: string): Promise<User | undefined> {
    return firstValueFrom(
      this.afs
        .doc<User>(`${this.collectionName}/${id}`)
        .valueChanges({ idField: 'id' })
    );
  }

  create(user: User): Promise<void> {
    return this.afs
      .doc<User>(`${this.collectionName}/${user.id}`)
      .set(user);
  }

  update(id: string, data: Partial<User>): Promise<void> {
    return this.afs
      .doc<User>(`${this.collectionName}/${id}`)
      .update(data);
  }

  delete(id: string): Promise<void> {
    return this.afs
      .doc<User>(`${this.collectionName}/${id}`)
      .delete();
  }
}
