import { buttonStateTrigger } from './../shared/route-animation';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostBinding, ViewContainerRef } from '@angular/core';
import { user } from '../shared/model';
import { FireserviceService } from '../shared/fireservice.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
declare var $: any;
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



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
  stopTimerSub: Subscription;
  timer: any;
  startTimer: boolean = false;
  showQuestions: boolean = false;
  AnswerSubmitted: boolean = false;
  alreadyPlayed: boolean = false;
  yourScore: any;


  constructor(public fireservice: FireserviceService, private route: ActivatedRoute, private router: Router, private fire: AngularFire,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

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
        this.coverSub = this.fire.database.object('/users/' + authState.uid).subscribe(data => {
          this.loggedUser.coverUrl = data.cover
          this.loggedUser.photoUrl = data.photoUrl;



          if (data && data.score !== null && typeof data.score != 'undefined') {
            console.log("Already played");
            this.toastr.success('Thanks for playing!');
            this.alreadyPlayed = true;
            this.fireservice.alreadyPlayed = true;
            this.yourScore = data.score;
            // this.router.navigate(['/creative/toppers']);
          }
          else {
            console.log("there is no score");
            this.alreadyPlayed = false;
            this.fireservice.alreadyPlayed = false;


          }



        });

        this.loggedUser.name = authState.facebook.displayName;

      }


    });




    var self = this;

    this.timer = $('#timer').FlipClock(300, {
      countdown: true,
      clockFace: 'MinuteCounter',
      autoStart: false,
      callbacks: {
        stop: function () {
          if (!self.AnswerSubmitted) {
            self.fireservice.timerEnd.next(true);
          }


        }
      }
    });

    this.stopTimerSub = this.fireservice.stopTimer.subscribe(x => {
      if (x && x !== "stop") {
        this.AnswerSubmitted = true;
        this.timer.stop();
      }
      else {
        this.AnswerSubmitted = true;
        this.timer.reset();
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
      this.fireservice.startTime.next(new Date());
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
    this.stopTimerSub.unsubscribe();
  }

  animationDone(e) {
    if (e.toState == "valid") {
      this.showQuestions = true;
      //  this.fireservice.showQuesAnim.next(true);
      this.fireservice.showQuestion = true;
    }
  }




}
