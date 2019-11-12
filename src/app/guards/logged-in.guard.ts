import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

import {Router} from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { first, take, map, tap } from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private loginService: LoginService, private router:Router, private afAuth:AngularFireAuth){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.loginService.user.pipe(take(1), map(user=>!!user), tap(loggedIn=>{
        if(!loggedIn) {
          this.router.navigate(['/login']);
          return false;
        } else if(!firebase.auth().currentUser.emailVerified) {
          this.router.navigate(['/user/account-verification'])
          return false;
        }
      }))
  }
  
}
