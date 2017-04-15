import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FireserviceService } from '../shared/fireservice.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exist: any;
  uid: any;
  isLoggedIn: boolean;

  constructor(public fire: AngularFire, public fireservice: FireserviceService, public router: Router) {
  }

  ngOnInit() {

    this.fire.auth.subscribe(authState => {
      if (!authState) {
        this.isLoggedIn = false;
      }
      else {
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



  login() {
    if (this.isLoggedIn) {

      this.router.navigate(['/home']);
    }
    else {

      this.fireservice.facebookLogin().then(data => {
        this.router.navigate(['/home']);
      });
    }


  }

}
