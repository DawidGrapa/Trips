import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormComponent } from './form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { FiltersComponent } from './filters/filters.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { TripsListComponent } from './trips/trips-list/trips-list.component';
import { TripsDetailsComponent } from './trips/trips-details/trips-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersistenceComponent } from './persistence/persistence.component';
import {AuthenticationService} from "./services/authentication.service"
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CartComponent,
    FiltersComponent,
    TripsListComponent,
    TripsDetailsComponent,
    LoginComponent,
    RegisterComponent,
    PersistenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ AngularFireDatabase, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
