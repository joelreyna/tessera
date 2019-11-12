import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { take, map, tap } from 'rxjs/operators';

import * as firebase from 'firebase/app'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor(private loginService: LoginService, private router:Router) { 
}
  

  ngOnInit() {
    this.loginService.user.pipe(take(1), map(user=>!!user)).subscribe(loggedIn=>{
      if(loggedIn) {
        this.router.navigate(['/user']);
        return false;
      } else if(loggedIn && !firebase.auth().currentUser.emailVerified) {
        this.router.navigate(['/user/account-verification'])
        return false;
      }
    })
  }

}
