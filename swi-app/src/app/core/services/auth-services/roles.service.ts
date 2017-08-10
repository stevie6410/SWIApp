import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { ApplicationUserExtended, Permission, CreateApplication, ApplicationExtended, Application, Role, CreateRole } from "app/core";
import { handleError, handleResponse } from "../../helpers/http-helper";
import { EnvironmentService } from "app/app";

@Injectable()
export class RolesService {

  get serviceUrl(): string { return this.env.env.repositoryURL + "api/v1/" };

  constructor(
    private http: Http,
    private env: EnvironmentService
  ) { }

  public getAll(): Observable<Role[]> {
    return this.http.get(this.serviceUrl + 'roles')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public get(id: number): Observable<Role> {
    return this.http.get(this.serviceUrl + 'roles/' + id.toString())
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public getByApplication(appId: number): Observable<Role[]> {
    return this.http.get(this.serviceUrl + 'applications/ ' + appId + '/roles')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public create(createRole: CreateRole): Observable<Role> {
    const body = JSON.stringify(createRole);
    console.log(body);
    return this.http.post(this.serviceUrl + 'roles', body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public update(updatedRole: Role): Observable<Role> {
    const body = JSON.stringify(updatedRole);
    return this.http.post(this.serviceUrl + 'roles/' + updatedRole.id, body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public delete(id: number): Observable<Role> {
    return this.http.delete(this.serviceUrl + 'roles/' + id)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  private get defaultOptions(): RequestOptions {
    const h = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers: h });
    return options;
  }
}
