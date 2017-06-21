import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppCatalogservice } from '../services/app-catalog.service';
import { SWIHeader, SWIHSItem } from "../models/app.models";

@Injectable()
export class HSItemsResolver implements Resolve<SWIHSItem[]> {

    constructor(
        private appCatalog: AppCatalogservice
    ) { }

    async resolve(): Promise<SWIHSItem[]> {
        let catalog = await this.appCatalog.getCatalog();
        let results = catalog.swiHSItems;
        return results;
    }
}

