// src/app/services/venue.service.ts

import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData }                 from '@angular/fire/firestore';
import { Timestamp }                                            from 'firebase/firestore';
import { Observable }                                           from 'rxjs';
import { map }                                                  from 'rxjs/operators';
import { Venue }                                                from '../models/venue.model';

@Injectable({ providedIn: 'root' })
export class VenueService {
  // Az Angular aktuális injector példánya
  private injector = inject(Injector);
  // A Firestore-példány is injektálva
  private firestore = inject(Firestore);

  /**  
   * A 'venues' kollekciót long-pollinggal kérdezzük le,
   * és átalakítjuk a Firestore Timestamp-eket sima Date-ekké.
   */
  getVenues(): Observable<Venue[]> {
    // runInInjectionContext most az Injector-t kapja, nem a this-t
    return runInInjectionContext(this.injector, () => {
      const venuesColl = collection(this.firestore, 'venues');
      return collectionData<any>(venuesColl, { idField: 'id' }).pipe(
        map(docs =>
          docs.map(doc => {
            const rawDates = doc.availableDates;
            const availableDates: Date[] = Array.isArray(rawDates)
              ? rawDates.map((ts: any) =>
                  ts instanceof Timestamp ? ts.toDate() : new Date(ts)
                )
              : [];
            return { ...doc, availableDates }
