import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RdAuthenticateService } from '../../services/authentication/rd-authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class RdAuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  [x: string]: any;
  constructor(
    private router: Router,
    private rdAuthenticate: RdAuthenticateService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.rdAuthenticate.getLocalStorageData();
    if (currentUser!==null) {
      // authorised so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/home']);
      return false;
    }
   
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
