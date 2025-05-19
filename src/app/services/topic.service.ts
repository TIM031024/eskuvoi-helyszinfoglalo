import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { Topic } from '../models';

@Injectable({ providedIn: 'root' })
export class TopicService {
  private topicsColl: CollectionReference<Topic>;

  constructor(private firestore: Firestore) {
    this.topicsColl = collection(this.firestore, 'topics') as CollectionReference<Topic>;
  }

  /** Összes téma lekérése Promise-ként */
  getAll(): Promise<Topic[]> {
    return firstValueFrom(
      collectionData(this.topicsColl, { idField: 'id' }) as Observable<Topic[]>
    );
  }

  /** Egy téma lekérése azonosító alapján */
  getById(id: string): Promise<Topic> {
    const ref = doc(this.topicsColl, id);
    return firstValueFrom(
      docData(ref, { idField: 'id' }) as Observable<Topic>
    );
  }

  /** Új téma létrehozása */
  async create(topic: Omit<Topic, 'id'>): Promise<void> {
    await addDoc(this.topicsColl, topic);
  }

  /** Téma frissítése */
  async update(id: string, data: Partial<Topic>): Promise<void> {
    const ref = doc(this.topicsColl, id);
    await updateDoc(ref, data as DocumentData);
  }

  /** Téma törlése */
  async delete(id: string): Promise<void> {
    const ref = doc(this.topicsColl, id);
    await deleteDoc(ref);
  }
}
