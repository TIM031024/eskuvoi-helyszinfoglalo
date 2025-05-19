// src/app/services/auth.service.ts
import { Injectable }    from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  /** Megnézi, van-e pillanatnyi bejelentkezett user */
  public isLoggedIn(): boolean {
    // !!Promise mindig true, ezért érdemes inkább pl. egy BehaviorSubject-et használnod:
    // return this.currentUserSubject.value !== null;
    // de egyszerűsítve (csak demo):    
    let loggedIn = false;
    this.afAuth.currentUser.then(user => loggedIn = !!user);
    return loggedIn;
  }

  public signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
