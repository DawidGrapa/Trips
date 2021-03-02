import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service"
import * as firebase from '@angular/fire/';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {


  email: string;
  pseudonim: string;
  password: string;

  constructor(private auth: AuthenticationService) { }


  wrongEmail = false;
  wrongPseudonim = false;
  wrongPassword = false;

  register(): void {
    this.auth.register(this.email, this.password, this.pseudonim)
    .catch(e => {

      this.wrongEmail = false;
      this.wrongPseudonim = false;
      this.wrongPassword = false;
      switch (e.code) {
        case 'auth/weak-password':
          this.wrongPassword = true;
          break;
        case 'auth/argument-error':
          this.wrongEmail = true;
          break;
        case 'auth/email-already-in-use':
          this.wrongPseudonim = true;
          break;
      }

      });
    }

}
