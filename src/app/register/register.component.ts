import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error;

  constructor(private firestore: AngularFirestore, private afAuth:AngularFireAuth, private loginService: LoginService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const name = form.value.name;
    const lastname = form.value.lastname;
    const email = form.value.email;
    const password = form.value.password;

    const fullname = name + " " + lastname;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(event => {
      this.firestore.collection('users').doc(event.user.uid).set({
        displayName: fullname,
        email: event.user.email,
        uid: event.user.uid
      })

      event.user.updateProfile({
        displayName: fullname
      })

      this.loginService.sendVerificationMail().then(()=>{
        this.router.navigate(['/user/account-verification'])
      }).catch(error=>{
        console.log(error)
      });

      form.reset();

    }).catch(error => {
      if(error.code == "auth/weak-password") {
        this.error = "La contraseña debe de ser de al menos 6 caracteres."
      } else if(error.code = "auth/email-already-in-use") {
        this.error = "El email ingresado ya está en uso."
      }
      console.log(error)
    })


  }

}
