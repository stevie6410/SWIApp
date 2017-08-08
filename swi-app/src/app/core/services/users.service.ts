import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import {
  ApplicationUserExtended,
  Permission,
  CreateApplication,
  ApplicationExtended,
  Application,
  Role,
  CreateRole,
  User,
  CreateUser,
  UpdatePassword,
  ResetPassword
} from "app/core";

import { handleError, handleResponse } from "../helpers/http-helper";
import { EnvironmentService } from "../../app/services/environment.service";

@Injectable()
export class UsersService {

  get serviceUrl(): string { return this.env.env.appSecurityURL + "api/v1/" };

  constructor(
    private http: Http,
    private env: EnvironmentService
  ) { }

  public getAll(): Observable<User[]> {
    return this.http.get(this.serviceUrl + 'users')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public get(username: string): Observable<User> {
    return this.http.get(this.serviceUrl + 'users/' + username)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public getByApplication(appId: number): Observable<User[]> {
    return this.http.get(this.serviceUrl + 'applications/ ' + appId + '/users')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public create(create: CreateUser): Observable<User> {
    var body = JSON.stringify(create);
    return this.http.post(this.serviceUrl + 'users', body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public update(updated: User): Observable<User> {
    var body = JSON.stringify(updated);
    return this.http.post(this.serviceUrl + 'users/' + updated.username, body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public addApplication(username: string, applicationId: number): Observable<User> {
    return this.http.post(this.serviceUrl + 'users/' + username + '/applications/' + applicationId, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public removeApplication(username: string, applicationId: number): Observable<User> {
    return this.http.delete(this.serviceUrl + 'users/' + username + '/applications/' + applicationId, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public addRole(username: string, roleId: number): Observable<User> {
    return this.http.post(this.serviceUrl + 'users/' + username + '/roles/' + roleId, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public removeRole(username: string, roleId: number): Observable<User> {
    return this.http.delete(this.serviceUrl + 'users/' + username + '/roles/' + roleId, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public updatePassword(updatePassword: UpdatePassword): Observable<User> {
    var body = JSON.stringify(updatePassword);
    return this.http.post(this.serviceUrl + 'users/updatepassword', body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public resetPassword(resetPassword: ResetPassword): Observable<User> {
    var body = JSON.stringify(resetPassword);
    return this.http.post(this.serviceUrl + 'users/resetpassword', body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public convertToDomain(username: string): Observable<User> {
    var body = JSON.stringify("");
    return this.http.post(this.serviceUrl + 'users/updatepassword', body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public delete(id: number): Observable<User> {
    return this.http.delete(this.serviceUrl + 'users/' + id)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  private get defaultOptions(): RequestOptions {
    let h = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: h });
    return options;
  }
}
