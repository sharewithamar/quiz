import { Component, OnInit, Input } from '@angular/core';
import { question } from './../shared/model';
import { FormArray, FormControl, FormGroup, Validators ,FormControlName } from '@angular/forms';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
 @Input() form: FormGroup;
  @Input() controlIndex: any;
//@Input() control :FormControl;
  @Input() question: question;

  ;


  constructor() {


   }

  ngOnInit() {
      
     // tslint:disable-next-line:no-unused-expression
    // this.currentFormControl = (<FormArray>this.form.get('questions')).controls[this.controlIndex] ;
     
/*         console.log("recievedControl",this.control);

    console.log("recievedQuestion",this.question);
        console.log("control instance",this.controlIndex);
        console.log( (<FormArray>this.form.get('questions')).controls[this.controlIndex] );
*/

  }

}
