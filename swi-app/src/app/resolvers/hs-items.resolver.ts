import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppConfigService } from '../services/repo-config.service';
import { SWIHeader, SWIHSItem } from "../models/app.models";

@Injectable()
export class HSItemsResolver implements Resolve<SWIHSItem[]> {

    constructor(
        private appConfigService: AppConfigService
    ) { }

    resolve() {
        return new Promise<SWIHSItem[]>((resolve, reject) => {
            this.appConfigService.getAppConfig().then((value) => {
                console.log(value.swiHSItems);
                resolve(value.swiHSItems);
            });
        });
    }
}

