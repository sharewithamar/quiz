import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { user } from '../shared/model';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";


@Injectable()
export class FireserviceService {
  timerEnd = new Subject<boolean>();
  stopTimer = new Subject<any>();
  startTime = new Subject<any>();

  showQuestion: boolean = false;
  alreadyPlayed: boolean = false;

  loggedUser: user = {
    name: '',
    photoUrl: '',
    coverUrl: ''
  };
  exist: any;
  constructor(public af: AngularFire) { }

  facebookLogin() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    })


  }

  getLoggedinUser() {
    if (this.loggedUser.name != null && this.loggedUser.name != "undefined" && this.loggedUser.name != "") {
      return this.loggedUser;
    }

  }


  isAlreadyPlayed() {
    this.af.auth.subscribe(authState => {
      //  authState.uid- use uid to fetch details


      this.af.database.object('/users/' + authState.uid).subscribe(data => {

        if (data && data.score !== null && typeof data.score !== 'undefined') {

          return true;

        }
        else {

          return false;

        }


      });





    });
  }

}
