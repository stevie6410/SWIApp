import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx"

import { ApplicationUserExtended, Permission, CreateApplication, ApplicationExtended, Application, Company } from "app/core";
import { handleError, handleResponse, defaultOptions } from "../../helpers/http-helper";
import { EnvironmentService } from "app/app";

@Injectable()
export class CompaniesService {

  get serviceUrl(): string { return this.env.env.appSecurityURL + "api/v1/" };

  constructor(
    private http: Http,
    private env: EnvironmentService
  ) { }

  public getAll(): Observable<Company[]> {
    return this.http.get(this.serviceUrl + 'companies')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }
}
