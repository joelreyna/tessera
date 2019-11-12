import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { LoginService } from './login.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // users;
  subscription: Subscription;
  params;
  error;

  constructor(private afAuth: AngularFireAuth, private router: Router, private loginService:LoginService, private route:ActivatedRoute, private ngZone: NgZone) {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.params = params;
    })
  }


  ngOnInit() {

    this.subscription = this.loginService.currentUser.subscribe(user=>{
      if(user) {
        this.router.navigate(['/user/account-verification'])
      } 
      console.log(user)
    })
  }

  onSubmit(form:NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password).then(event=>{
      console.log(event.user.emailVerified);
      if(!event.user.emailVerified) {
        this.loginService.sendVerificationMail().then(log => {
          // window.alert("Por favor verifique su email. Cheque su bandeja de entrada.")
          this.router.navigate(['/user/account-verification'])
        })
      } else {
        this.ngZone.run(() => {
          if(this.params.params.type=="ticket") {
            this.router.navigate(['/agregar-ticket'])
          }
          this.router.navigate(['/user'])
        })
      }
    }).catch(error => {
      // console.log(error)
      // if(error.code == "auth/user-not-found") {
      //   error = "El usuario no existe."
      // } else if(error.code == "auth/wrong-password") {
      //   error = "La contraseña que ingresó "
      // }
      this.error = "La contraseña que ingresó o el email son incorrectos."
    })

  }

  ngOnDestroy(): void {
    // this.ui.delete();
    this.subscription.unsubscribe()
  }

}



    // ui: firebaseui.auth.AuthUI;

    // this.loginService.getUsers().subscribe(res => {this.users = res; console.log(this.users)});
        // FirebaseUI config.
        // const uiConfig = {
        //   signInSuccessUrl: this.params.params.type == 'ticket' ? '/agregar-ticket' : '/user',
        //   signInOptions: [
        //     // Leave the lines as is for the providers you want to offer your users.
        //     // {
        //     //   provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //     //   authMethod: 'https://accounts.google.com',
        //       // Required to enable ID token credentials for this provider.
        //       // This can be obtained from the Credentials page of the Google APIs
        //       // console.
        //     //   clientId:
        //     //     '176372028272-t48gj4hujl6kjr6398pa7pfdf2pblh9c.apps.googleusercontent.com'
        //     // },
        //     // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //     // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        //     // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        //   ],
        //   // Required to enable one-tap sign-up credential helper.
        //   credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        //   // tosUrl and privacyPolicyUrl accept either url string or a callback
        //   // function.
        //   // Terms of service url/callback.
        //   // tosUrl: 'https://ajonp.com/terms',
        //   // Privacy policy url/callback.
        //   // privacyPolicyUrl: function() {
        //     // window.location.assign('https://ajonp.com/privacy');
        //   // }
        // };
    
        // this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
        // this.ui.start('#firebaseui-auth-container', uiConfig);