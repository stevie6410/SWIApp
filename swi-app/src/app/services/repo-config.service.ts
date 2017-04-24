import { Injectable } from '@angular/core';
import { SWIAppConfig } from "app/models/app.config.models";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SWIDBService } from "../modules/core/swi-db.service";
import { SWIHSItem } from "app/models/app.models";
import Dexie from 'dexie';

@Injectable()
export class AppConfigService {

    appConfigTable: Dexie.Table<SWIAppConfig, number>;

    constructor(
        private http: Http,
        private db: SWIDBService
    ) {
        this.appConfigTable = this.db.table('appConfig');
        this.setAppConfigFromFile();
    }

    private setAppConfigFromFile() {
        this.http.get("./assets/appConfig.json").subscribe(
            config => {
                this.appConfigTable.toArray().then(value => {
                    if (value.length == 0) {
                        this.appConfigTable.add(config.json());
                    }
                });
            }
        );
    }

    getAppConfig(): Promise<SWIAppConfig> {
        return new Promise<SWIAppConfig>((resolve, reject) => {
            this.appConfigTable.toArray().then((data) => {
                console.log("data: ", data[0]);
                resolve(data[0]);
            });
        });
    }
}