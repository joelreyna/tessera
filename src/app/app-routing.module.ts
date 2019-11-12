import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AgregarTicketComponent } from './agregar-ticket/agregar-ticket.component';
import { RegisterComponent } from './register/register.component';
import { AcountVerificationComponent } from './user/acount-verification/acount-verification.component';
import { AccountRecoveryComponent } from './user/account-recovery/account-recovery.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'user', component: UserComponent, canActivate: [LoggedInGuard]
  },
  {
    path: 'agregar-ticket', component: AgregarTicketComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'user/account-verification', component: AcountVerificationComponent
  },
  {
    path: 'user/account-recovery', component: AccountRecoveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
