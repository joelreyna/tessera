import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId;
  tickets: any[] = [];
  loading = true;
  user;

  constructor(private loginService:LoginService, private firestore:AngularFirestore, private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user=>{
      this.userId = user.uid;
      this.user = user;
    })
  }

  ngOnInit() {
    this.firestore.collection('users').doc(this.userId).collection('tickets').get().subscribe(docs => {
      docs.docs.forEach(document => {
        this.tickets.push(document.data());
      });
      this.loading = false;
      console.log(this.user)
      console.log(this.tickets)
    })

  }

  addTicket() {
    this.loginService.currentUser.subscribe(user=> {
      console.log(user.uid)
      this.firestore.doc(`users/${user.uid}/orders/otherdoc2`).set({
        
          coca: 12,
          etc: "hello"
       
      }, {merge:true})
      console.log(user.uid)
    })
  }

  onLogout() {
    this.loginService.signout();
  }

}
