import { Injectable } from "@angular/core";
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "app/core";

@Injectable()
export class AuthGuard implements CanActivateChild {


  constructor(
    private authService: AuthService
  ) { }

  canActivateChild() {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    console.log("AuthGuard - User", this.authService.loggedInUser);
    if (!isLoggedIn) { this.authService.redirectToLogin(); }
    return this.authService.isLoggedIn();
  }

}
