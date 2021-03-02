import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import {CartComponent} from "./cart/cart.component";
import { TripsListComponent } from './trips/trips-list/trips-list.component';
import { TripsDetailsComponent } from './trips/trips-details/trips-details.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PersistenceComponent } from './persistence/persistence.component';

const redirectNotLoggedIn = () => redirectUnauthorizedTo(['login']);
const redirectLoggedIn = () => redirectLoggedInTo(['']);



const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedIn } },
  { path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedIn } },
  { path: 'persistence', component: PersistenceComponent },
  {
  path: 'new', component: FormComponent, canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectNotLoggedIn }
  },
  {path: 'cart', component: CartComponent, data: { authGuardPipe: redirectNotLoggedIn }},
  {path: 'trips', component: TripsListComponent,canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectNotLoggedIn }},
  {path: '', redirectTo: '/trips', pathMatch: 'full'},
  { path: 'tripdetails/:id', component: TripsDetailsComponent, pathMatch: 'full', data: { authGuardPipe: redirectNotLoggedIn }}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
