import { slideInDownAnimation } from 'app/shared/route-animation';
import { question } from './../shared/model';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
//declare var $:any;


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [slideInDownAnimation]

})
export class QuestionsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  time: any;
  quizForm: FormGroup;
  questions: question[];
  arr = new FormArray([]);
  submitted: boolean = false;


  constructor() {
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
        option1: "Chennai",
        option2: "Trichy",
        option3: "Coimbatore",
        option4: "Madurai"

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


     //   $("#scrollContent").niceScroll();


  }

  addRank() {
    // Rank Logic

    /* var arr = [79, 5, 18, 5, 32, 1, 16, 1, 82, 13];
  var sorted = arr.slice().sort(function(a,b){return b-a})
  var ranks = arr.slice().map(function(v){ return sorted.indexOf(v)+1 });*/
  }

  caclulateScore() {
    let answers = ["Delhi", "Chennai"];
    let userAnswers = this.quizForm.get('questions').value;
    let score = 0;

    for (let q = 0; q < answers.length; q++) {
      if (answers[q] == userAnswers[q]) {
        score++;
      }
    }
    console.log("your score is ", score);

  }

  onSubmit() {
    this.caclulateScore();
    this.submitted = true;
    if (this.quizForm.valid) {
      this.quizForm.reset();
      console.log(this.quizForm.valid);
      console.log(this.quizForm.get('questions').value);
      this.submitted = false;
    }



  }
}
