import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy,HostBinding } from '@angular/core';
import {user} from '../shared/model';
import { FireserviceService } from '../shared/fireservice.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
declare var $:any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit, OnDestroy {


    loggedUser: user = {
    name: '',
    photoUrl: '',
    coverUrl:''
  };
  fireSub: Subscription;
  coverSub: Subscription;


   

  constructor(public fireservice :FireserviceService ,private route: ActivatedRoute ,private router:Router,private fire : AngularFire ) {
  //  this.loggedUser= this.fireservice.getLoggedinUser();
  //  console.log("inside Home", this.loggedUser);
   }

  ngOnInit() {



 this.fireSub=this.fire.auth.subscribe(authState => {
      //  authState.uid- use uid to fetch details
      
      if (!authState) {
         this.router.navigate(['/']);
        console.log("Not logged in");
        return;
      }
      else 
      {
      this.coverSub=  this.fire.database.object('/users/' + authState.uid).subscribe(data=> {this.loggedUser.coverUrl= data.cover});  

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

 ngOnDestroy() {
     this.fireSub.unsubscribe();
     this.coverSub.unsubscribe();
    }



}
