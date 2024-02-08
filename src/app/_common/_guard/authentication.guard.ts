import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../_services/_specific/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

  constructor(private stockageService : SessionStorageService, private router : Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.stockageService.hasUser()){
        return true;
      } else {
        return this.router.parseUrl('login');
      }

  }
  
}
