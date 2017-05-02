import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { FireserviceService } from '../shared/fireservice.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';


@Injectable()
export class NameGuard implements CanActivate {
    constructor(public fireservice: FireserviceService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("inside guard");
         if(this.fireservice.alreadyPlayed == true)
           {
                console.log("inside guard check already played");
                this.router.navigate(['/creative/toppers']);
                
                return false;
           } 
           else
           {
               return true;
           }
    }
}