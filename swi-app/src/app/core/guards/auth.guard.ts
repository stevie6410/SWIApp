import { Injectable } from "@angular/core";
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "app/core";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedIn(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedIn(state);
  }

  private isLoggedIn(state: RouterStateSnapshot) {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    console.log("AuthGuard - User", this.authService.loggedInUser);
    if (!isLoggedIn) { this.authService.redirectToLogin(state.url); }
    return this.authService.isLoggedIn();
  }

}
