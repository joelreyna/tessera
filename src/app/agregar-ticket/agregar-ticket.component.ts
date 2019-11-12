import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginService } from '../login/login.service';
import { take, map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-agregar-ticket',
  templateUrl: './agregar-ticket.component.html',
  styleUrls: ['./agregar-ticket.component.css']
})
export class AgregarTicketComponent implements OnInit {

  params;
  ticketId;
  ticketPass;
  uid;

  yaEstaRegistrado = false;
  registroExitoso = false;
  noAutorizado = false;

  constructor(private route: ActivatedRoute, private loginService:LoginService, private router:Router, private firestore: AngularFirestore) { 
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.params = params;
    })
  }

  ngOnInit() {
    console.log(this.params)
    this.loginService.user.pipe(take(1), tap(user=>{
      if(user) {

        this.uid = user.uid
      }
    }),map(user=>!!user)).subscribe(loggedIn=>{
      if(!loggedIn) {
        localStorage.setItem('id', this.params.params.id)
        localStorage.setItem('pass', this.params.params.pass)
        this.router.navigate(['/login'], {queryParams:{type:'ticket'}});
      } else {

        // TODO Preguntar si se le quiere agregar el ticket al usuario registrado

        if(localStorage.getItem('id')) {
          this.ticketId = localStorage.getItem('id')
          this.ticketPass = localStorage.getItem('pass')
        } else {
          this.ticketId = this.params.params.id;
          this.ticketPass = this.params.params.pass
        }

        // Obtener informacion del ticket

        // this.firestore.doc(`Tickets/${this.ticketId}`).get()

        // this.firestore.doc(`Tickets/${this.ticketId}`).valueChanges().subscribe((ticket: {cajero:string, company:string, date: Timestamp, id: string, pin: number, productos: any[], registrado: boolean, total: string})=>{
        this.firestore.doc(`Tickets/${this.ticketId}`).get().subscribe((ticketRes)=>{
          let ticket = ticketRes.data()
          // console.log(ticket.data().pin)

          if(ticket.pin == parseInt(this.ticketPass) && ticket.registrado == false) {
            // Set registrado en el ticket como True
            this.firestore.doc(`Tickets/${this.ticketId}`).update({   
              registrado: true
            }) 

            // Agregar ticket al usuario
            this.firestore.doc(`users/${this.uid}/tickets/${this.ticketId}`).set({   
              ...ticket     
            }) 

            this.firestore.doc(`users/${this.uid}/tickets/${this.ticketId}`).update({   
              registrado: true     
            }) 

            console.log('registrado correctamente')
            this.registroExitoso = true;

          } else if (ticket.registrado == true) {
            console.log('ticket anteriormente registrado')
            this.yaEstaRegistrado = true;
          } else if (ticket.pin != parseInt(this.ticketPass)) {
            console.log('pin incorrecto')
            this.noAutorizado = true;
          }
        })

        // this.firestore.doc(`Tickets/${this.ticketId}`).valueChanges().subscribe((ticket: {cajero:string, company:string, date: Timestamp, id: string, pin: number, total: string})=>{
        //   if(ticket.pin == parseInt(this.ticketPass))
        //   this.firestore.doc(`users/${this.uid}/tickets/${this.ticketId}`).set({   
        //     ticket     
        //   })
        // })
        
        // Agregar ticket al usuario
        console.log(this.uid)
        console.log(this.ticketId)
        console.log(this.ticketPass)

        localStorage.clear()
      }
    })

  }

}
