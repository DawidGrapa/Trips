import { Component, OnInit } from '@angular/core';
import{AuthenticationService} from "../services/authentication.service"
@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    
  }

  setNone(): void {
    this.auth.changePersistence('None');
    this.auth.signOut();
  }

  setSession(): void {
    this.auth.changePersistence('Session');
    this.auth.signOut();
  }

  setLocal(): void {
    this.auth.changePersistence('Local');
    this.auth.signOut();
  }
}
