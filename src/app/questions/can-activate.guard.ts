import { AngularFire } from 'angularfire2';
import { FireserviceService } from './../shared/fireservice.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActivateGuard implements CanActivate {
    constructor(public fireservice: FireserviceService, private fire: AngularFire,private router: Router ,private route: ActivatedRoute) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      
        if (this.fireservice.isAlreadyPlayed) {
            console.log("here");
           // this.router.navigate(['toppers'], { relativeTo: this.route });
             this.router.navigate(['/creative/toppers']);
        }
        else {
            return true;

        }
    }
}