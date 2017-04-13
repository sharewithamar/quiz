import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Injectable()
export class FireserviceService {

  constructor(public af: AngularFire) { }

  facebookLogin() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
  }

}
