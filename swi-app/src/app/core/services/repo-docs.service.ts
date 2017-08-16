import { Injectable, ErrorHandler } from "@angular/core";
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
  defaultOptions
} from "app/core";
import { EnvironmentService } from "app/app/services/environment.service";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { GlobalErrorHandler } from "app/app/services/error-handler.service";

@Injectable()
export class RepoDocsService {

  private baseApiUrl: string;
  private documentsMethod = "api/v1/documents/";
  private mastersMethod = "api/v1/swi/master/";
  private errorHandler: GlobalErrorHandler;
  private friendlyErrorMessage = "Error communicating with the SWI Repositroy";

  constructor(
    private http: Http,
    private imageStore: ImageStoreService,
    private environment: EnvironmentService,
    private globalErrHandler: ErrorHandler
  ) {
    this.baseApiUrl = this.environment.env.repositoryURL;
    this.errorHandler = globalErrHandler as GlobalErrorHandler;
  }

  public getDocument(id: number): Promise<RepoDocument> {
    const url: string = this.baseApiUrl + this.documentsMethod + id.toString();
    return this.http.get(url, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Get Document'))
      .toPromise();
  }

  public getDocuments(): Promise<SimpleRepoDocument[]> {
    const url: string = this.baseApiUrl + this.documentsMethod;
    return this.http.get(url, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Get Documents'))
      .toPromise();
  }

  public createDocument(createDoc: RepoCreateDocumentPayload): Promise<RepoDocument> {
    const url: string = this.baseApiUrl + this.documentsMethod;
    const body: string = JSON.stringify(createDoc);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Create Document'))
      .toPromise();
  }

  public attatchFile(docId: number, file: string): Promise<RepoDocument> {
    const url: string = this.baseApiUrl + this.documentsMethod + docId.toString() + "/attatchfile";
    const body: string = JSON.stringify(file);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Attach File'))
      .toPromise();
  }

  public linkPart(docId: number, linkPart: RepoDocumentPartLink): Promise<RepoDocumentPartLink> {
    const url: string = this.baseApiUrl + this.documentsMethod + docId.toString() + "/linkpart";
    const body: string = JSON.stringify(linkPart);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Link Part'))
      .toPromise();
  }

  public createMaster(createMaster: CreateSWIMaster): Promise<SWIMaster> {
    const url: string = this.baseApiUrl + this.mastersMethod;
    const body: string = JSON.stringify(createMaster);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Create Master'))
      .toPromise();
  }

  public createRevision(createRevision: CreateSWIRevision): Promise<SWIMaster> {
    const url = `${this.baseApiUrl}${this.mastersMethod}${createRevision.swiMasterId}\\revision`;
    const body: string = JSON.stringify(createRevision);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Create Revision'))
      .toPromise();
  }

  public attatchSWIFile(masterId: string, revisionId: string, swi: SWIHeader): Observable<SWIMaster> {
    console.log("Client Hash before the attach SWI call", swi.clientHash);
    const url = `${this.baseApiUrl}${this.mastersMethod}${masterId}\\revision\\${revisionId}\\attatchswi\\${swi.clientHash}`;
    console.log("attachSWIFile URL: ", url);
    const body: string = JSON.stringify(swi);
    return this.http
      .post(url, body, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Attach SWI File'));
  }

  public getMasters(): Observable<SWIMaster[]> {
    const url: string = this.baseApiUrl + this.mastersMethod;
    return this.http
      .get(url, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Get Masters'));
  }

  public getMaster(id: string): Observable<SWIMaster> {
    const url: string = this.baseApiUrl + this.mastersMethod + id.toString();
    return this.http
      .get(url, defaultOptions())
      .map(res => handleResponse(res))
      .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyErrorMessage + ' : Get Master'));
  }
}
