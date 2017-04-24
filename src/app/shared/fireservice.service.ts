import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { user } from '../shared/model';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";


@Injectable()
export class FireserviceService {
    timerEnd = new Subject<boolean>();
   
    showQuestion:boolean =false;

  loggedUser: user = {
    name: '',
    photoUrl: '',
    coverUrl:''
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

}
