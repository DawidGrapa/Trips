import { Component, OnInit } from '@angular/core';
import{AuthenticationService} from "../services/authentication.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;
  wrongData = false;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  login():void {
    this.auth.logIn(this.email, this.password)
    .catch(() => this.wrongData = true);
    this.router.navigate(['']);
  }

}
