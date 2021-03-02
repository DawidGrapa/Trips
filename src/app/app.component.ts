import { Component, OnInit } from '@angular/core';
import { trips } from './Trips';
import { ITour } from './ITour';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'zad7';
  
  isLoggedIn = false;
  userName: string;

  constructor(private auth: AuthenticationService){}

  ngOnInit():void{
      this.auth.isSignedIn.subscribe((user) => {
        if(user == null) this.isLoggedIn = false;
        else{
          this.isLoggedIn=true;
          this.userName=user.displayName;
        }
      }
      )

  }
  
  signOut(): void {
    this.auth.signOut();
    window.location.reload();
  }

}
