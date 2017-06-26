import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SWIDBService } from "./swi-db.service";
import { SWIHSItem, AppCatalog } from "../models/app.models";
import Dexie from 'dexie';

@Injectable()
export class AppCatalogService {

    appConfigTable: Dexie.Table<AppCatalog, number>;
    repoURL: string = "http://localhost:4201/api/v1/appcatalog/";

    constructor(
        private http: Http,
        private db: SWIDBService
    ) {
        this.appConfigTable = this.db.table('appConfig');
    }

    public async updateRequired(): Promise<boolean> {
        try {
            let appCatalog: AppCatalog = await this.getCatalog();
            if (!appCatalog) return true;
            let currentVersion: number = appCatalog.version;
            if (!currentVersion) return true;
            let result: boolean = await this.http.get(this.repoURL + 'checkversion/' + appCatalog.version).map(r => r.json()).toPromise();
            // console.log("check version result", result);
            return !result;
        } catch (error) {
            console.warn("Could not connect to the repository to check the catalog for updates");
            return false;
        }
    }

    public async updateCatalog(): Promise<void> {
        //Check to see if we need to update
        let needUpdate: boolean = await this.updateRequired();
        // console.log("Catalog Update Required: ", needUpdate);
        if (!needUpdate) return;

        try {
            //First try and get the app config from the repository
            let repoCatalog: AppCatalog = await this.http.get(this.repoURL).map(r => r.json()).toPromise();
            console.log("Repo Catlog: ", JSON.stringify(repoCatalog));
            if (repoCatalog) {
                await this.appConfigTable.clear();
                await this.appConfigTable.add(repoCatalog);
                return;
            }
        } catch (error) {

            //Repository Failed, fall back to the the local catalog
            console.warn("Fetching SWI Repository App Catalog failed. Falling back to local file");
            let localCatalog = await this.http.get('./assets/appConfig.json').map(r => r.json()).toPromise();
            // console.log("Local Catlog: ", localCatalog);
            if (localCatalog) {
                await this.appConfigTable.clear();
                await this.appConfigTable.add(localCatalog);
                return;
            }
        }
    }

    public async getCatalog(): Promise<AppCatalog> {
        let results = await this.appConfigTable.toArray();
        return results[0];
    }

    public async checkCatalogExists(): Promise<boolean> {
        let result = await this.getCatalog();
        return (result != null);
    }
}