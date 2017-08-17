import { ActivatedRoute } from "@angular/router";
import { Injectable, ErrorHandler } from '@angular/core';
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
import { GlobalErrorHandler } from "app/app/services/error-handler.service";

@Injectable()
export class RepoStandardToolingService {

  private baseApiUrl: string;
  private stdToolingMethod = "api/v1/standardtools/";
  private errorHandler: GlobalErrorHandler;
  private friendlyError = "Error communicating with SWI Standard Tooling Libray";

  constructor(
    private http: Http,
    private environment: EnvironmentService,
    private globalErrorHandler: ErrorHandler
  ) {
    this.errorHandler = globalErrorHandler as GlobalErrorHandler;
    this.baseApiUrl = environment.env.repositoryURL;
  }

  public getAll(): Observable<StandardTool[]> {
    const url = this.baseApiUrl + this.stdToolingMethod;
    console.log("GetAll", url);
    return this.http.get(url)
      .map(r => handleResponse(r))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + " : Get Standard Tools"));
  }

  public get(id: number): Observable<StandardTool> {
    const url = this.baseApiUrl + this.stdToolingMethod + id;
    console.log("Get", url);
    return this.http.get(url)
      .map(r => handleResponse(r))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + " : Get Standard Tool"));
  }

  public search(criteria: ToolingSearchCriteria): Observable<StandardTool[]> {
    console.log("Search criteria: ", criteria);
    const params: URLSearchParams = new URLSearchParams();
    if (criteria.term) { params.set("term", criteria.term); }
    if (criteria.toolNumber) { params.set("toolNumber", criteria.toolNumber.toString()); }
    if (criteria.hasCarePoint) { params.set("hasCarePoint", (criteria.hasCarePoint) ? "true" : "false"); }
    if (criteria.hasLinkedSWI) { params.set("hasLinkedSWI", (criteria.hasLinkedSWI) ? "true" : "false"); }

    console.log("BaseURL: ", this.baseApiUrl);
    console.log("StdToolingMethod: ", this.stdToolingMethod);

    const url = this.baseApiUrl + this.stdToolingMethod + 'search';
    console.log("Search", url);

    return this.http.get(url, { params: params })
      .map(r => handleResponse(r))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + " : Search Standard Tools"));
  }

  public create(createTool: CreateStandardTool): Observable<StandardTool> {
    const url = `${this.baseApiUrl}${this.stdToolingMethod}`;
    const body: string = JSON.stringify(createTool);
    console.log("Create", url);
    // console.log("body", body);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + " : Create Standard Tool"));
  }

  public update(tool: StandardTool): Observable<StandardTool> {
    const url = `${this.baseApiUrl}${this.stdToolingMethod}`;
    const body: string = JSON.stringify(tool);
    console.log("Update", url);
    // console.log("body", body);
    return this.http
      .put(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + " : Update Standard Tool"));
  }

  public delete(id: number): Observable<boolean> {
    const url = `${this.baseApiUrl}${this.stdToolingMethod}${id.toString()}`;
    console.log("Delete", url);
    return this.http
      .delete(url)
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + " : Delete Standard Tools"));
  }
}
