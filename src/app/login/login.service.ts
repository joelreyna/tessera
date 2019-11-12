import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import {first, switchMap} from 'rxjs/operators'
import { of, Observable } from 'rxjs';
// import 'rxjs/add/operator/switchMap'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: Observable<any>;

  constructor(private firestore: AngularFirestore, private router:Router, private afAuth: AngularFireAuth) { 
    // afAuth.authState.pipe(first()).subscribe(auth=>{
    //   this.authState = auth;
    // })
    this.user = this.afAuth.authState.pipe(switchMap(user=>{
      if(user) {
        return this.firestore.doc(`users/${user.uid}`).valueChanges()
      }else{
        return of(null)
      }
    }))
  }

  getUsers() {
    return this.firestore.collection("Users").snapshotChanges();
  }

  get authenticated(): boolean {
    console.log(this.user)
    if(this.user) {
      return true
    } else {
      return false
    }
    // return true
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if(user) {
    //     return true
    //   } else {
    //     return false
    //   }
    // })
    // return false
    // this.afAuth.authState.pipe(first()).toPromise().then(user=>{
    //   if(user) {
    //     return true
    //   } else {
    //     return false
    //   }
    // })
    // return false;
    // this.afAuth.user.pipe(first()).subscribe(user=>{
    //   if(user){
    //     return true
    //   }else {
    //     return false
    //   }
    // })
  }

  get currentUser() {
    // const user = this.afAuth.authState.pipe(first()).toPromise();
    // // console.log(user)
    // if(user) {
    //   return user;
    // } else {
    //   return null;
    // }
    return this.user;
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  signout() {
    this.afAuth.auth.signOut().then(()=> {
      this.router.navigate(['/'])
    })
    // this.afAuth.auth.signOut()
  }

}
