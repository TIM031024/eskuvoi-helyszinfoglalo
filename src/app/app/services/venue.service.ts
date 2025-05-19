import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { Venue } from '../../models';

@Injectable({ providedIn: 'root' })
export class VenueService {
  private readonly collectionName = 'venues';

  constructor(private afs: AngularFirestore) {}

  getAll(): Promise<Venue[]> {
    return firstValueFrom(
      this.afs
        .collection<Venue>(this.collectionName, ref =>
          ref.where('capacity', '>', 0).orderBy('name')
        )
        .valueChanges({ idField: 'id' })
    );
  }

  getById(id: string): Promise<Venue | undefined> {
    return firstValueFrom(
      this.afs
        .doc<Venue>(`${this.collectionName}/${id}`)
        .valueChanges({ idField: 'id' })
    );
  }

  create(venue: Venue): Promise<void> {
    return this.afs
      .doc<Venue>(`${this.collectionName}/${venue.id}`)
      .set(venue);
  }

  update(id: string, data: Partial<Venue>): Promise<void> {
    return this.afs
      .doc<Venue>(`${this.collectionName}/${id}`)
      .update(data);
  }

  delete(id: string): Promise<void> {
    return this.afs
      .doc<Venue>(`${this.collectionName}/${id}`)
      .delete();
  }
}
