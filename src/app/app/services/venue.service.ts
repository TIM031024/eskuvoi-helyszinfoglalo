import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Timestamp }        from 'firebase/firestore';
import { Observable }       from 'rxjs';
import { map }              from 'rxjs/operators';
import { Venue }            from '../../models/venue.model';

@Injectable({ providedIn: 'root' })
export class VenueService {
  private injector  = inject(Injector);
  private firestore = inject(Firestore);

  
  getVenues(): Observable<Venue[]> {
    return runInInjectionContext(this.injector, () => {
      const venuesColl = collection(this.firestore, 'venues');
      return collectionData<any>(venuesColl, { idField: 'id' }).pipe(
        map(docs =>
          docs.map(docData => {
            // Timestamp[] → Date[] konverzió
            const raw = docData.availableDates;
            const availableDates: Date[] = Array.isArray(raw)
              ? raw.map((ts: any) =>
                  ts instanceof Timestamp ? ts.toDate() : new Date(ts)
                )
              : [];
            return {
              ...docData,
              availableDates
            } as Venue;
          })
        )
      );
    });
  }

  addVenue(data: Omit<Venue, 'id'>): Promise<void> {
    const venuesColl = collection(this.firestore, 'venues');

    return addDoc(venuesColl, data).then(() => {});
  }

  updateVenue(venue: Venue): Promise<void> {
    const venueDoc = doc(this.firestore, 'venues', venue.id);
    const { id, ...payload } = venue;
    return updateDoc(venueDoc, payload);
  }

  deleteVenue(id: string): Promise<void> {
    const venueDoc = doc(this.firestore, 'venues', id);
    return deleteDoc(venueDoc);
  }
}
