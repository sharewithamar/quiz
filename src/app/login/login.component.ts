import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {FireserviceService} from '../shared/fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fire: AngularFire,public fireservice: FireserviceService) {
    console.log(fire);
   }

  ngOnInit() {
  }
  
  login()
  {
    this.fireservice.facebookLogin().then(data => {
        console.log("logged in data" , data);
    });
  }

}
