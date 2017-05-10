import { Injectable } from '@angular/core';
const packageJson: any = require('../../../package.json');
const environmentJson: any = require('../../assets/environment.json');

@Injectable()
export class PackageService {

    constructor() {
        console.log(packageJson);
    }

    getAppVersion(): string {
        return packageJson.version;
    }

    getAppEnvironemnt() {
        return packageJson.environment;
    }

    getBuildNumber(){
        return environmentJson.buildNumber;
    }

    getVersionTag(): string {
        if (packageJson.environment == "Production") {
            return "v" + packageJson.version;
        } else {
            return environmentJson.environment + " v" + packageJson.version;
        }
    }

}