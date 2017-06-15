import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from "@angular/http";
import { RepoDocument, SimpleRepoDocument, RepoCreateDocumentPayload, RepoDocumentPartLink, CreateSWIMaster, CreateSWIRevision, SWIMaster } from "../models/repo.models";
import { Observable } from "rxjs/Rx";
import { SWIHeader } from "app/models/app.models";
import { Subject } from "rxjs/Subject";
import { ImageStoreService } from "./image-store.service";

@Injectable()
export class RepoDocsService {

  private baseApiUrl: string = "http://localhost:4201/api/v1/";
  private documentsMethod: string = "documents/"
  private mastersMethod: string = "swi/master/";

  constructor(
    private http: Http,
    private imageStore: ImageStoreService
  ) { }

  public getDocument(id: number): Promise<RepoDocument> {
    let url: string = this.baseApiUrl + this.documentsMethod + id.toString();
    return this.http.get(url).map(res => this.handleResponse(res)).toPromise();
  }

  public getDocuments(): Promise<SimpleRepoDocument[]> {
    let url: string = this.baseApiUrl + this.documentsMethod;
    return this.http.get(url).map(res => this.handleResponse(res)).toPromise();
  }

  public createDocument(createDoc: RepoCreateDocumentPayload): Promise<RepoDocument> {
    let url: string = this.baseApiUrl + this.documentsMethod;
    let body: string = JSON.stringify(createDoc);
    return this.http
      .post(url, body, this.defaultOptions())
      .map(res => this.handleResponse(res))
      .toPromise();
  }

  public attatchFile(docId: number, file: string): Promise<RepoDocument> {
    let url: string = this.baseApiUrl + this.documentsMethod + docId.toString() + '/attatchfile';
    let body: string = JSON.stringify(file);
    return this.http
      .post(url, body, this.defaultOptions())
      .map(res => this.handleResponse(res))
      .toPromise();
  }

  public linkPart(docId: number, linkPart: RepoDocumentPartLink): Promise<RepoDocumentPartLink> {
    let url: string = this.baseApiUrl + this.documentsMethod + docId.toString() + '/linkpart';
    let body: string = JSON.stringify(linkPart);
    return this.http
      .post(url, body, this.defaultOptions())
      .map(res => this.handleResponse(res))
      .catch((err, caught) => this.handleError(err))
      .toPromise();
  }

  public createMaster(createMaster: CreateSWIMaster): Promise<SWIMaster> {
    let url: string = this.baseApiUrl + this.mastersMethod;
    let body: string = JSON.stringify(createMaster);
    return this.http
      .post(url, body, this.defaultOptions())
      .map(res => this.handleResponse(res))
      .catch((err, caught) => this.handleError(err))
      .toPromise();
  }

  public createRevision(createRevision: CreateSWIRevision): Promise<SWIMaster> {
    let url: string = `${this.baseApiUrl}${this.mastersMethod}${createRevision.swiMasterId}\\revision`;
    let body: string = JSON.stringify(createRevision);
    return this.http
      .post(url, body, this.defaultOptions())
      .map(res => this.handleResponse(res))
      .catch((err, caught) => this.handleError(err))
      .toPromise();
  }

  public attatchSWIFile(masterId: string, revisionId: string, swi: SWIHeader): Observable<SWIMaster> {
    console.log("Client Hash before the attach SWI call", swi.clientHash);
    let url: string = `${this.baseApiUrl}${this.mastersMethod}${masterId}\\revision\\${revisionId}\\attatchswi\\${swi.clientHash}`;
    console.log("attachSWIFile URL: ", url);
    let body: string = JSON.stringify(swi);
    return this.http
      .post(url, body, this.defaultOptions())
      .map(res => this.handleResponse(res))
      .catch((err, caught) => this.handleError(err));
  }

  public getMasters(): Observable<SWIMaster[]> {
    let url: string = this.baseApiUrl + this.mastersMethod;
    return this.http
      .get(url)
      .map(res => this.handleResponse(res))
      .catch((err, caught) => this.handleError(err));
  }

  public getMaster(id: string): Observable<SWIMaster> {
    let url: string = this.baseApiUrl + this.mastersMethod + id.toString();
    return this.http
      .get(url)
      .map(res => this.handleResponse(res))
      .catch((err, caught) => this.handleError(err));
  }

  //Private Helper Functions
  private defaultOptions(): RequestOptions {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  private handleResponse(res: Response): any {
    return res.json();
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      errMsg = `${body.message}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
