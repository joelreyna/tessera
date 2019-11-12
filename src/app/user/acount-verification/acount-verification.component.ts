import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

import * as firebase from 'firebase/app'
import { Router } from '@angular/router';

@Component({
  selector: 'app-acount-verification',
  templateUrl: './acount-verification.component.html',
  styleUrls: ['./acount-verification.component.css']
})
export class AcountVerificationComponent implements OnInit {

  email;

  constructor(private loginService:LoginService, private router: Router) { 
    // console.log(firebase.auth().currentUser)
  }

  ngOnInit() {
    this.email = firebase.auth().currentUser.email;
    if(firebase.auth().currentUser.emailVerified) {
      this.router.navigate(['/user'])
    }
  }

  sendEmail() {
    this.loginService.sendVerificationMail().catch(error=>console.log(error))
  }

  logout() {
    this.loginService.signout()
  }

}
