import { ActivatedRoute } from "@angular/router";
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions, URLSearchParams } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { EnvironmentService } from "app/app/services/environment.service";
import {
  StandardTool,
  CreateStandardTool,
  defaultOptions,
  handleResponse,
  handleError,
  ToolingSearchCriteria,
  EnvironmentConfiguration
} from "app/core";

@Injectable()
export class RepoStandardToolingService {

  private baseApiUrl: string;
  private stdToolingMethod: "api/v1/standardtools/";

  constructor(
    private http: Http,
    private environment: EnvironmentService
  ) {
    this.baseApiUrl = environment.env.repositoryURL;
  }

  public getAll(): Observable<StandardTool[]> {
    const url = this.baseApiUrl + this.stdToolingMethod;
    console.log("GetAll", url);
    return this.http.get(url)
      .map(r => handleResponse(r));
  }

  public get(id: number): Observable<StandardTool> {
    const url = this.baseApiUrl + this.stdToolingMethod + id;
    console.log("Get", url);
    return this.http.get(url)
      .map(r => handleResponse(r));
  }

  public search(criteria: ToolingSearchCriteria): Observable<StandardTool[]> {
    const params: URLSearchParams = new URLSearchParams();
    if (criteria.term) { params.set("term", criteria.term); }
    if (criteria.toolNumber) { params.set("toolNumber", criteria.toolNumber.toString()); }
    if (criteria.hasCarePoint) { params.set("hasCarePoint", (criteria.hasCarePoint) ? "true" : "false"); }
    if (criteria.hasLinkedSWI) { params.set("hasLinkedSWI", (criteria.hasLinkedSWI) ? "true" : "false"); }

    const url = this.baseApiUrl + this.stdToolingMethod + 'search';
    console.log("Search", url);

    return this.http.get(url, { params: params })
      .map(r => handleResponse(r));
  }

  public create(createTool: CreateStandardTool): Observable<StandardTool> {
    const url = `${this.baseApiUrl}${this.stdToolingMethod}`;
    const body: string = JSON.stringify(createTool);
    console.log("Create", url);
    // console.log("body", body);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }

  public update(tool: StandardTool): Observable<StandardTool> {
    const url = `${this.baseApiUrl}${this.stdToolingMethod}`;
    const body: string = JSON.stringify(tool);
    console.log("Update", url);
    // console.log("body", body);
    return this.http
      .put(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }

  public delete(id: number): Observable<boolean> {
    const url = `${this.baseApiUrl}${this.stdToolingMethod}${id.toString()}`;
    console.log("Delete", url);
    return this.http
      .delete(url)
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }
}
