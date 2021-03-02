import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{
    public isSignedIn: Observable<any>;
    public persistence: firebase.auth.Auth.Persistence;
    private dbRef: any;

    constructor(private fireAuth: AngularFireAuth, private router: Router,private db: AngularFireDatabase){
        this.isSignedIn = new Observable((subscriber) => {
          this.fireAuth.onAuthStateChanged(subscriber);
        });
        this.dbRef = this.db.object('persistence');
    this.dbRef.valueChanges().subscribe(p => {
      switch (p) {
        case 'Session':
          this.persistence = firebase.auth.Auth.Persistence.SESSION;
          break;
        case 'None':
          this.persistence = firebase.auth.Auth.Persistence.NONE;
          break;
        case 'Local':
          this.persistence = firebase.auth.Auth.Persistence.LOCAL;
          break;
      }
    });
    }   
    logIn(email: string, password: string): Promise<any> {
        return firebase.auth().setPersistence(this.persistence)
          .then(() => {
            this.fireAuth.signInWithEmailAndPassword(email, password);
            this.router.navigate(['']);
          });
      }
    register(email: string, password: string, pseudonim: string): Promise<any> {
        return firebase.auth().setPersistence(this.persistence)
          .then(() => this.fireAuth.createUserWithEmailAndPassword(email, password))
          .then(() => {
            this.currentUser()
              .then(user => {
                user.updateProfile({ displayName: pseudonim });
                this.signOut();
                this.logIn(email, password);
                this.router.navigate(['']);
              });
          });
      } 
    signOut(): void {
        this.fireAuth.signOut().then(() => this.router.navigate(['']));
      }
    
    currentUser(): Promise<firebase.User> {
        return this.fireAuth.currentUser;
      }
    
    changePersistence(persistence: string): void {
        this.dbRef.set(persistence);
      }
    
    getPersistence(): Observable<firebase.auth.Auth.Persistence> {
        return this.dbRef.valueChanges();
      }
}