import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venue } from '../models/venue.model';

@Injectable({ providedIn: 'root' })
export class VenueService {
  constructor(private firestore: Firestore) {}

  /**  
   * Lekérdezi a 'venues' kollekciót, és a Firestore Timestamp-okat
   * JS Date objektumokká alakítja át, hogy a DatePipe működjön.  
   */
  getVenues(): Observable<Venue[]> {
    const coll = collection(this.firestore, 'venues');
    return collectionData<any>(coll, { idField: 'id' }).pipe(
      map(docs =>
        docs.map(doc => {
          // Ha van availableDates tömb, konvertáljuk
          const raw = doc.availableDates;
          const availableDates: Date[] = Array.isArray(raw)
            ? raw.map((ts: any) =>
                ts instanceof Timestamp ? ts.toDate() : new Date(ts)
              )
            : [];

          return {
            ...doc,
            availableDates
          } as Venue;
        })
      )
    );
  }
}
