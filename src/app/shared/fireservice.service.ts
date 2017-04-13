import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {user} from '../shared/model';
import 'rxjs/Rx';

@Injectable()
export class FireserviceService {
  loggedUser : user ={
    name:'',
    photoUrl:''
  };
  constructor(public af: AngularFire) { }

  facebookLogin() {
     this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(data => {
        console.log("logged in data" , data);
       this.loggedUser.name= data.auth.displayName;
        this.loggedUser.photoUrl= data.auth.photoURL;
    
    });
  }

  getLoggedinUser()
  {
    return this.loggedUser;
  }

}
