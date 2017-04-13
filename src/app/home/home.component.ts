import { Component, OnInit } from '@angular/core';
import {user} from '../shared/model';
import { FireserviceService } from '../shared/fireservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   loggedUser : user;

  constructor(public fireservice :FireserviceService ) {
    this.loggedUser= this.fireservice.getLoggedinUser();
    console.log("inside Home", this.loggedUser);
   }

  ngOnInit() {
  }

}
