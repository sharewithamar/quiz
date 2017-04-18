import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {user} from '../shared/model';
import { FireserviceService } from '../shared/fireservice.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
declare var $:any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUser: user = {
    name: '',
    photoUrl: ''
  };


   

  constructor(public fireservice :FireserviceService ,private route: ActivatedRoute ,private router:Router,private fire : AngularFire ) {
  //  this.loggedUser= this.fireservice.getLoggedinUser();
  //  console.log("inside Home", this.loggedUser);
   }

  ngOnInit() {


 this.fire.auth.subscribe(authState => {
      //  authState.uid- use uid to fetch details
      if (!authState) {
         this.router.navigate(['/']);
        console.log("Not logged in");
        return;
      }
      else 
      {
         this.loggedUser.name= authState.facebook.displayName;
         this.loggedUser.photoUrl=authState.facebook.photoURL;
      }
     
     
      }); 



			 $('#timer').FlipClock(600,{
				countdown: true,
				clockFace: 'MinuteCounter'
			});

  }

  logout()
  {
    this.fire.auth.logout();
    this.router.navigate(['/']);
  }




}
