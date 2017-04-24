import { Observable } from 'rxjs/Observable';
import { FireserviceService } from './../shared/fireservice.service';
import { slideInDownAnimation } from 'app/shared/route-animation';
import { question } from './../shared/model';
import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
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
export class QuestionsComponent implements OnInit, CanDeactivateGuard {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';


  closeResult: string;
  @ViewChild('content') content: ElementRef
  time: any;
  quizForm: FormGroup;
  questions: question[];
  arr = new FormArray([]);
  submitted: boolean = false;
  show: boolean = false;
  messageTxt: string;
  messageTitle: string;
  startTime: any;
  endTime: any;
  modalButtonText: string = "ok";
  continueFlag: boolean = false;
  buttonReason: string = "close click";
  gameOver: boolean = false;

  constructor(public fireservice: FireserviceService, private modalService: NgbModal) {

    console.log(fireservice.showQuestion);
    this.startTime = new Date();

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

    this.fireservice.timerEnd.subscribe(x => {
      if (x) {
        this.modalButtonText = "ok 🐱";

        this.messageTitle = "Time Up !! ⌚"
        this.messageTxt = "um..You need to improve your GK & Time management. Your answers will be auto submitted";
        this.open(this.content)
        this.gameOver = true;
        this.onSubmit();
      }
    });


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

  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    return (parseInt(seconds) == 60 ? (minutes + 1) + ":00" : minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds);

  }

  onSubmit() {
    this.caclulateScore();
    if (this.gameOver) {

    }
    else {
      this.endTime = new Date();
      let x = this.millisToMinutesAndSeconds(this.endTime - +(this.startTime));
      console.log("difference", x);

      console.log(this.endTime - +(this.startTime));

      this.submitted = true;
      if (this.quizForm.valid) {
        this.quizForm.reset();
        console.log(this.quizForm.valid);
        console.log(this.quizForm.get('questions').value);
        this.submitted = false;
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

    if (!this.submitted) {
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


  }
}
