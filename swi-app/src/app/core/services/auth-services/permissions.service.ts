import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx"

import { handleError, handleResponse } from "../../helpers/http-helper";
import { EnvironmentService } from "app/app";
import {
  ApplicationUserExtended,
  Permission,
  CreateApplication,
  ApplicationExtended,
  Application,
  Role,
  CreateRole,
  CreatePermission
} from "app/core";

@Injectable()
export class PermissionsService {
  get serviceUrl(): string { return this.env.env.repositoryURL + "api/v1/" };

  constructor(
    private http: Http,
    private env: EnvironmentService
  ) { }

  public getAll(): Observable<Permission[]> {
    return this.http.get(this.serviceUrl + 'permissions')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public get(id: number): Observable<Permission> {
    return this.http.get(this.serviceUrl + 'permissions/' + id.toString())
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public getByRole(roleId: number): Observable<Permission[]> {
    console.log("roleId", roleId);
    return this.http.get(this.serviceUrl + 'roles/' + roleId + '/permissions')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public create(createPermission: CreatePermission): Observable<Permission> {
    const body = JSON.stringify(createPermission);
    console.log(body);
    return this.http.post(this.serviceUrl + 'permissions', body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public update(updatedPermission: Permission): Observable<Permission> {
    const body = JSON.stringify(updatedPermission);
    return this.http.post(this.serviceUrl + 'permissions/' + updatedPermission.id, body, this.defaultOptions)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public delete(id: number): Observable<Permission> {
    return this.http.delete(this.serviceUrl + 'permissions/' + id)
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  private get defaultOptions(): RequestOptions {
    const h = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers: h });
    return options;
  }
}
