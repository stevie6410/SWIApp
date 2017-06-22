import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppCatalogService } from '../services/app-catalog.service';
import { SWIHeader, SWIHSItem } from "../models/app.models";

@Injectable()
export class HSItemsResolver implements Resolve<SWIHSItem[]> {

    constructor(
        private appCatalog: AppCatalogService
    ) { }

    async resolve(): Promise<SWIHSItem[]> {
        console.log("Starting HS resolver");
        let catalog = await this.appCatalog.getCatalog();
        console.log("Got catalog", catalog);
        let results = catalog.hsIcons;
        console.log("Got results", results);

        return results;
    }
}

