import { Injectable } from '@angular/core';
const packageJson: any = require('../../../package.json');

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

    getVersionTag(): string {
        if (packageJson.environment == "Production") {
            return "v" + packageJson.version;
        } else {
            return packageJson.environment + " v" + packageJson.version;
        }
    }

}