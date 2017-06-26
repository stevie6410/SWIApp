import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SWIHeader, SWIFileService } from "app/core";

@Injectable()
export class SWIsResolver implements Resolve<Array<SWIHeader>> {

    constructor(
        private swiFileService: SWIFileService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.swiFileService.getAll();
    }
}

