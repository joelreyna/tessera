import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent implements OnInit {

  error;

  constructor() { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    firebase.auth().sendPasswordResetEmail(form.value.email).then(()=>{
      console.log('Email sent')
    }).catch(error=>{
      if(error.code == "auth/invalid-email") {
        this.error="Favor de ingresar un email válido."
      }
      console.log(error)
    })
  }

}
