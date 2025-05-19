// src/app/services/data.services.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Location, Reservation, User, Topic } from '../../models';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private coll: AngularFirestoreCollection<Location>;
  constructor(private afs: AngularFirestore) {
    this.coll = this.afs.collection<Location>('locations');
  }
  getAll(): Observable<Location[]> {
    return this.coll.valueChanges({ idField: 'id' });
  }
  getById(id: string): Observable<Location | undefined> {
    return this.coll.doc<Location>(id).valueChanges({ idField: 'id' });
  }
  create(item: Omit<Location, 'id'>): Promise<DocumentReference<Location>> {
    return this.coll.add(item);
  }
  update(id: string, data: Partial<Location>): Promise<void> {
    return this.coll.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.coll.doc(id).delete();
  }
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private coll: AngularFirestoreCollection<Reservation>;
  constructor(private afs: AngularFirestore) {
    this.coll = this.afs.collection<Reservation>('reservations');
  }
  getAll(): Observable<Reservation[]> {
    return this.coll.valueChanges({ idField: 'id' });
  }
  getById(id: string): Observable<Reservation | undefined> {
    return this.coll.doc<Reservation>(id).valueChanges({ idField: 'id' });
  }
  create(item: Omit<Reservation, 'id'>): Promise<DocumentReference<Reservation>> {
    return this.coll.add(item);
  }
  update(id: string, data: Partial<Reservation>): Promise<void> {
    return this.coll.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.coll.doc(id).delete();
  }
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private coll: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {
    this.coll = this.afs.collection<User>('users');
  }
  getAll(): Observable<User[]> {
    return this.coll.valueChanges({ idField: 'id' });
  }
  getById(id: string): Observable<User | undefined> {
    return this.coll.doc<User>(id).valueChanges({ idField: 'id' });
  }
  create(item: Omit<User, 'id'>): Promise<DocumentReference<User>> {
    return this.coll.add(item);
  }
  update(id: string, data: Partial<User>): Promise<void> {
    return this.coll.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.coll.doc(id).delete();
  }
}

@Injectable({ providedIn: 'root' })
export class TopicService {
  private coll: AngularFirestoreCollection<Topic>;
  constructor(private afs: AngularFirestore) {
    this.coll = this.afs.collection<Topic>('topics');
  }
  getAll(): Observable<Topic[]> {
    return this.coll.valueChanges({ idField: 'id' });
  }
  getById(id: string): Observable<Topic | undefined> {
    return this.coll.doc<Topic>(id).valueChanges({ idField: 'id' });
  }
  create(item: Omit<Topic, 'id'>): Promise<DocumentReference<Topic>> {
    return this.coll.add(item);
  }
  update(id: string, data: Partial<Topic>): Promise<void> {
    return this.coll.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.coll.doc(id).delete();
  }
}
