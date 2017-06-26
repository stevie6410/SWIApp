import { ToolingSearchCriteria } from './../models/app.models';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions, URLSearchParams } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { StandardTool, CreateStandardTool, defaultOptions, handleResponse, handleError } from "app/core";

@Injectable()
export class RepoStandardToolingService {

  private baseApiUrl: string = "http://localhost:4201/api/v1/";
  private stdToolingMethod: string = "standardtools/"

  constructor(
    private http: Http
  ) { }

  public getAll(): Observable<StandardTool[]> {
    return this.http.get(this.baseApiUrl + this.stdToolingMethod)
      .map(r => handleResponse(r));
  }

  public get(id: number): Observable<StandardTool> {
    return this.http.get(this.baseApiUrl + this.stdToolingMethod + '/' + id)
      .map(r => handleResponse(r));
  }

  public search(criteria: ToolingSearchCriteria): Observable<StandardTool[]> {
    let params: URLSearchParams = new URLSearchParams();
    if (criteria.term) params.set("term", criteria.term);
    if (criteria.toolNumber) params.set("toolNumber", criteria.toolNumber.toString());
    if (criteria.hasCarePoint) params.set("hasCarePoint", (criteria.hasCarePoint) ? "true" : "false");
    if (criteria.hasLinkedSWI) params.set("hasLinkedSWI", (criteria.hasLinkedSWI) ? "true" : "false");

    return this.http.get(this.baseApiUrl + this.stdToolingMethod + "search", { params: params })
      .map(r => handleResponse(r));
  }

  public create(createTool: CreateStandardTool): Observable<StandardTool> {
    let url: string = `${this.baseApiUrl}${this.stdToolingMethod}`;
    let body: string = JSON.stringify(createTool);
    console.log("url", url);
    // console.log("body", body);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }

  public update(tool: StandardTool): Observable<StandardTool> {
    let url: string = `${this.baseApiUrl}${this.stdToolingMethod}`;
    let body: string = JSON.stringify(tool);
    console.log("url", url);
    // console.log("body", body);
    return this.http
      .put(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }

  public delete(id: number): Observable<boolean> {
    let url: string = `${this.baseApiUrl}${this.stdToolingMethod}${id.toString()}`;
    console.log("url", url);
    return this.http
      .delete(url)
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }
}
