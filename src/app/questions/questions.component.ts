import { question } from './../shared/model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  time: any;
  quizForm: FormGroup;
  questions : question[];
  arr = new FormArray([]);

  
  constructor() {
this.questions=[

   {
     question : "captital of india?",
     option1 : "Chennai",
      option2 : "Banglore",
     option3 : "Delhi",
     option4: "Mumbai"

   },
   {
     question : "captital of Tamilnadu?",
     option1 : "Chennai",
      option2 : "Trichy",
     option3 : "Coimbatore",
     option4: "Madurai"

   }
];

    this.quizForm = new FormGroup({
       'questions': this.arr
     // 'question': new FormControl(null)
    });

    for(let x of  this.questions)
    {
       //  (<FormArray>this.quizForm.get('questions')).push(new FormControl(null));
       this.arr.push(new FormControl(null));
    }
   }

  ngOnInit() {
  



  }

  onSubmit() {
    console.log(this.quizForm.value);
    console.log(this.quizForm.get('questions').value);
    // this.quizForm.reset();
  }
}
