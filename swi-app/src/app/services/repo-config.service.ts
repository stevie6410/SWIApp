import { Injectable } from '@angular/core';
import { remote, shell } from "electron";
import { SWIAppConfig } from "app/models/app.config.models";
import * as fs from 'fs-promise';
import * as path from 'path';
const appConfig = require('../../assets/appConfig.json');

@Injectable()
export class AppConfigService {

    private _appConfigPath: string;

    constructor() {
        //First try and get the app cache from the app data folder
        this._appConfigPath = path.join(remote.app.getPath('appData'), 'swi-data', 'config.json');
        console.log("_appConfigPath: ", this._appConfigPath);
    }

    private initCache() {
        //Get the latest cache from repo or source
        console.log(require('../../assets/appConfig.json'));
    }

    private updateAppConfig(): Promise<void> {
        console.log("Update App Config");

        let config: SWIAppConfig = require('../../assets/appConfig.json');
        console.log("required from appConfig.json");
        console.log(config);
        return fs.writeFile(this._appConfigPath, JSON.stringify(config));
    }

    public getConfig(): Promise<SWIAppConfig> {
        return new Promise<SWIAppConfig>((resolve, reject) => {
            resolve(appConfig);
        });
    }
}