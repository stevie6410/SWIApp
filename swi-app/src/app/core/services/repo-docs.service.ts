import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import {
  ImageStoreService,
  RepoDocument,
  SimpleRepoDocument,
  RepoCreateDocumentPayload,
  RepoDocumentPartLink,
  CreateSWIMaster,
  SWIMaster,
  CreateSWIRevision,
  SWIHeader,
  handleResponse,
  defaultOptions,
  handleError
} from "app/core";

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
    return this.http.get(url).map(res => handleResponse(res)).toPromise();
  }

  public getDocuments(): Promise<SimpleRepoDocument[]> {
    let url: string = this.baseApiUrl + this.documentsMethod;
    return this.http.get(url).map(res => handleResponse(res)).toPromise();
  }

  public createDocument(createDoc: RepoCreateDocumentPayload): Promise<RepoDocument> {
    let url: string = this.baseApiUrl + this.documentsMethod;
    let body: string = JSON.stringify(createDoc);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .toPromise();
  }

  public attatchFile(docId: number, file: string): Promise<RepoDocument> {
    let url: string = this.baseApiUrl + this.documentsMethod + docId.toString() + '/attatchfile';
    let body: string = JSON.stringify(file);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .toPromise();
  }

  public linkPart(docId: number, linkPart: RepoDocumentPartLink): Promise<RepoDocumentPartLink> {
    let url: string = this.baseApiUrl + this.documentsMethod + docId.toString() + '/linkpart';
    let body: string = JSON.stringify(linkPart);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err))
      .toPromise();
  }

  public createMaster(createMaster: CreateSWIMaster): Promise<SWIMaster> {
    let url: string = this.baseApiUrl + this.mastersMethod;
    let body: string = JSON.stringify(createMaster);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err))
      .toPromise();
  }

  public createRevision(createRevision: CreateSWIRevision): Promise<SWIMaster> {
    let url: string = `${this.baseApiUrl}${this.mastersMethod}${createRevision.swiMasterId}\\revision`;
    let body: string = JSON.stringify(createRevision);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err))
      .toPromise();
  }

  public attatchSWIFile(masterId: string, revisionId: string, swi: SWIHeader): Observable<SWIMaster> {
    console.log("Client Hash before the attach SWI call", swi.clientHash);
    let url: string = `${this.baseApiUrl}${this.mastersMethod}${masterId}\\revision\\${revisionId}\\attatchswi\\${swi.clientHash}`;
    console.log("attachSWIFile URL: ", url);
    let body: string = JSON.stringify(swi);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }

  public getMasters(): Observable<SWIMaster[]> {
    let url: string = this.baseApiUrl + this.mastersMethod;
    return this.http
      .get(url)
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }

  public getMaster(id: string): Observable<SWIMaster> {
    let url: string = this.baseApiUrl + this.mastersMethod + id.toString();
    return this.http
      .get(url)
      .map(res => handleResponse(res))
      .catch((err, caught) => handleError(err));
  }
}
