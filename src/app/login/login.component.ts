import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FireserviceService } from '../shared/fireservice.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Subscription } from "rxjs/Subscription";
import { Http } from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  exist: any;
  uid: any;
  isLoggedIn: boolean;
  fireSub: Subscription;

  constructor(public fire: AngularFire, public fireservice: FireserviceService, public router: Router, private http: Http)
     {
  

  }

  ngOnInit() {

    this.fireSub = this.fire.auth.subscribe(authState => {
      if (!authState) {
        this.isLoggedIn = false;
      }
      else {
        console.log("auth sub", authState);
        this.isLoggedIn = true;
        this.saveUser(authState);

      }

    });


  }

  saveUser(authState) {
    this.exist = this.fire.database.object('/users/' + authState.uid);
    this.exist.take(1).subscribe(x => {

      if (!x.id) {
        console.log("user does not exist in db");



        this.fire.database.object('/users/' + authState.uid).update({
          id: authState.uid,
          name: authState.facebook.displayName,
          photoUrl: authState.facebook.photoURL

        });
      }


    });
  }

  getUserCoverPhoto(authState) {

    console.log("inside graph");

    let url = `https://graph.facebook.com/v2.9/me?fields=cover&access_token=${authState.facebook.accessToken}`;
    this.http.get(url).map(res => res.json())
      .subscribe(response => {

        console.log("cover RESPONSE" + JSON.stringify(response.cover.source));
        this.fire.database.object('/users/' + authState.uid).update({
          cover: response.cover.source,
          accessToken: authState.facebook.accessToken
        });
      });

  }

  login() {
    if (this.isLoggedIn) {


      this.router.navigate(['/creative']);
    }
    else {

      this.fireservice.facebookLogin().then((authState: any) => {

        console.log("vf", authState);

        /* this.fire.database.object('/users/' + authState.uid).update({
           accessToken: authState.facebook.accessToken
         });
 */
        this.getUserCoverPhoto(authState);
        this.router.navigate(['/creative']);
      });
    }


  }

  ngOnDestroy() {
  //  this.fireSub.unsubscribe();


  }

}
