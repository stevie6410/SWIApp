import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SWIHeader, SWIFileService } from "app/core";

@Injectable()
export class SWIResolver implements Resolve<SWIHeader> {

    constructor(
        private swiFileService: SWIFileService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.swiFileService.getFile(route.paramMap.get('id'));
    }
}

