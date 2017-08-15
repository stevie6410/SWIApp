import { Injectable } from "@angular/core";
import { Http, RequestOptions, RequestMethod, Headers } from "@angular/http";
import { EnvironmentService } from "app/app/services/environment.service";
import { Observable } from "rxjs/Observable";
import { defaultOptions, AuthUser } from "app/core";
import { Subject } from "rxjs/Subject";
import { JwtHelper } from "angular2-jwt";
import { Router } from "@angular/router";
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  appSecurityURL: string;
  appId = "SWIAPP";
  jwtHelper = new JwtHelper();
  _loggedInUser: AuthUser;


  constructor(
    private http: Http,
    private env: EnvironmentService,
    private router: Router
  ) {
    this.appSecurityURL = env.env.appSecurityURL + "api/v1/";
  }

  login(username: string, password: string): Observable<string> {
    const s = new Subject<string>();

    const body = JSON.stringify({ username: username, password: password, appId: this.appId });
    const headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers: headers });

    this.http
      .post(this.appSecurityURL + "auth/login", body, { headers: headers })
      .map(x => x.json())
      .subscribe(token => {
        console.log("AuthService: login", token);
        window.localStorage.removeItem("auth-token");
        window.localStorage.setItem("auth-token", token);
        this.updateLoggedInUser(token);
        s.next(token);
        s.complete();
      }, (err) => {
        console.log("AuthService: login error", err);
        this._loggedInUser = null;
        s.error(err);
      });

    return s.asObservable();
  }

  logout() {
    window.localStorage.removeItem("auth-token");
    this._loggedInUser = null;
  }

  isLoggedIn(): boolean {
    const token = window.localStorage.getItem("auth-token");
    if (!token) { return false; }
    return !this.jwtHelper.isTokenExpired(token);
  }

  redirectToLogin(returnURL: string) {
    this.router.navigate(["login"], { queryParams: { returnURL: returnURL } });
  }

  public get loggedInUser(): AuthUser {
    if (this._loggedInUser) { return this._loggedInUser; }
    if (this.isLoggedIn()) {
      this.updateLoggedInUser(window.localStorage.getItem("auth-token"));
      return this._loggedInUser;
    }
    return null;
  }

  private updateLoggedInUser(token: string) {
    const decodeToken = this.jwtHelper.decodeToken(token);
    this._loggedInUser = new AuthUser();
    this._loggedInUser.permissions = JSON.parse(decodeToken.permissions);
    this._loggedInUser.username = decodeToken.unique_name;
    this._loggedInUser.fullName = decodeToken.given_name;
    this._loggedInUser.role = decodeToken.role;
    this._loggedInUser.expiresOn = this.jwtHelper.getTokenExpirationDate(token);
    this._loggedInUser.isExpired = this.jwtHelper.isTokenExpired(token);
  }

}

