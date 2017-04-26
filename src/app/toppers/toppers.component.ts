import { AngularFire,FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FireserviceService } from './../shared/fireservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {

  usersList :FirebaseObjectObservable<any[]>;
  users:FirebaseListObservable<any[]>;

  constructor(public fire: AngularFire, public fireservice: FireserviceService) {


   }

  ngOnInit() {

     this.users = this.fire.database.list('/users');
     console.log(this.usersList);

  }

}
