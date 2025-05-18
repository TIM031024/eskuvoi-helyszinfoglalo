// src/app/services/venue.service.ts

import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData }                 from '@angular/fire/firestore';
import { Timestamp }                                            from 'firebase/firestore';
import { Observable }                                           from 'rxjs';
import { map }                                                  from 'rxjs/operators';
import { Venue }                                                from '../models/venue.model';

@Injectable({ providedIn: 'root' })
export class VenueService {
  // Az Angular DI-konténer
  private injector = inject(Injector);
  // A Firestore-példány
  private firestore = inject(Firestore);

  /**  
   * Lekérdezi a 'venues' kollekciót, 
   * és a Firestore Timestamp-eket Date objektumokká alakítja.  
   * A hívás az Angular injector-zónából történik.
   */
  getVenues(): Observable<Venue[]> {
    return runInInjectionContext(this.injector, () => {
      const venuesColl = collection(this.firestore, 'venues');
      return collectionData<any>(venuesColl, { idField: 'id' }).pipe(
        map(docs =>
          docs.map(doc => {
            // Timestamp[] → Date[] konverzió
            const rawDates = doc.availableDates;
            const availableDates: Date[] = Array.isArray(rawDates)
              ? rawDates.map((ts: any) =>
                  ts instanceof Timestamp ? ts.toDate() : new Date(ts)
                )
              : [];
            // Visszaadjuk a Venue objektumot
            return { ...doc, availableDates } as Venue;
          })
        )
      );
    });
  }
}
