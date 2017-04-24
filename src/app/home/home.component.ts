import { buttonStateTrigger } from './../shared/route-animation';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostBinding } from '@angular/core';
import { user } from '../shared/model';
import { FireserviceService } from '../shared/fireservice.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
declare var $: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [buttonStateTrigger]

})
export class HomeComponent implements OnInit, OnDestroy {


  loggedUser: user = {
    name: '',
    photoUrl: '',
    coverUrl: ''
  };
  fireSub: Subscription;
  coverSub: Subscription;
  timer: any;
  startTimer: boolean = false;
  showQuestions: boolean = false;


  constructor(public fireservice: FireserviceService, private route: ActivatedRoute, private router: Router, private fire: AngularFire) {
    //  this.loggedUser= this.fireservice.getLoggedinUser();
    //  console.log("inside Home", this.loggedUser);
  }

  ngOnInit() {



    this.fireSub = this.fire.auth.subscribe(authState => {
      //  authState.uid- use uid to fetch details

      if (!authState) {
        this.router.navigate(['/']);
        console.log("Not logged in");
        return;
      }
      else {
        this.coverSub = this.fire.database.object('/users/' + authState.uid).subscribe(data => { this.loggedUser.coverUrl = data.cover });

        this.loggedUser.name = authState.facebook.displayName;
        this.loggedUser.photoUrl = authState.facebook.photoURL;
      }


    });



    var self = this;

    this.timer = $('#timer').FlipClock(10, {
      countdown: true,
      clockFace: 'MinuteCounter',
      autoStart: false,
      callbacks: {
        stop: function () {
          self.fireservice.timerEnd.next(true);

        }
      }
    });

  }


  showTimer() {


    if (this.timer.getTime().time == 0) {

      this.timer.reset(() => {
        this.timer.start();

      });
    }
    else {
      this.timer.start();
    }




  }

  logout() {
    this.fire.auth.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.fireSub.unsubscribe();
    this.coverSub.unsubscribe();
  }

  animationDone(e) {
    if (e.toState == "valid") {
      this.showQuestions = true;
      //  this.fireservice.showQuesAnim.next(true);
      this.fireservice.showQuestion = true;
    }
  }




}
