import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FireserviceService } from '../shared/fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exist: any;

  constructor(public fire: AngularFire, public fireservice: FireserviceService, public router: Router) {
    console.log(fire);
  }

  ngOnInit() {
    this.fire.auth.subscribe(authState => {
      //  authState.uid- use uid to fetch details
      if (!authState) {
        console.log("Not logged in");
        return;
      }
      console.log("SUccess + logged in", authState);

      console.log("userdetails", this.fireservice.loggedUser);
      this.exist = this.fire.database.object('/users/' + authState.uid);
      this.exist.take(1).subscribe(x => {
        if (x) {
          console.log("exisits", x);
          this.fireservice.loggedUser.name = x.name;
          this.fireservice.loggedUser.photoUrl= x.photoURL;
          this.router.navigate(['/home']);
        }

        else {
          console.log("Not exisits");
          this.fire.database.object('/users/' + authState.uid).update({
            id: authState.uid,
            name: authState.facebook.displayName,
            photoUrl: authState.facebook.photoURL

          });
           this.fireservice.loggedUser.name = authState.facebook.displayName;
          this.fireservice.loggedUser.photoUrl= authState.facebook.photoURL;
          this.router.navigate(['/home']);

        }
      });


    })

  }

  login() {
    this.fireservice.facebookLogin();
  }

}
