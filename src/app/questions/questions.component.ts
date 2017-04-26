import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { FireserviceService } from './../shared/fireservice.service';
import { slideInDownAnimation } from './../shared/route-animation';
import { question } from './../shared/model';
import { Component, OnInit, HostBinding, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CanDeactivateGuard } from './can-deactivate.guard';

declare var $: any;


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [slideInDownAnimation]

})
export class QuestionsComponent implements OnInit, CanDeactivateGuard, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';


  closeResult: string;
  @ViewChild('content') content: ElementRef
  time: any;
  quizForm: FormGroup;
  questions: question[];
  arr = new FormArray([]);
  submitted: boolean = false;
  preventTimeup: boolean = false;
  show: boolean = false;
  messageTxt: string;
  messageTitle: string;
  startTime: any;
  endTime: any;
  modalButtonText: string = "ok";
  continueFlag: boolean = false;
  buttonReason: string = "close click";
  gameOver: boolean = false;
  startTimeSub: Subscription;
  timerEndSub: Subscription;
  authSub: Subscription;
  score: any;
  timeTaken: any;
  scoreUpdated: boolean = false;

  constructor(public fireservice: FireserviceService, private modalService: NgbModal, private fire: AngularFire, private router: Router,
    private route: ActivatedRoute) {


    console.log(fireservice.showQuestion);
    //this.startTime = new Date();

    this.startTimeSub = this.fireservice.startTime.subscribe(time => this.startTime = time);

    this.questions = [

      {
        question: "captital of india?",
        option1: "Chennai",
        option2: "Banglore",
        option3: "Delhi",
        option4: "Mumbai"

      },
      {
        question: "captital of Tamilnadu?",
        option1: "Chennai",
        option2: "Trichy",
        option3: "Coimbatore",
        option4: "Madurai"

      },
      {
        question: "captital of srilanka?",
        option1: "colombo",
        option2: "Kandy",
        option3: "NuwaraEliya",
        option4: "Yala"

      }
    ];

    this.quizForm = new FormGroup({
      'questions': this.arr
      // 'question': new FormControl(null)
    });

    for (let x of this.questions) {
      //  (<FormArray>this.quizForm.get('questions')).push(new FormControl(null));
      this.arr.push(new FormControl(null, Validators.required));
    }
  }

  ngOnInit() {

    this.timerEndSub = this.fireservice.timerEnd.subscribe(x => {
      if (x) {
        if (!this.preventTimeup) {
          this.modalButtonText = "ok 🐱";
          this.messageTitle = "Time Up !! ⌚"
          this.messageTxt = "um..You need to improve your GK & Time management. Your answers will be auto submitted";
          this.open(this.content)
          this.gameOver = true;
          this.submitted = true;
          this.onSubmit();
        }

      }
    });


  }

  ngOnDestroy() {
    this.startTimeSub.unsubscribe();
    this.timerEndSub.unsubscribe();
    // this.authSub.unsubscribe();
  }

  addRank() {
    // Rank Logic

    /* var arr = [79, 5, 18, 5, 32, 1, 16, 1, 82, 13];
  var sorted = arr.slice().sort(function(a,b){return b-a})
  var ranks = arr.slice().map(function(v){ return sorted.indexOf(v)+1 });*/
  }

  caclulateScore() {
    let answers = ["Delhi", "Chennai", "colombo"];
    let userAnswers = this.quizForm.get('questions').value;
    let score = 0;

    for (let q = 0; q < answers.length; q++) {
      if (answers[q] == userAnswers[q]) {
        score++;
      }
    }
    console.log("your score is ", score);
    this.score = score;

    // this.fireservice.updateScore.next(score);

  }


  updateScoreAndTime() {

    this.scoreUpdated = true;

    this.fire.auth.subscribe(authState => {
      //  authState.uid- use uid to fetch details

      if (authState) {
        this.fire.database.object('/users/' + authState.uid).update({
          score: this.score,
          time: this.timeTaken

        });
      }



    });
  }


  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    // var   minutes = Math.floor((millis % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
    // var   seconds = Math.floor(((millis % 360000) % 60000) / 1000) ;// 1 Second = 1000 Milliseconds
    // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    //  return minutes + ":" + seconds;
    return (parseInt(seconds) == 60 ? (minutes + 1) + ":00" : minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds);

  }

  onSubmit() {
    if (this.gameOver) {

      this.caclulateScore();
      this.timeTaken = "10:00";
      this.updateScoreAndTime();
      this.quizForm.reset();
      // this.preventTimeup = true;
      this.submitted = false;
      this.router.navigate(['toppers'], { relativeTo: this.route });

    }
    else {

      this.submitted = true;
      if (this.quizForm.valid) {
        this.endTime = new Date();
        this.timeTaken = this.millisToMinutesAndSeconds(this.endTime - +(this.startTime));
        this.fireservice.stopTimer.next(true);
        this.caclulateScore();
        this.updateScoreAndTime();
        this.quizForm.reset();
        //  console.log(this.quizForm.valid);
        //   console.log(this.quizForm.get('questions').value);
        this.preventTimeup = true;
        this.submitted = false;
        this.router.navigate(['toppers'], { relativeTo: this.route });

      }
      else {
        this.submitted = false;
        this.messageTitle = "what’s the hurry? ⌚"
        this.messageTxt = "Time is on your side ! . Try to answer all the questions";
        this.open(this.content)
      }

    }




  }

  open(content) {


    this.modalService.open(content).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);


    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);


    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.startTime);
    if (!this.submitted && typeof this.startTime !== 'undefined' && !this.scoreUpdated) {
      this.buttonReason = "Quit";
      this.continueFlag = true;
      this.modalButtonText = "I Quit";
      this.messageTitle = "Winners Never Quit halfway ⚠"
      this.messageTxt = "If you leave the Quiz now,your score will be ZERO ";

      //  this.open(this.content);

      return new Promise<boolean>((resolve, reject) => {
        this.modalService.open(this.content).result.then((result) => {

          this.closeResult = `Closed with: ${result}`;
          if (this.closeResult == 'Closed with: Quit') {
            this.score = 0;
            this.timeTaken = "00:00";
            this.fireservice.stopTimer.next(true);
            this.updateScoreAndTime();
            resolve(true);
            this.continueFlag = false;


          }
          else {
            resolve(false);
            this.continueFlag = false;
          }
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          resolve(false);

        });

      });



    }
    else {
      return true
    }



  }
}
