import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ApplicationUserExtended, Permission, CreateApplication, ApplicationExtended, Application } from 'app/core';
import { handleError, handleResponse, defaultOptions } from '../../helpers/http-helper';
import { EnvironmentService } from 'app/app';

@Injectable()
export class ApplicationsService {

  get serviceUrl(): string { return this.env.env.repositoryURL + 'api/v1/'; };

  constructor(
    private http: Http,
    private env: EnvironmentService
  ) { }

  public getAll(): Observable<Application[]> {
    return this.http.get(this.serviceUrl + 'applications')
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public get(id: number): Observable<ApplicationExtended> {
    return this.http.get(this.serviceUrl + 'applications/' + id.toString())
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public create(createApp: CreateApplication): Observable<Application> {
    const h = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(createApp);
    return this.http.post(this.serviceUrl + 'applications', body, { headers: h })
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }

  public update(updatedApp: Application): Observable<Application> {
    const h = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(updatedApp);

    return this.http.post(this.serviceUrl + 'applications/' + updatedApp.id, body, { headers: h })
      .map(r => handleResponse(r))
      .catch(e => handleError(e));
  }
}
