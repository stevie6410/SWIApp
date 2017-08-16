import { Injectable, ErrorHandler } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SWIDBService } from "./swi-db.service";
import { SWIHSItem, AppCatalog } from "../models/app.models";
import { EnvironmentConfiguration, Setting } from "app/core";
import { ActivatedRoute } from "@angular/router";
import { EnvironmentService } from "app/app/services/environment.service";
import Dexie from "dexie";
import { GlobalErrorHandler } from "app/app/services/error-handler.service";

@Injectable()
export class AppCatalogService {

  appConfigTable: Dexie.Table<AppCatalog, number>;
  repoURL: string;
  appConfigMethod = "api/v1/appcatalog/";
  errorHandler: GlobalErrorHandler;
  friendlyError = "Error communicating with App Catalog";

  constructor(
    private http: Http,
    private db: SWIDBService,
    private route: ActivatedRoute,
    private environment: EnvironmentService,
    private globalErrorHandler: ErrorHandler
  ) {
    this.errorHandler = globalErrorHandler as GlobalErrorHandler;
    this.appConfigTable = this.db.table("appConfig");
    this.repoURL = environment.env.repositoryURL;
  }

  private get fullBaseURL(): string {
    return this.repoURL + this.appConfigMethod;
  }

  public async updateRequired(): Promise<boolean> {
    try {
      const appCatalog: AppCatalog = await this.getCatalog();
      if (!appCatalog) { return true; }
      if (!appCatalog.version) { return true; }
      const result: boolean = await this.http
        .get(this.fullBaseURL + "checkversion/" + appCatalog.version)
        .map(r => r.json())
        .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + ' : Is Update Required'))
        .toPromise();
      return !result;
    } catch (error) {
      // this.errorHandler.handleError(error);
      console.warn("Could not connect to the repository to check the catalog for updates");
      return false;
    }
  }

  public async updateCatalog(): Promise<void> {
    // Check to see if we need to update
    const needUpdate: boolean = await this.updateRequired();
    if (!needUpdate) { return; }

    try {
      // First try and get the app config from the repository
      const repoCatalog: AppCatalog = await this.http.get(this.fullBaseURL)
        .map(r => r.json())
        .catch((err, caught) => this.errorHandler.handleHttpError(err, this.friendlyError + ' : Update Catalog'))
        .toPromise();
      console.log("Updated the repo catalog to version", repoCatalog.version);
      if (repoCatalog) {
        await this.appConfigTable.clear();
        await this.appConfigTable.add(repoCatalog);
        return;
      }
    } catch (error) {
      // this.errorHandler.handleError(error);
      // Repository Failed, fall back to the the local catalog
      console.warn("Fetching SWI Repository App Catalog failed. Falling back to local file");
      const localCatalog = await this.http.get("./assets/appConfig.json").map(r => r.json()).toPromise();
      // console.log("Local Catlog: ", localCatalog);
      if (localCatalog) {
        await this.appConfigTable.clear();
        await this.appConfigTable.add(localCatalog);
        return;
      }
    }
  }

  public async getCatalog(): Promise<AppCatalog> {
    const results = await this.appConfigTable.toArray();
    return results[0];
  }

  public async checkCatalogExists(): Promise<boolean> {
    const result = await this.getCatalog();
    return (result != null);
  }

  public async getAppSetting(settingName: string): Promise<Setting> {
    const catalog = await this.getCatalog();
    if (!catalog.settings) { return null; }
    const setting = catalog.settings.find(s => s.name === settingName);
    if (!setting) { return null; }
    return setting;
  }
}
